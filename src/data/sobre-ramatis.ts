/**
 * Catálogo da área "Sobre Ramatís": tópicos exibidos no portal e usados
 * para a navegação entre as páginas.
 */
export type Topico = {
  id: string;
  href: string;
  rotulo: string; // etiqueta curta usada no portal
  titulo: string;
  descricao: string;
  grupo: "ramatis" | "mais";
};

export const topicos: Topico[] = [
  {
    id: "biografia",
    href: "/sobre-ramatis/biografia/",
    rotulo: "Biografia",
    titulo: "Quem é Ramatís",
    descricao:
      "Vidas passadas: Lemúria, Atlântida, Egito (Merí Rá), Grécia (Pitágoras e Platão), Alexandria (Filon), e a última encarnação na Indochina do século X.",
    grupo: "ramatis",
  },
  {
    id: "imagem",
    href: "/sobre-ramatis/imagem/",
    rotulo: "A imagem à visão psíquica",
    titulo: "A imagem de Ramatís à visão psíquica",
    descricao:
      "A aura, a fisionomia e os trajes iniciáticos do Mestre, descritos por médiuns videntes — e o significado esotérico de cada detalhe.",
    grupo: "ramatis",
  },
  {
    id: "quadro",
    href: "/sobre-ramatis/quadro/",
    rotulo: "O quadro psicopictografado",
    titulo: "O quadro psicopictografado de Ramatís",
    descricao:
      "A história do retrato pelo qual Ramatís foi imortalizado, recebido na década de 1950 pela médium Dinorah Azevedo e presenteado a Hercílio Maes.",
    grupo: "ramatis",
  },
  {
    id: "fraternidade",
    href: "/sobre-ramatis/fraternidade/",
    rotulo: "A Fraternidade da Cruz e do Triângulo",
    titulo: "A Fraternidade da Cruz e do Triângulo",
    descricao:
      "As Fraternidades do Espaço e a comunidade sideral liderada por Ramatís, surgida da fusão da Fraternidade da Cruz (Ocidente) com a do Triângulo (Oriente).",
    grupo: "ramatis",
  },
  {
    id: "discipulos",
    href: "/sobre-ramatis/discipulos/",
    rotulo: "Os discípulos",
    titulo: "Os discípulos de Ramatís",
    descricao:
      "Atanagildo, Nicanor, Nhô Quim e Navarana — os companheiros espirituais que colaboram com Ramatís no plano Astral e na transmissão de suas obras.",
    grupo: "ramatis",
  },
  {
    id: "pensamento",
    href: "/sobre-ramatis/pensamento-universalista/",
    rotulo: "O pensamento universalista",
    titulo: "O pensamento universalista de Ramatís",
    descricao:
      "A aproximação crística entre os espiritualistas de boa vontade e a recusa de todo sectarismo religioso — a tônica da obra do Mestre.",
    grupo: "ramatis",
  },
  {
    id: "emmanuel",
    href: "/sobre-ramatis/emmanuel/",
    rotulo: "Emmanuel fala sobre Ramatís",
    titulo: "Emmanuel fala sobre Ramatís",
    descricao:
      "Entrevista do Conselho Editorial da LBV ao médium Francisco Cândido Xavier, em 5 de janeiro de 1954, em Pedro Leopoldo — Emmanuel confirma a mensagem de Ramatís sobre o Terceiro Milênio.",
    grupo: "mais",
  },
  {
    id: "mensagens",
    href: "/sobre-ramatis/mensagens/",
    rotulo: "Mensagens psicografadas",
    titulo: "Mensagens psicografadas de Ramatís",
    descricao:
      "Mensagens atribuídas a Ramatís recebidas pela Fraternidade Ramatís de Curitiba, começando pela mensagem sobre o lema e a missão da Casa.",
    grupo: "mais",
  },
];

export const topicoPor = (id: string) => topicos.find((t) => t.id === id);
