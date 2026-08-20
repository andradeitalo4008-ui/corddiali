export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  area?: string;
  image: string;
  description: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "casa-roma",
    title: "Casa Roma — Vivapark",
    category: "Residencial de Luxo",
    location: "Porto Belo / SC",
    imagem: "/images/casa roma viva parque/Imagem do WhatsApp 2026-08-20 às 13:54:11 (1).jpeg",
    description: "Residência contemporânea de alto padrão executada com gestão de engenharia e modelo Preço Fechado.",
    highlights: ["Arquitetura contemporânea", "Engenharia de precisão", "Gestão Turnkey"]
  },
  {
    slug: "adega-vino",
    title: "Adega Vino",
    category: "Gastronomia & Hospitality",
    location: "Balneário Camboriú / SC",
    image: "/images/adega-vino.svg",
    description: "Execução comercial de alto refinamento estético com foco em acabamentos, iluminação, climatização e controle de prazo.",
    highlights: ["Execução comercial", "Acabamentos nobres", "Iluminação cênica", "Controle de prazo"]
  },
  {
    slug: "smart-living",
    title: "Smart Living Container",
    category: "Construção Modular",
    location: "Itajaí / SC",
    image: "/images/smart-living.svg",
    description: "Condomínio residencial modular contemporâneo, unindo inteligência construtiva, velocidade executiva e estética industrial sofisticada.",
    highlights: ["Construção modular", "Eficiência", "Velocidade executiva", "Design contemporâneo"]
  },
  {
    slug: "porto-santo",
    title: "Porto Santo Residence",
    category: "Edifício Vertical",
    location: "Porto Belo / SC",
    area: "4.940 m²",
    image: "/images/porto-santo.svg",
    description: "Empreendimento vertical de grande porte em parceria com a MJ7, demonstrando capacidade executiva em obras de alta complexidade.",
    highlights: ["4.940 m²", "16 pavimentos", "18 apartamentos + penthouse", "Rooftop"]
  },
  {
    slug: "casas-lages",
    title: "Casas de Alto Padrão — Lages",
    category: "Residencial Contemporâneo",
    location: "Lages / SC",
    image: "/images/casas-lages.svg",
    description: "Residências exclusivas de grande porte integradas ao clima da serra catarinense.",
    highlights: ["Casa Bethânia +300 m²", "Casa Jardim Panorâmico 312 m²"]
  },
  {
    slug: "arezzo",
    title: "Arezzo",
    category: "Varejo de Luxo",
    location: "Santa Catarina",
    image: "/images/arezzo.svg",
    description: "Execução de lojas franqueadas da marca Arezzo em Santa Catarina sob rigoroso padrão de padronização.",
    highlights: ["Execução acelerada", "Padronização de marca", "Varejo premium"]
  }
];
