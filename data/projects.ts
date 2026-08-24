export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  area?: string;
  image: string;
  gallery?: string[];
  description: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "casa-roma",
    title: "Casa Roma — Vivapark",
    category: "Residencial de Luxo",
    location: "Porto Belo / SC",
    image: "/images/projetos/casa-roma/casa-roma-01.webp",
    gallery: [
      "/images/projetos/casa-roma/casa-roma-02.webp",
      "/images/projetos/casa-roma/casa-roma-03.webp",
      "/images/projetos/casa-roma/casa-roma-04.webp",
    ],
    description:
      "Residência contemporânea de alto padrão no Vivapark Porto Belo, com execução orientada à qualidade, precisão construtiva e excelência nos acabamentos.",
    highlights: [
      "Vivapark Porto Belo",
      "Arquitetura contemporânea",
      "Engenharia de precisão",
      "Execução de alto padrão",
    ],
  },

  {
    slug: "casa-all-wert",
    title: "Casa All Resort — Porto Belo",
    category: "Residencial de Luxo",
    location: "Porto Belo / SC",
    image: "/images/projetos/casa-all-wert/all-wert-01.webp",
    gallery: [
      "/images/projetos/casa-all-wert/all-wert-02.webp",
      "/images/projetos/casa-all-wert/all-wert-03.webp",
      "/images/projetos/casa-all-wert/all-wert-04.webp",
    ],
    description:
      "Residência de alto padrão localizada no All Resort Porto Belo, complexo urbanístico de 220 hectares que integra moradia, lazer, esporte, natureza e infraestrutura de padrão internacional.",
    highlights: [
      "All Resort Porto Belo",
      "Complexo de 220 hectares",
      "Campo de golfe iluminado",
      "Praia artificial com ondas de surfe",
      "Infraestrutura esportiva premium",
    ],
  },

  {
    slug: "adega-vino",
    title: "Adega Vino!",
    category: "Gastronomia & Hospitality",
    location: "Balneário Camboriú / SC",
    image: "/images/projetos/adega-vino/adega-vino-01.webp",
    gallery: [
      "/images/projetos/adega-vino/adega-vino-01.webp",
    ],
    description:
      "Execução comercial de alto padrão para o restaurante Vino! em Balneário Camboriú, com atenção aos acabamentos, iluminação e experiência do ambiente.",
    highlights: [
      "Execução comercial",
      "Acabamentos nobres",
      "Gastronomia & Hospitality",
    ],
  },

  {
    slug: "smart-living",
    title: "Smart Living Container",
    category: "Construção Modular",
    location: "Itajaí / SC",
    image: "/images/projetos/smart-living/smart-living-01.webp",
    gallery: [
      "/images/projetos/smart-living/smart-living-01.webp",
      "/images/projetos/smart-living/smart-living-02.webp",
    ],
    description:
      "Condomínio residencial modular contemporâneo desenvolvido com foco em eficiência construtiva, velocidade de execução e soluções modernas.",
    highlights: [
      "Construção modular",
      "Eficiência",
      "Velocidade de execução",
    ],
  },

  {
    slug: "porto-santo",
    title: "Porto Santo Residence",
    category: "Edifício Vertical",
    location: "Porto Belo / SC",
    area: "4.940 m²",
    image: "/images/projetos/porto-santo/porto-santo-01.webp",
    gallery: [
      "/images/projetos/porto-santo/porto-santo-01.webp",
      "/images/projetos/porto-santo/porto-santo-02.webp",
      "/images/projetos/porto-santo/porto-santo-03.webp",
    ],
    description:
      "Empreendimento vertical de grande porte em Porto Belo, desenvolvido com foco em qualidade construtiva e excelência de execução.",
    highlights: [
      "4.940 m²",
      "16 pavimentos",
      "18 apartamentos + penthouses",
    ],
  },

  {
    slug: "bethania",
    title: "Casa Bethânia",
    category: "Residencial de Alto Padrão",
    location: "Lages / SC",
    image: "/images/projetos/bethania/bethania-01.webp",
    gallery: [
      "/images/projetos/bethania/bethania-01.webp",
    ],
    description:
      "Residência de alto padrão desenvolvida com atenção à arquitetura, integração dos ambientes e qualidade construtiva.",
    highlights: [
      "Residencial de alto padrão",
      "Mais de 300 m²",
      "Execução premium",
    ],
  },

  {
    slug: "jardim-panoramico",
    title: "Casa Jardim Panorâmico",
    category: "Residencial de Alto Padrão",
    location: "Lages / SC",
    area: "312 m²",
    image:
      "/images/projetos/jardim-panoramico/jardim-panoramico-01.webp",
    gallery: [
      "/images/projetos/jardim-panoramico/jardim-panoramico-01.webp",
    ],
    description:
      "Residência contemporânea de 312 m², projetada e executada com foco em conforto, integração e elevado padrão construtivo.",
    highlights: [
      "312 m²",
      "Arquitetura contemporânea",
      "Alto padrão construtivo",
    ],
  },

  {
    slug: "arezzo",
    title: "Arezzo",
    category: "Varejo de Luxo",
    location: "Santa Catarina",
    image: "/images/projetos/arezzo/arezzo-01.webp",
    gallery: [
      "/images/projetos/arezzo/arezzo-01.webp",
      "/images/projetos/arezzo/arezzo-02.webp",
    ],
    description:
      "Execução de lojas franqueadas da marca Arezzo em Santa Catarina, seguindo padrões de identidade, acabamento e experiência de varejo.",
    highlights: [
      "Execução de lojas",
      "Padronização de marca",
      "Varejo premium",
    ],
  },
];
