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
    { local: "" },
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
test("API: valida, entrega JSON idêntico e deduplica CAPI por id; falhas permitem WhatsApp", async () => {
  const fetchOriginal = globalThis.fetch;
  const env = { ...process.env };
  const calls: { url: string; body: Record<string, unknown> }[] = [];
  Object.assign(process.env, {
    RESEND_API_KEY: "test",
    LEAD_TO_EMAIL: "test@example.com",
    LEAD_FROM_EMAIL: "site@example.com",
    LEAD_WEBHOOK_URL: "https://crm.example.com",
    NEXT_PUBLIC_META_PIXEL_ID: "123",
    META_CAPI_TOKEN: "test",
  });
  delete process.env.VERCEL;
  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), body: JSON.parse(String(options?.body)) });
    return new Response("{}", { status: 200 });
  };
  try {
    const response = await POST(request(valid));
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.qualified, true);
    assert.equal(result.delivered, true);
    const email = calls.find((c) => c.url.includes("resend"))!;
    const webhook = calls.find((c) => c.url.includes("crm"))!;
    assert.deepEqual(JSON.parse(email.body.text as string), webhook.body);
    assert.equal(webhook.body.id, result.id);
    const capi = calls.find((c) => c.url.includes("facebook"))!.body.data as {
      event_id: string;
      event_name: string;
    }[];
    assert.equal(capi.length, 2);
    assert.ok(capi.every((e) => e.event_id === result.id));
    calls.length = 0;
    const non = await (
      await POST(request({ ...valid, terreno: "Não" }))
    ).json();
    assert.equal(non.qualified, false);
    assert.equal(
      (calls.find((c) => c.url.includes("facebook"))!.body.data as unknown[])
        .length,
      1,
    );
    globalThis.fetch = async () => {
      throw new Error("offline");
    };
    const fallback = await POST(request(valid));
    assert.equal(fallback.status, 200);
    assert.equal((await fallback.json()).delivered, false);
    assert.equal(
      (await POST(request({ ...valid, consentimento: false }))).status,
      400,
    );
    assert.equal(
      (await POST(request({ ...valid, website: "spam" }))).status,
      400,
    );
  } finally {
    globalThis.fetch = fetchOriginal;
    process.env = env;
  }
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
