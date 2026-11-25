import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateLead,
  isQualified,
  investimentos,
  prazos,
  terrenos,
  whatsappUrl,
} from "../lib/lead";
import { POST } from "../app/api/lead/route";
import { NextRequest } from "next/server";
const valid = {
  nome: "Pessoa Teste",
  whatsapp: "(49) 99136-0745",
  email: " TESTE@example.com ",
  terreno: "Sim",
  local: "Vivapark",
  investimento: investimentos[1],
  inicio: prazos[0],
  mensagem: "Teste de integração",
  consentimento: true,
  website: "",
  origem: {
    utm_source: "google",
    gclid: "test",
    landing_page: "https://example.com/alto-padrao/casas",
  },
};
test("qualificação: todas as combinações de terreno, investimento e prazo", () => {
  for (const terreno of terrenos)
    for (const investimento of investimentos)
      for (const inicio of prazos) {
        const { data } = validateLead({
          ...valid,
          terreno,
          investimento,
          inicio,
        });
        assert.ok(data);
        assert.equal(
          isQualified(data),
          terreno === "Sim" &&
            investimento !== investimentos[0] &&
            [prazos[0], prazos[1]].includes(inicio as (typeof prazos)[0]),
        );
      }
});
test("validação e normalização", () => {
  const { data } = validateLead(valid);
  assert.ok(data);
  assert.equal(data.whatsapp, "49991360745");
  assert.equal(data.email, "teste@example.com");
  assert.match(decodeURIComponent(whatsappUrl(data)), /Vivapark/);
  for (const patch of [
    { consentimento: false },
    { whatsapp: "123" },
    { email: "inválido" },
    { nome: "A" },
    { inicio: "amanhã" },
    { investimento: "0" },
    
    { mensagem: "a".repeat(3001) },
  ])
    assert.ok(validateLead({ ...valid, ...patch }).error);
});
let counter = 1;
function request(input: unknown) {
  return new NextRequest("http://localhost/api/lead", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `192.0.2.${counter++}`,
    },
    body: JSON.stringify(input),
  });
}
test("cadastro curto: só nome e WhatsApp; formato antigo segue válido", () => {
  const short = validateLead({
    nome: "Maria",
    whatsapp: "(49) 99136-0745",
    consentimento: true,
    origem: { gclid: "g1", utm_source: "google" },
  });
  assert.ok(short.data, short.error);
  assert.equal(short.data.email, "");
  assert.equal(isQualified(short.data), false);
  assert.equal(short.data.origem.gclid, "g1");
  assert.ok(validateLead({ nome: "Maria", consentimento: true }).error);
  assert.ok(
    validateLead({ nome: "Maria", whatsapp: "49991360745" }).error,
    "aceite obrigatório",
  );
  assert.ok(validateLead(valid).data);
  assert.ok(isQualified(validateLead(valid).data!));
});

test("limite por IP: 5 tentativas a cada 15 minutos", async () => {
  const vercel = process.env.VERCEL;
  delete process.env.VERCEL;
  try {
    for (let i = 0; i < 6; i++) {
      const req = new NextRequest("http://localhost/api/lead", {
        method: "POST",
        headers: { "x-forwarded-for": "192.0.2.250" },
        body: "{}",
      });
      assert.equal((await POST(req)).status, i < 5 ? 400 : 429);
    }
  } finally {
    if (vercel) process.env.VERCEL = vercel;
  }
});

test("origem: aceita host local e rejeita origem externa", async () => {
  const req = (origin: string) =>
    new NextRequest("http://localhost/api/lead", {
      method: "POST",
      headers: {
        host: "127.0.0.1:3000",
        origin,
        "x-forwarded-for": "192.0.2.245",
      },
      body: "{}",
    });
  assert.equal((await POST(req("http://127.0.0.1:3000"))).status, 400);
  assert.equal((await POST(req("https://externo.example"))).status, 403);
});

