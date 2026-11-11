import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Corddiali coleta, usa e protege os dados pessoais de quem entra em contato pelo site, pelo WhatsApp ou por formulários de anúncios.",
};

const WHATSAPP_URL = "https://wa.me/5549991360745";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Quem somos",
    body: (
      <p>
        Esta política se aplica ao site www.corddiali.com.br e aos canais de
        atendimento da CORDDIALI CONSTRUCOES PERSONALIZADAS LTDA, inscrita no
        CNPJ nº 58.818.156/0001-64 (&ldquo;Corddiali&rdquo;), empresa de construção de casas de alto
        padrão com atuação no litoral de Santa Catarina. A Corddiali é a
        controladora dos dados pessoais tratados nesses canais, nos termos da
        Lei Geral de Proteção de Dados (Lei nº 13.709/2018 &ndash; LGPD).
      </p>
    ),
  },
  {
    title: "2. Quais dados coletamos",
    body: (
      <>
        <p>Coletamos apenas os dados que você nos informa ou que são necessários para o funcionamento do site:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>
            <strong>Dados de contato:</strong> nome, número de WhatsApp ou
            telefone, e-mail e cidade, quando você preenche o formulário do
            site, um formulário de anúncio (Google ou Meta) ou fala conosco
            pelo WhatsApp.
          </li>
          <li>
            <strong>Informações sobre o projeto:</strong> se possui terreno,
            localização do terreno, prazo pretendido para a obra, faixa de
            investimento, existência de projeto arquitetônico e outras
            informações que você decidir compartilhar.
          </li>
          <li>
            <strong>Dados de navegação:</strong> informações técnicas como
            páginas visitadas, tipo de dispositivo e interações com o site,
            coletadas por cookies e tecnologias semelhantes.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Para que usamos os dados",
    body: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Responder ao seu contato e entender a viabilidade do seu projeto.</li>
        <li>Agendar conversas, visitas e enviar orçamentos e propostas.</li>
        <li>Enviar informações sobre a Corddiali, quando você tiver solicitado.</li>
        <li>
          Medir o desempenho do site e dos anúncios e melhorar a forma como
          apresentamos nossos serviços.
        </li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>
    ),
  },
  {
    title: "4. Base legal",
    body: (
      <p>
        Tratamos seus dados com base no seu consentimento, na execução de
        procedimentos preliminares a um contrato (como orçamentos e propostas)
        solicitados por você, no legítimo interesse da Corddiali em atender e
        acompanhar contatos comerciais, e no cumprimento de obrigações legais,
        conforme o artigo 7º da LGPD.
      </p>
    ),
  },
  {
    title: "5. Cookies e anúncios",
    body: (
      <>
        <p>
          O site utiliza a tag do Google Ads para medir conversões, como
          cliques no botão de WhatsApp vindos de anúncios. Também podemos
          utilizar ferramentas de mensuração da Meta (Facebook e Instagram).
          Essas ferramentas podem usar cookies para entender se um anúncio
          gerou contato e para exibir anúncios a pessoas que já visitaram o
          site.
        </p>
        <p className="mt-4">
          Você pode bloquear ou apagar cookies nas configurações do seu
          navegador e ajustar suas preferências de anúncios nas contas do
          Google e da Meta.
        </p>
      </>
    ),
  },
  {
    title: "6. Com quem compartilhamos",
    body: (
      <>
        <p>
          A Corddiali não vende dados pessoais. Os dados podem ser tratados por
          fornecedores que nos ajudam a operar o atendimento e os anúncios,
          sempre limitados a essa finalidade:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Google (Google Ads e formulários de lead do Google);</li>
          <li>Meta (Facebook, Instagram, WhatsApp e formulários instantâneos);</li>
          <li>provedores de hospedagem do site e ferramentas de organização dos contatos.</li>
        </ul>
        <p className="mt-4">
          Também poderemos compartilhar dados quando exigido por lei ou por
          ordem de autoridade competente. Alguns desses fornecedores podem
          armazenar dados fora do Brasil, observando as regras da LGPD para
          transferência internacional.
        </p>
      </>
    ),
  },
  {
    title: "7. Por quanto tempo guardamos",
    body: (
      <p>
        Mantemos os dados pelo tempo necessário para atender ao seu contato e
        acompanhar a negociação. Se não houver contratação, os dados podem ser
        mantidos por até 24 meses para eventual retomada da conversa, salvo se
        você pedir a exclusão antes. Dados de clientes são mantidos pelo prazo
        exigido pela legislação aplicável.
      </p>
    ),
  },
  {
    title: "8. Seus direitos",
    body: (
      <>
        <p>Pela LGPD, você pode, a qualquer momento:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>confirmar se tratamos seus dados e acessá-los;</li>
          <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>pedir a anonimização, o bloqueio ou a eliminação de dados;</li>
          <li>revogar o consentimento e pedir para não receber mais contatos;</li>
          <li>solicitar informações sobre com quem compartilhamos seus dados.</li>
        </ul>
        <p className="mt-4">
          Para exercer esses direitos, fale conosco pelo{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            WhatsApp (49) 99136-0745
          </a>
          . Responderemos no prazo previsto em lei.
        </p>
      </>
    ),
  },
  {
    title: "9. Segurança",
    body: (
      <p>
        Adotamos medidas técnicas e administrativas razoáveis para proteger os
        dados contra acesso não autorizado, perda ou uso indevido, e
        restringimos o acesso às pessoas da equipe que precisam deles para o
        atendimento.
      </p>
    ),
  },
  {
    title: "10. Alterações desta política",
    body: (
      <p>
        Esta política pode ser atualizada para refletir mudanças nos nossos
        canais ou na legislação. A versão vigente estará sempre publicada
        nesta página.
      </p>
    ),
  },
];

export default function PoliticaDePrivacidade() {
  return (
    <main>
      <Header />

      <section className="section pt-36">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="eyebrow">Privacidade</div>

            <h1 className="display text-5xl md:text-6xl mt-4 leading-[0.95]">
              Política de Privacidade
            </h1>

            <p className="muted text-lg leading-8 mt-6">
              Última atualização: 10 de novembro de 2026.
            </p>

            <div className="mt-14 space-y-12 muted text-base leading-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-2xl md:text-3xl text-white mb-4">
                    {section.title}
                  </h2>
                  {section.body}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
