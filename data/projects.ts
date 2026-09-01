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
    category: "Residencial de Alto Padrão",
    location: "Porto Belo / SC",
    image: "/images/projetos/casa-roma/casa-roma-01.webp",
    gallery: [
      "/images/projetos/casa-roma/casa-roma-02.webp",
      "/images/projetos/casa-roma/casa-roma-03.webp",
      "/images/projetos/casa-roma/casa-roma-04.webp",
    ],
    description:
      "Residência contemporânea de alto padrão no Vivapark Porto Belo, executada com foco em qualidade construtiva, precisão técnica e excelência nos acabamentos.",
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
    category: "Residencial de Alto Padrão",
    location: "Porto Belo / SC",
    image: "/images/projetos/casa-all-wert/all wert - fachada .jpg",

gallery: [
  "/images/projetos/casa-all-wert/all wert - externa.jpg",
  "/images/projetos/casa-all-wert/all wert - externa ensolarado.jpg",
  "/images/projetos/casa-all-wert/all wert - externa ensolarado2.jpg",
],
    
    description:
      "Residência de alto padrão inserida no All Resort Porto Belo, complexo urbanístico que integra moradia, lazer, esporte, natureza e infraestrutura de padrão internacional.",
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
    image: "/images/projetos/adega-vino/VINO-FOTO PRINCIPAL.PNG",

gallery: [
  "/images/projetos/adega-vino/VINO-ESCADA VERMELHA.PNG",
  "/images/projetos/adega-vino/VINO-ESCADA VINHOS.jpeg",
  "/images/projetos/adega-vino/VINO-FACHADA A NOITE.jpeg",
  "/images/projetos/adega-vino/VINO-FOTO ROLHOMETRO.jpeg",
  "/images/projetos/adega-vino/VINO-FRENTE.jpeg",
  "/images/projetos/adega-vino/VINO-FUNDOS VISA DE CIMA.jpeg",
  "/images/projetos/adega-vino/VINO-MESA DE FRENTE ESCADA.jpeg",
  "/images/projetos/adega-vino/VINO-MESA DO LAGO.jpeg",
  "/images/projetos/adega-vino/VINO-PORTA ENTRADA.jpeg",
  "/images/projetos/adega-vino/VINO-PORTA FERRO.jpeg",
  "/images/projetos/adega-vino/VINO-SALA 1.PNG",
  "/images/projetos/adega-vino/VINO-SALA3.jpeg",
  "/images/projetos/adega-vino/VINO-SEJA BEM VINO.PNG",
  "/images/projetos/adega-vino/VINO-TETO DE TACA.jpeg",
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

 image: "/images/projetos/smart-living/SmartLivingContainer-FOTO PRINCIPAL PROJETO.PNG",

gallery: [
  "/images/projetos/smart-living/SmartLivingContainer 1 (1).jpeg",
  "/images/projetos/smart-living/SmartLivingContainer 1 (2).jpeg",
  "/images/projetos/smart-living/SmartLivingContainer 1 (3).jpeg",
  "/images/projetos/smart-living/SmartLivingContainer-CORREDOR DE BAIXO.jpeg",
  "/images/projetos/smart-living/SmartLivingContainer-CORREDOR DE CIMA.jpeg",
  "/images/projetos/smart-living/SmartLivingContainer-FOTO1.jpeg",
  "/images/projetos/smart-living/SmartLivingContainer-PROJETO FRENTE.PNG",
],

  description:
    "Condomínio residencial modular contemporâneo desenvolvido com foco em eficiência construtiva, racionalização de recursos e agilidade de execução.",

  highlights: [
    "Construção modular",
    "Eficiência construtiva",
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
      "/images/projetos/porto-santo/porto-santo-02.webp",
      "/images/projetos/porto-santo/porto-santo-03.webp",
    ],
    description:
      "Gestão completa do empreendimento junto à construtora. São 4.940 m² de obra distribuídos em 16 pavimentos, com lazer no rooftop, apartamentos de 120 m² e penthouse de 240 m².",
    highlights: [
      "4.940 m² de obra",
      "16 pavimentos",
      "Lazer no rooftop",
      "Apartamentos de 120 m²",
      "Penthouse de 240 m²",
    ],
  },

  {
    slug: "bethania",
    title: "Bethânia Residence",
    category: "Residencial Contemporâneo",
    location: "Lages / SC",
    area: "+300 m²",
    image: "/images/projetos/bethania/bethania-01.webp",
    gallery: [],
    description:
      "Casa com mais de 300 m² distribuídos em três andares, com linguagem contemporânea e execução de alto padrão em Lages, na Serra Catarinense.",
    highlights: [
      "Mais de 300 m²",
      "03 andares",
      "Estilo contemporâneo",
      "Lages / SC",
    ],
  },

  {
    slug: "jardim-panoramico",
    title: "Jardim Panorâmico",
    category: "Residencial Contemporâneo",
    location: "Lages / SC",
    area: "312 m²",
    image:
      "/images/projetos/jardim-panoramico/jardim-panoramico-01.webp",
    gallery: [],
    description:
      "Casa com 312 m² executada na cidade de Lages, na Serra Catarinense, com foco em qualidade construtiva e arquitetura residencial contemporânea.",
    highlights: [
      "312 m²",
      "Lages / SC",
      "Serra Catarinense",
      "Residencial contemporâneo",
    ],
  },

  {
    slug: "arezzo",
    title: "Lojas Arezzo",
    category: "Varejo Premium",
    location: "Santa Catarina",
    image: "/images/projetos/arezzo/arezzo-01.webp",
    gallery: [
      "/images/projetos/arezzo/arezzo-02.webp",
    ],
    description:
      "Instalação de lojas Arezzo em Santa Catarina, com execução alinhada ao padrão de identidade, acabamento e experiência da marca.",
    highlights: [
      "Instalação de lojas",
      "Santa Catarina",
      "Padronização de marca",
      "Varejo premium",
    ],
  },
];
