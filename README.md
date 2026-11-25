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

Copie `.env.example` para `.env.local` no desenvolvimento. Configure os valores reais diretamente na Vercel, primeiro no ambiente **Preview** (branch de teste). Variáveis `NEXT_PUBLIC_*` exigem novo build depois da configuração. Não inclua credenciais em commits, prints ou logs.

| Variável | Uso |
| --- | --- |
| `RESEND_API_KEY` | Chave de envio, somente servidor |
| `LEAD_TO_EMAIL` | E-mail do responsável |
| `LEAD_FROM_EMAIL` | Remetente autorizado em domínio verificado no Resend, ex. `Corddiali <site@dominio-verificado>` |
| `LEAD_WEBHOOK_URL` | Opcional: endpoint HTTPS de planilha/CRM que recebe o JSON completo; deve responder 2xx |
| `UPSTASH_REDIS_REST_URL` | Redis REST para leads, fila de pendências e limite por IP |
| `UPSTASH_REDIS_REST_TOKEN` | Token Redis, somente servidor |
| `NEXT_PUBLIC_GADS_ID` | `AW-17442865573` (a tag existente é mantida) |
| `NEXT_PUBLIC_GADS_LABEL_FORM` | `r6AGCKDi6LkdEKWDtP1A`, sem ID ou barra; vazio desativa esse envio |
| `NEXT_PUBLIC_GADS_LABEL_QUALIFIED` | `ctJQCKPi6LkdEKWDtP1A`; vazio desativa esse envio |
| `NEXT_PUBLIC_META_PIXEL_ID` | `1106058259251298`; vazio mantém Pixel desativado |
| `META_CAPI_TOKEN` | Opcional, somente servidor: ativa Conversions API com o mesmo Pixel/eventID |
| `TELEGRAM_BOT_TOKEN` | Credencial do bot de avisos e alertas |
| `TELEGRAM_CHAT_ID` | Conversa que recebe os avisos |
| `LEADS_ADMIN_TOKEN` | Segredo aleatório de alta entropia para a rota administrativa e recuperação do log |

O servidor grava os dados validados, origem, qualificação e data/hora UTC na chave `corddiali:lead:<UUID>`, junto com a inclusão no índice de pendentes. O registro não expira automaticamente. O mesmo UUID e conteúdo retornam o recibo existente. A reutilização do UUID com outros dados retorna 409.

O limite permanece em cinco tentativas por IP em 15 minutos. Se a consulta do limite falhar, a API registra um aviso e tenta salvar. Se o salvamento falhar, a resposta é 503, com continuação pelo WhatsApp. O servidor tenta emitir um registro estruturado `lead_recovery_v1` nos logs privados com o cadastro cifrado. Para recuperação, preserve o segredo administrativo vigente na data do incidente e consulte o registro antes da expiração dos logs. A chave AES-256-GCM é SHA-256 do prefixo UTF-8 `corddiali-recovery-v1`, seguido de um byte zero e do segredo em UTF-8. IV, tag e ciphertext estão em base64. O teste de recuperação demonstra a leitura do registro. Se o segredo estiver ausente, o log informa a falha do backup.

Após salvar, o servidor tenta Telegram, Resend e webhook configurado em paralelo, com timeout de quatro segundos por chamada. A resposta contém `saved:true`; `delivered` indica se algum canal confirmou. Uma falha mantém o cadastro pendente e gera uma tentativa separada de alerta no Telegram. Se o próprio Telegram estiver indisponível, a pendência continua consultável.

Use `Authorization: Bearer <LEADS_ADMIN_TOKEN>` no cabeçalho de ambas as operações administrativas. GET `/api/lead/pending?offset=0` retorna até 50 registros, incluindo canais e dados de contato. Avance o offset em 50 para consultar a próxima página. POST na mesma rota com JSON `{"id":"UUID-do-lead"}` tenta os canais pendentes ou falhos desse registro; o reenvio é manual. Uma trava temporária impede dois trabalhadores simultâneos para o mesmo ID. Se um provedor aceitar uma mensagem e a resposta se perder, um reenvio poderá duplicar o aviso em canais sem garantia de idempotência. O cadastro conserva o mesmo ID.

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

O `window.open` ocorre depois dos eventos. Se o navegador bloquear a abertura, há um link de continuidade visível. Scripts ausentes ou com erro não impedem a continuidade. O navegador exige HTTP 2xx e recibo com `saved:true` e ID para registrar a conversão.

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

### Cadastro curto (primeiro contato)

O formulário pede apenas **nome** e **WhatsApp com DDD**, mais o aceite da Política de Privacidade. O botão é "Quero falar sobre meu projeto". Ao enviar, a API salva o cadastro (ID, origem da visita, UTMs, `gclid`/`gbraid`/`wbraid`/`fbclid`) e a Resend envia ao comercial um e-mail com nome, telefone e ID do lead. Se o e-mail falhar, o cadastro continua salvo e pendente para reenvio (rota administrativa descrita acima).

- A conversão de formulário dispara só depois que a API confirma `saved:true`. Falha ao salvar (503) não dispara nenhuma conversão.
- O cadastro curto conta como **lead captado** (`lead_qualificado:false`). A qualificação acontece no atendimento. A conversão qualificada só dispara em envios no formato antigo, que a API continua aceitando (terreno, local, investimento e início opcionais).
- Depois do envio, a página mostra a confirmação e o botão "Conversar agora no WhatsApp". A conversa não abre sozinha; o clique nesse botão é contabilizado como "Clique no WhatsApp (site)", evento separado do formulário. O comercial recebe o telefone mesmo que o visitante nunca abra o WhatsApp.
- Canais não configurados (Telegram sem token/chat, webhook sem URL) ficam `disabled` e não mantêm o lead pendente.