test("limite distribuído: comando atômico Redis e falha fechada na Vercel", async () => {
  const { rateLimit } = await import("../lib/rate-limit");
  const savedEnv = { ...process.env };
  const savedFetch = globalThis.fetch;
  Object.assign(process.env, {
    VERCEL: "1",
    UPSTASH_REDIS_REST_URL: "https://redis.example.com",
    UPSTASH_REDIS_REST_TOKEN: "test",
  });
  let count = 0;
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://redis.example.com");
    const command = JSON.parse(String(options?.body));
    assert.equal(command[0], "EVAL");
    assert.match(command[1], /EXPIRE/);
    return new Response(JSON.stringify({ result: ++count }));
  };
  try {
    for (let i = 0; i < 6; i++)
      assert.equal(await rateLimit("192.0.2.246"), i < 5);
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    await assert.rejects(rateLimit("192.0.2.246"));
  } finally {
    process.env = savedEnv;
    globalThis.fetch = savedFetch;
  }
});

import { randomUUID, createDecipheriv, createHash } from "node:crypto";
import { GET as list, POST as retry } from "../app/api/lead/pending/route";
import { trackSavedLead } from "../lib/tracking";

test("persistência, avisos, reenvio e conversões", async (t) => {
  const original = globalThis.fetch;
  const env = { ...process.env };
  const errors: string[] = [];
  t.mock.method(console, "error", (...args: unknown[]) => {
    errors.push(args.join(" "));
  });
  const warnings = t.mock.method(console, "warn", () => {});
  const admin = randomUUID();
  Object.assign(process.env, {
    UPSTASH_REDIS_REST_URL: "https://redis.example",
    UPSTASH_REDIS_REST_TOKEN: randomUUID(),
    TELEGRAM_BOT_TOKEN: randomUUID(),
    TELEGRAM_CHAT_ID: "test",
    RESEND_API_KEY: randomUUID(),
    LEAD_FROM_EMAIL: "site@example.org",
    LEAD_TO_EMAIL: "team@example.org",
    LEAD_WEBHOOK_URL: "https://crm.example",
    LEADS_ADMIN_TOKEN: admin,
    NEXT_PUBLIC_META_PIXEL_ID: "test",
    META_CAPI_TOKEN: randomUUID(),
  });
  t.after(() => {
    globalThis.fetch = original;
    process.env = env;
  });
  const records = new Map<string, string>();
  const queue = new Set<string>();
  const leases = new Map<string, string>();
  const calls: { channel: string; body: Record<string, any> }[] = [];
  let failures: string[] = [];
  const json = (result: unknown) => Response.json({ result });
  globalThis.fetch = async (url, options) => {
    const host = new URL(String(url)).hostname;
    const body = JSON.parse(String(options?.body));
    if (host === "redis.example") {
      const [cmd, script, count, key, second, third, ...rest] = body;
      if (failures.includes("redis")) throw new Error("offline");
      if (cmd === "ZRANGE")
        return json(Array.from(queue).slice(count, key + 1));
      if (cmd === "MGET")
        return json(body.slice(1).map((k: string) => records.get(k)));
      if (count === 1) return json(1);
      if (script.includes("ZADD")) {
        if (records.has(key)) return json(records.get(key));
        records.set(key, third);
        queue.add(rest[1]);
        return json(null);
      }
      if (count === 2) {
        const raw = records.get(key);
        if (!raw || JSON.parse(raw).status !== "pending" || leases.has(second))
          return json(null);
        leases.set(second, third);
        return json(raw);
      }
      assert.equal(leases.get(second), rest[0]);
      records.set(key, rest[1]);
      if (rest[2] === "complete") queue.delete(rest[3]);
      leases.delete(second);
      return json(1);
    }
    const channel =
      host === "api.telegram.org"
        ? body.text.startsWith("Falha")
          ? "alert"
          : "telegram"
        : host === "api.resend.com"
          ? "email"
          : host === "crm.example"
            ? "webhook"
            : "capi";
    assert.ok(records.size);
    calls.push({ channel, body });
    return Response.json(
      { ok: true },
      { status: failures.includes(channel) ? 500 : 200 },
    );
  };
  function submit(id = randomUUID(), payload = valid) {
    const req = request(payload);
    req.headers.set("idempotency-key", id);
    return POST(req);
  }
  function adminRequest(id?: string) {
    return new NextRequest("http://localhost/api/lead/pending", {
      method: id ? "POST" : "GET",
      headers: { authorization: "Bearer " + admin },
      ...(id ? { body: JSON.stringify({ id }) } : {}),
    });
  }
  await t.test("salva antes de enviar e deduplica pelo ID", async () => {
    const id = randomUUID();
    const response = await (await submit(id)).json();
    assert.equal(response.saved, true);
    const { lead, channels, status } = JSON.parse(
      records.get("corddiali:lead:" + id)!,
    );
    assert.deepEqual(lead.origem, valid.origem);
    assert.deepEqual(channels, {
      email: "sent",
      telegram: "sent",
      webhook: "sent",
    });
    assert.equal(status, "complete");
    const events = calls.find((c) => c.channel === "capi")!.body.data;
    assert.deepEqual(
      events.map((e: { event_name: string }) => e.event_name),
      ["Lead", "LeadQualificado"],
    );
    assert.ok(events.every((e: { event_id: string }) => e.event_id === id));
    const mail = calls.find((c) => c.channel === "email")!.body.text;
    assert.match(mail, new RegExp("ID do lead: " + id));
    assert.match(mail, /Nome: Pessoa Teste/);
    assert.match(mail, /Telefone: [+]5549991360745/);
    assert.doesNotMatch(mail, /Vivapark|terreno/i);
    assert.deepEqual(calls.find((c) => c.channel === "webhook")!.body, lead);
    await submit(id);
    assert.equal(calls.length, 4);
    assert.equal((await submit(id, { ...valid, nome: "Outro" })).status, 409);
  });
  await t.test(
    "falha parcial gera alerta e reenvia somente o e-mail",
    async () => {
      calls.length = 0;
      failures = ["email"];
      const id = randomUUID();
      assert.equal((await (await submit(id)).json()).saved, true);
      assert.equal(
        (await list(new NextRequest("http://localhost"))).status,
        401,
      );
      const { leads } = await (await list(adminRequest())).json();
      assert.equal(leads[0].lead.id, id);
      assert.deepEqual(leads[0].channels, {
        email: "failed",
        telegram: "sent",
        webhook: "sent",
      });
      assert.match(
        calls.find((c) => c.channel === "alert")!.body.text,
        /email/,
      );
      failures = [];
      calls.length = 0;
      assert.equal(
        (await (await retry(adminRequest(id))).json()).status,
        "complete",
      );
      assert.deepEqual(
        calls.map((c) => c.channel),
        ["email"],
      );
      assert.equal((await retry(adminRequest(id))).status, 409);
    },
  );
  await t.test("todos falham e o alerta separado é enviado", async () => {
    calls.length = 0;
    failures = ["email", "telegram", "webhook"];
    const id = randomUUID();
    const result = await (await submit(id)).json();
    assert.equal(result.saved, true);
    assert.equal(result.delivered, false);
    assert.ok(queue.has(id));
    assert.match(
      calls.find((c) => c.channel === "alert")!.body.text,
      new RegExp(id),
    );
  });
  await t.test(
    "Redis offline permite tentar salvar, gera backup recuperável e impede conversões",
    async () => {
      calls.length = 0;
      failures = ["redis"];
      const id = randomUUID();
      const res = await submit(id);
      assert.equal(res.status, 503);
      assert.ok(warnings.mock.callCount());
      const log = JSON.parse(
        errors.find((line) => line.includes("lead_recovery_v1"))!,
      );
      const cipher = createDecipheriv(
        "aes-256-gcm",
        createHash("sha256")
          .update("corddiali-recovery-v1\0")
          .update(admin)
          .digest(),
        Buffer.from(log.iv, "base64"),
      );
      cipher.setAuthTag(Buffer.from(log.tag, "base64"));
      const recovered = JSON.parse(
        Buffer.concat([
          cipher.update(Buffer.from(log.ciphertext, "base64")),
          cipher.final(),
        ]).toString(),
      );
      assert.equal(recovered.lead.id, id);
      assert.equal(recovered.lead.nome, valid.nome);
      assert.deepEqual(calls, []);
      const track = t.mock.fn();
      assert.throws(() =>
        trackSavedLead(validateLead(valid).data!, res.ok, {}, track),
      );
      assert.throws(() =>
        trackSavedLead(validateLead(valid).data!, true, { id }, track),
      );
      assert.equal(track.mock.callCount(), 0);
      trackSavedLead(
        validateLead(valid).data!,
        true,
        { id, saved: true, qualified: true },
        track,
      );
      assert.equal(track.mock.calls[0].arguments[1], id);
    },
  );
});
