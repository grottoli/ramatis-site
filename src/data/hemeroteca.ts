/**
 * Hemeroteca: acervo de reportagens, documentos e preciosidades sobre
 * Ramatís publicados em veículos externos ao longo das décadas. Cada
 * item pode ter PDF (digitalização do original), transcrição em página
 * própria (href para `/hemeroteca/<slug>/`), ou ambos.
 */

export type Item = {
  slug: string;
  titulo: string;
  veiculo: string;        // revista/jornal/livro de origem
  data?: string;          // data da publicação original (texto livre)
  descricao: string;      // 2–4 linhas para o cartão
  pdf?: string;           // caminho em /hemeroteca/
  transcricao?: string;   // href da página de transcrição
  cross?: { href: string; rot: string }; // link relacionado (ex.: entrevista já transcrita em outra área)
};

export type Grupo = {
  slug: string;
  nome: string;
  descricao: string;
  itens: Item[];
};

export const grupos: Grupo[] = [
  {
    slug: "prefacios-mensagens",
    nome: "Prefácios e mensagens",
    descricao:
      "Textos de Ramatís oferecidos como prefácio ou mensagem a obras e eventos específicos — recebidos através de seus médiuns.",
    itens: [
      {
        slug: "prefacio-dor-luz",
        titulo: "Prefácio para “A Luz e a Dor Salvarão o Mundo”",
        veiculo: "Livro de José Fuzeira",
        data: "20 de janeiro de 1956",
        descricao:
          "Mensagem psicografada por Hercílio Maes, oferecida como prefácio à obra do irmão José Fuzeira. Convocação à vigilância espiritual diante do advento da “Besta” do Apocalipse e do Terceiro Milênio.",
        pdf: "/hemeroteca/prefacio-dor-luz.pdf",
        transcricao: "/hemeroteca/prefacio-dor-luz/",
      },
    ],
  },
  {
    slug: "reportagens-revistas",
    nome: "Reportagens em revistas",
    descricao:
      "Matérias publicadas em revistas de circulação nacional e internacional, reunindo o olhar da imprensa secular e espiritualista sobre Ramatís.",
    itens: [
      {
        slug: "revista-crista-espirita",
        titulo: "Ramatís",
        veiculo: "Revista Cristã Espírita",
        descricao:
          "Apresentação do mestre Ramatís para o público espírita: biografia, pensamento universalista, Fraternidade da Cruz e do Triângulo, Ramatís e Kardec, visão do mestre e sua obra.",
        transcricao: "/hemeroteca/revista-crista-espirita/",
      },
      {
        slug: "revista-planeta",
        titulo: "Reportagem na Revista Planeta",
        veiculo: "Revista Planeta",
        descricao:
          "Matéria publicada pela Revista Planeta sobre Ramatís e os ensinamentos trazidos pelo mestre através de Hercílio Maes.",
        pdf: "/hemeroteca/revista-planeta.pdf",
      },
      {
        slug: "revista-manchete",
        titulo: "Reportagem na Revista Manchete",
        veiculo: "Revista Manchete",
        descricao:
          "Matéria da Revista Manchete apresentando Ramatís ao grande público brasileiro em uma das revistas de maior circulação do país.",
        pdf: "/hemeroteca/revista-manchete.pdf",
      },
      {
        slug: "revista-argentina",
        titulo: "Reportagem em revista argentina",
        veiculo: "Revista argentina (em espanhol)",
        descricao:
          "Reportagem publicada em revista argentina — testemunho do alcance internacional das ideias de Ramatís para além do Brasil.",
        pdf: "/hemeroteca/revista-argentina.pdf",
      },
    ],
  },
  {
    slug: "documentos",
    nome: "Documentos",
    descricao:
      "Documentos digitalizados — originais históricos preservados em PDF, incluindo entrevistas e textos de outros médiuns referentes a Ramatís.",
    itens: [
      {
        slug: "emmanuel-sobre-ramatis",
        titulo: "Emmanuel fala sobre Ramatís (original)",
        veiculo: "Revista da Boa Vontade — LBV",
        data: "5 de janeiro de 1954 · publicada em outubro de 1956",
        descricao:
          "Documento original da entrevista do Conselho Editorial da LBV ao médium Francisco Cândido Xavier, em Pedro Leopoldo, na qual Emmanuel confirma a mensagem de Ramatís sobre o Terceiro Milênio.",
        pdf: "/hemeroteca/emmanuel-sobre-ramatis.pdf",
        cross: { href: "/sobre-ramatis/emmanuel/", rot: "Ler transcrição completa em Sobre Ramatís" },
      },
      {
        slug: "doc-o-sol",
        titulo: "Documento “O Sol”",
        veiculo: "Documento histórico",
        descricao:
          "Digitalização de documento histórico intitulado “O Sol” — material preservado no acervo da Fraternidade Ramatís de Curitiba.",
        pdf: "/hemeroteca/doc-o-sol.pdf",
      },
    ],
  },
];

export const totalItens = grupos.reduce((n, g) => n + g.itens.length, 0);
