export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
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
    image: "/images/casa-roma.jpg",
    description: "Residência contemporânea de alto padrão com foco em precisão executiva, acabamentos e gestão em modelo de preço fechado.",
    highlights: ["Arquitetura contemporânea", "Engenharia de precisão", "Gestão Turnkey"]
  },
  {
    slug: "adega-vino",
    title: "Adega Vino",
    category: "Gastronomia & Hospitality",
    location: "Balneário Camboriú / SC",
    image: "/images/adega-vino.jpg",
    description: "Execução comercial de alto refinamento com atenção a climatização, marcenaria, iluminação e cronograma de abertura.",
    highlights: ["Prazo comercial", "Acabamentos nobres", "Iluminação cênica"]
  },
  {
    slug: "smart-living",
    title: "Smart Living Container",
    category: "Construção Modular",
    location: "Itajaí / SC",
    image: "/images/smart-living.jpg",
    description: "Condomínio residencial modular unindo inteligência construtiva, velocidade executiva e estética industrial sofisticada.",
    highlights: ["Construção modular", "Eficiência", "Velocidade executiva"]
  },
  {
    slug: "porto-santo",
    title: "Porto Santo Residence",
    category: "Edifício Vertical",
    location: "Porto Belo / SC",
    image: "/images/porto-santo.jpg",
    description: "Empreendimento vertical de grande porte que demonstra capacidade executiva e coordenação técnica de alta complexidade.",
    highlights: ["4.940 m²", "16 pavimentos", "18 apartamentos + penthouse"]
  }
];
