export const terrenos = ["Sim", "Estou procurando", "Não"] as const;
export const investimentos = [
  "Até R$ 800 mil",
  "R$ 800 mil a R$ 1,5 milhão",
  "R$ 1,5 a R$ 3 milhões",
  "Acima de R$ 3 milhões",
] as const;
export const prazos = [
  "Em até 6 meses",
  "6 a 12 meses",
  "Mais de 12 meses",
  "Só pesquisando",
] as const;
export const locais = [
  "Vivapark",
  "All Wert Resort",
  "Itapema",
  "Porto Belo",
  "Bombinhas",
  "Balneário Camboriú",
  "Tijucas",
  "Outro",
];
export const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "landing_page",
  "referrer",
] as const;
export type LeadInput = {
  nome: string;
  whatsapp: string;
  email: string;
  terreno: string;
  local: string;
  investimento: string;
  inicio: string;
  mensagem: string;
  consentimento: boolean;
  website: string;
  origem: Record<string, string>;
};
export function normalizePhone(value: string) {
  const n = value.replace(/\D/g, "");
  return `+55${n}`;
}
export function validateLead(input: unknown): {
  data?: LeadInput;
  error?: string;
} {
  if (!input || typeof input !== "object") return { error: "Dados inválidos." };
  const raw = input as Record<string, unknown>;
  const required = ["nome", "whatsapp"] as const;
  const optional = [
    "email",
    "terreno",
    "local",
    "investimento",
    "inicio",
    "mensagem",
    "website",
  ] as const;
  const data = {} as LeadInput;
  for (const key of [...required, ...optional]) {
    const value = raw[key];
    // Only nome and whatsapp are required; legacy fields may be absent.
    if (value === undefined || value === null) {
      if ((required as readonly string[]).includes(key))
        return { error: "Preencha nome e WhatsApp." };
      data[key] = "";
      continue;
    }
    if (typeof value !== "string")
      return { error: "Preencha os campos do formulário." };
    data[key] = value.trim();
    if (data[key].length > (key === "mensagem" ? 3000 : 200))
      return { error: "Um dos campos excede o tamanho permitido." };
  }
  data.whatsapp = data.whatsapp.replace(/\D/g, "");
  data.email = data.email.toLowerCase();
  if (
    data.nome.length < 2 ||
    !/^[1-9]{2}(?:9\d{8}|[2-9]\d{7})$/.test(data.whatsapp)
  )
    return { error: "Confira seu nome e WhatsApp com DDD." };
  // Legacy qualifying fields are optional, but must be valid when sent.
  if (
    (data.terreno &&
      !terrenos.includes(data.terreno as (typeof terrenos)[number])) ||
    (data.investimento &&
      !investimentos.includes(
        data.investimento as (typeof investimentos)[number],
      )) ||
    (data.inicio && !prazos.includes(data.inicio as (typeof prazos)[number]))
  )
    return { error: "Confira os campos informados." };
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { error: "Informe um e-mail válido." };
  if (raw.consentimento !== true)
    return { error: "É necessário consentir com o tratamento dos dados." };
  data.consentimento = true;
  data.origem = {};
  if (raw.origem && typeof raw.origem === "object")
    for (const key of attributionKeys) {
      const value = (raw.origem as Record<string, unknown>)[key];
      if (typeof value === "string") data.origem[key] = value.slice(0, 2000);
    }
  return { data };
}
export function isQualified(data: LeadInput) {
  return (
    data.terreno === "Sim" &&
    data.investimento !== investimentos[0] &&
    prazos.slice(0, 2).includes(data.inicio as (typeof prazos)[0])
  );
}
export function whatsappUrl(data: LeadInput) {
  const text = [
    `Olá, sou ${data.nome}. Gostaria de conversar sobre um projeto com a Corddiali.`,
    `WhatsApp: ${normalizePhone(data.whatsapp)}`,
    data.email && `E-mail: ${data.email}`,
    data.terreno && `Já tenho terreno: ${data.terreno}`,
    data.local && `Local: ${data.local}`,
    data.investimento && `Investimento: ${data.investimento}`,
    data.inicio && `Início: ${data.inicio}`,
    data.mensagem && `Mensagem: ${data.mensagem}`,
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/5549991360745?text=${encodeURIComponent(text)}`;
}
