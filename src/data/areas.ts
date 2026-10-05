/**
 * Áreas de conteúdo do site. O conteúdo cresce por adição de entradas aqui +
 * páginas correspondentes. Áreas com `disponivel: false` aparecem como "em
 * breve" (ou nem aparecem; depende da apresentação).
 */
export type Area = {
  id: string;
  tipo: string; // rótulo curto da área, ex.: "Preparação 3º Milênio", "Sobre Ramatís"…
  titulo: string;
  descricao: string;
  href: string;
  disponivel: boolean;
};

export const areas: Area[] = [
  {
    id: "sobre-ramatis",
    tipo: "Sobre Ramatís",
    titulo: "Quem é Ramatís",
    descricao:
      "Biografia, a imagem à visão psíquica, o quadro psicopictografado, a Fraternidade da Cruz e do Triângulo, os discípulos, o pensamento universalista — e mensagens psicografadas atribuídas a Ramatís.",
    href: "/sobre-ramatis/",
    disponivel: true,
  },
  {
    id: "curso",
    tipo: "Preparação 3º Milênio",
    titulo: "Preparando-se para o Terceiro Milênio",
    descricao:
      "Introdução ao estudo das obras de Ramatís, em apostilas publicadas na íntegra e na ordem original em que foram concebidas.",
    href: "/curso/",
    disponivel: true,
  },
  {
    id: "obras",
    tipo: "Obras",
    titulo: "As obras psicografadas",
    descricao:
      "Catálogo das obras de Ramatís, agrupadas pelos médiuns que as receberam — Hercílio Maes, América Paoliello, Jan Val Ellam, Maria Liguori, Norberto Peixoto e outros.",
    href: "/obras/",
    disponivel: true,
  },
  {
    id: "hemeroteca",
    tipo: "Hemeroteca",
    titulo: "Reportagens e preciosidades",
    descricao:
      "Matérias históricas em revistas (Planeta, Manchete, Argentina, Cristã Espírita), documentos antigos e prefácios psicografados sobre Ramatís, preservados em PDF e transcrição.",
    href: "/hemeroteca/",
    disponivel: true,
  },
];

export const areasDisponiveis = () => areas.filter((a) => a.disponivel);
