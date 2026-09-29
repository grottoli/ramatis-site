/**
 * Áreas de conteúdo do site. Hoje há uma — o Curso (as apostilas). Conteúdos
 * futuros (artigos, obras, mensagens…) entram aqui como novas entradas, e a
 * home passa a listá-los automaticamente.
 */
export type Area = {
  id: string;
  tipo: string; // rótulo curto: "Curso", "Artigos"…
  titulo: string;
  descricao: string;
  href: string;
  disponivel: boolean;
};

export const areas: Area[] = [
  {
    id: "curso",
    tipo: "Curso",
    titulo: "Preparando-se para o Terceiro Milênio",
    descricao:
      "Introdução ao estudo das obras de Ramatís, em apostilas publicadas na íntegra e na ordem original em que foram concebidas.",
    href: "/curso/",
    disponivel: true,
  },
];

export const areasDisponiveis = () => areas.filter((a) => a.disponivel);
