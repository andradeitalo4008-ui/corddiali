# Corddiali V3 — Prompt Mestre

Versão criada para seguir a estrutura do prompt mestre do site Corddiali.

## Inclui
- Hero cinematográfico
- Manifesto
- Problema da construção tradicional
- Método Corddiali / Turnkey
- Frase de impacto fullscreen
- Projetos em layout editorial
- Números animados
- Engenharia e tradição
- Timeline
- Comparação Tradicional × Corddiali
- Excelência técnica
- Depoimentos
- CTA final
- Páginas individuais de projetos
- SEO básico, sitemap e robots
- Mobile responsivo
- Placeholders locais para não quebrar imagens antes de inserir as fotos reais

## Antes de publicar definitivamente
1. Trocar placeholders pelas fotos reais.
2. Inserir logo oficial.
3. Inserir WhatsApp e Instagram oficiais.
4. Confirmar o domínio oficial.
5. Revisar números e afirmações institucionais.

## Leads e conversões

Landing do anúncio: `/alto-padrao/casas#formulario`. O mesmo formulário qualificador atende `/contato#formulario` (`components/ContactForm.tsx`). API: `POST /api/lead`. A página `/obrigado` é apenas informativa e **não dispara conversão**.

### Configuração na Vercel

Copie `.env.example` para `.env.local` no desenvolvimento. Configure os valores reais diretamente na Vercel, primeiro no ambiente **Preview** (branch `feat/leads-tracking`). Variáveis `NEXT_PUBLIC_*` exigem novo build depois da configuração. Não inclua credenciais em commits, prints ou logs.

| Variável | Uso |
| --- | --- |
| `RESEND_API_KEY` | Chave de envio, somente servidor |
| `LEAD_TO_EMAIL` | E-mail do responsável |
| `LEAD_FROM_EMAIL` | Remetente autorizado em domínio verificado no Resend, ex. `Corddiali <site@dominio-verificado>` |
| `LEAD_WEBHOOK_URL` | Opcional: endpoint HTTPS de planilha/CRM que recebe o JSON completo; deve responder 2xx |
| `UPSTASH_REDIS_REST_URL` | Redis REST para contador de tentativas compartilhado entre instâncias Vercel |
| `UPSTASH_REDIS_REST_TOKEN` | Token Redis, somente servidor |
| `NEXT_PUBLIC_GADS_ID` | `AW-17442865573` (a tag existente é mantida) |
| `NEXT_PUBLIC_GADS_LABEL_FORM` | `r6AGCKDi6LkdEKWDtP1A`, sem ID ou barra; vazio desativa esse envio |
| `NEXT_PUBLIC_GADS_LABEL_QUALIFIED` | `ctJQCKPi6LkdEKWDtP1A`; vazio desativa esse envio |
| `NEXT_PUBLIC_META_PIXEL_ID` | `1106058259251298`; vazio mantém Pixel desativado |
| `META_CAPI_TOKEN` | Opcional, somente servidor: ativa Conversions API com o mesmo Pixel/eventID |

O cliente reutiliza uma chave de idempotência por payload na sessão. O servidor usa essa chave como UUID do lead e grava no Redis apenas um fingerprint SHA-256 e o recibo por 24 horas; repetição retorna o mesmo recibo, sem reenviar e-mail/webhook/CAPI. O navegador também guarda os IDs já rastreados para não repetir eventos no reenvio. Um envio em processamento retorna 409 até concluir; a trava expira após 60 segundos em caso de interrupção da função. Com storage bloqueado, a proteção no componente e o UUID estável durante tentativas continuam ativos.

O limite é de cinco tentativas por IP em 15 minutos. Em desenvolvimento há contador em memória. Na Vercel o Redis é obrigatório; ausência/falha retorna 503, sem conversão, para não deixar o endpoint público desprotegido. Honeypot, validação no cliente/servidor, restrição de origem, tamanho de campos e timeout dos serviços complementam a proteção. O Redis armazena hash do IP, contagem e recibos/fingerprints com expiração, sem o conteúdo pessoal do lead. Nenhum segredo é exposto ao navegador.

O servidor gera UUID e data/hora UTC, normaliza os campos e envia o mesmo lead (incluindo consentimento, qualificação e origem) no corpo do webhook e no texto do e-mail. A origem preserva UTMs, gclid, gbraid, wbraid, fbclid, URL de entrada e referrer da primeira visita da sessão; indisponibilidade do sessionStorage usa memória. Retenção e acesso aos dados devem ser configurados nos destinos.

As entregas Resend/webhook são independentes e têm timeout de oito segundos. A resposta 200 inclui `id`, `qualified` e `delivered`. Se nenhum destino aceitar, o servidor registra somente o ID/destino da falha e retorna `delivered:false`; a interface orienta continuar pelo WhatsApp, sem afirmar que o lead foi recebido. Não há banco ou fila de retentativa: neste caso, o contato depende de o visitante continuar no WhatsApp. Falhas de validação (400), origem (403), limite (429) e proteção indisponível (503) não geram conversões.

### Eventos

| Evento | Quando dispara |
| --- | --- |
| Google Ads: conversão de formulário | Uma vez após API 2xx, se rótulo configurado; `transaction_id` = UUID da API |
| Google Ads: conversão qualificada | Mesmo momento/UUID, somente terreno “Sim”, investimento acima da primeira faixa e início em até 12 meses |
| `dataLayer`: `lead_submit` | Após API 2xx, com `lead_qualificado` booleano |
| Google `user_data` | Após API 2xx e consentimento; e-mail minúsculo e telefone E.164, sem hash manual |
| Meta `PageView` | Na carga e navegação entre páginas, se Pixel configurado; proteção contra duplicação inicial |
| Meta `Lead` | Após API 2xx, com `content_name`, `lead_qualificado` e `eventID` = UUID |
| Meta `LeadQualificado` | Evento customizado no mesmo fluxo, apenas qualificados |
| Meta CAPI `Lead` / `LeadQualificado` | Opcional no servidor, com mesmos nomes/UUIDs para deduplicação Pixel/CAPI; telefone/e-mail SHA-256 conforme API Meta |
| Google “Clique no WhatsApp (site)” | Listener global existente, uma vez por clique em link WhatsApp; rótulo original preservado |
| Meta `Contact` | No mesmo listener de clique WhatsApp |
| Link de continuidade após formulário / `/obrigado` | Marcado `data-no-conversion`, não repete eventos de clique/conversão |
| Visita direta a `/obrigado` | Nenhuma conversão de lead |

O `window.open` ocorre depois dos eventos. Se o navegador bloquear a abertura, há um link de continuidade visível. Scripts ausentes ou com erro não impedem a continuidade. API 200 representa aceite do formulário; conforme solicitado, falha na entrega não impede a conversão nem o WhatsApp.

### Verificação

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```

Os testes cobrem as 48 combinações de qualificação, validação, normalização, envio de JSON idêntico a e-mail/webhook, deduplicação CAPI, falha dos serviços e limite de IP. Chamadas externas são simuladas; não enviam leads reais.

No preview configurado, abra `/alto-padrao/casas?utm_source=teste&utm_campaign=preview&gclid=teste`, depois navegue a `/contato`: a origem deve continuar sendo a landing. No DevTools, antes de enviar, observe as chamadas sem alterar o comportamento dos scripts:

```js
const originalGtag = window.gtag;
window.gtag = (...args) => { console.log('gtag', ...args); originalGtag?.(...args); };
const originalFbq = window.fbq;
window.fbq = (...args) => { console.log('fbq', ...args); originalFbq?.(...args); };
```

1. Lead qualificado: terreno “Sim”, faixa “R$ 800 mil a R$ 1,5 milhão”, início “Em até 6 meses”, telefone válido e consentimento. Confirme POST `/api/lead` 200, UUID único, `qualified:true`, confirmação e WhatsApp com os dados; duas conversões Google, Meta Lead/LeadQualificado e um `lead_submit`.
2. Lead não qualificado: terreno “Não” (ou primeira faixa / início acima de 12 meses). Confirme 200, `qualified:false`, apenas conversão Google de formulário, Meta Lead e `lead_submit`.
3. Confirme o e-mail e JSON no destino configurado, incluindo atribuição; no Events Manager confira deduplicação Pixel/CAPI. Rótulos e IDs vazios não permitem validar recebimento nas plataformas.
4. Bloqueie popups e scripts de marketing: o envio e link visível devem funcionar. Recarregue `/obrigado` e confirme ausência de conversão. Clique num WhatsApp secundário e confira uma conversão existente e um Contact.
5. Sem consentimento, WhatsApp inválido e campos obrigatórios vazios: envio bloqueado. API inválida retorna 400; sexta tentativa do mesmo IP retorna 429. Aguarde 15 minutos antes de repetir.

A publicação em produção exige revisão/aprovação do PR; este branch só deve gerar preview.
