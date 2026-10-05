/**
 * Catálogo das obras psicografadas atribuídas a Ramatís, agrupadas pelos
 * médiuns que as receberam. Cada obra tem capa em /obras/ e sinopse curta;
 * descrições completas e capítulos vivem nas páginas de cada médium
 * (/obras/[medium]/). Sinopses mais extensas estão também na Apostila 01
 * do curso (seções 9–15).
 */

export type Obra = {
  slug: string;        // slug único da obra
  titulo: string;
  capa: string;        // caminho em /obras/
  ano?: string;        // ano/edição se conhecido
  sinopse: string;     // 1 parágrafo curto, usado no catálogo
  descricao?: string;  // texto completo (opcional), usado na página do médium
  capitulos?: string[]; // títulos de capítulos (opcional)
};

export type Medium = {
  slug: string;        // ex.: "hercilio-maes"
  nome: string;        // ex.: "Hercílio Maes"
  descricao: string;   // apresentação curta do médium
  obras: Obra[];
};

/* ----- Hercílio Maes ----- */

const hercilioMaes: Medium = {
  slug: "hercilio-maes",
  nome: "Hercílio Maes",
  descricao:
    "O primeiro médium de Ramatís, reconhecido pela amplitude e profundidade das obras recebidas. Através de Hercílio Maes chegaram ao Ocidente as bases do pensamento universalista de Ramatís — do planejamento sideral do Terceiro Milênio à fisiologia oculta do perispírito, passando pela vida no plano Astral e a reinterpretação do Evangelho sob a luz do Cosmo.",
  obras: [
    {
      slug: "missao-do-espiritismo",
      titulo: "A Missão do Espiritismo",
      capa: "/obras/missao_espiritismo.jpg",
      sinopse:
        "Universalista, examina os grandes movimentos religiosos (Catolicismo, Protestantismo, Budismo, Teosofia, Umbanda) e as relações do Espiritismo com cada um — delineando sua missão de elo fraterno entre credos.",
      capitulos: [
        "A Missão do Espiritismo",
        "Espiritismo e Religião",
        "O Espiritismo e o Evangelho",
        "O Espiritismo e o Catolicismo",
        "O Espiritismo e o Protestantismo",
        "O Espiritismo e a Teosofia",
        "O Espiritismo e o Budismo",
        "O Espiritismo e a Psicanálise",
        "O Espiritismo e a Umbanda",
        "O Espiritismo e a Bíblia",
        "O Espiritismo em face da Homeopatia",
      ],
    },
    {
      slug: "sobrevivencia-do-espirito",
      titulo: "A Sobrevivência do Espírito",
      capa: "/obras/sobrevivencia_espirito.jpg",
      sinopse:
        "Com o discípulo Atanagildo, Ramatís trata da fisiologia oculta do corpo astral, da vida nos planos suprafísicos, da missão do Esperanto e dos poderes da alma em sua verdadeira pátria.",
      capitulos: [
        "Aspectos da mediunidade",
        "O “sentido” da vista, no Além",
        "Noções sobre o Perispírito e suas delicadas funções",
        "Revitalização do Perispírito no Astral",
        "A volição e o poder da vontade",
        "As forças mentais e seus poderes",
        "A música e seus efeitos",
        "Uma academia de Esperanto",
        "A missão do Esperanto na Terra",
        "O suicídio e suas conseqüências cármicas",
      ],
    },
    {
      slug: "vida-alem-da-sepultura",
      titulo: "A Vida Além da Sepultura",
      capa: "/obras/vida_alem_sepultura.jpg",
      sinopse:
        "Atanagildo descreve sua própria travessia e chegada no Além, com uma anatomia do processo do desencarne. Inclui ampla descrição da colônia Grande Coração, no Astral Superior.",
      capitulos: [
        "A caminho do Além",
        "A metrópole do Grande Coração",
        "Noções preliminares sobre o Além",
        "Residências e edificações",
        "Considerações sobre a desencarnação",
        "Colônias do Astral",
        "A obsessão, suas causas e efeitos",
        "As relações cármicas entre pais e filhos",
      ],
    },
    {
      slug: "vida-humana-espirito-imortal",
      titulo: "A Vida Humana e o Espírito Imortal",
      capa: "/obras/vida_humana_espirito_imortal.jpg",
      sinopse:
        "O lar como curso vestibular para a família universal: Ramatís trata da infância, família, limitação de filhos, alimentação, trabalho, idiomas, governos, religião e o futuro do Brasil.",
      capitulos: [
        "Problemas da infância",
        "Problemas da família",
        "Problemas da limitação de filhos",
        "Problemas da alimentação",
        "Problemas do trabalho",
        "Problemas dos idiomas",
        "Problemas dos Governos",
        "Problemas do vício de beber",
        "Problemas de Religião",
        "Problemas futuros do Brasil",
      ],
    },
    {
      slug: "vida-no-planeta-marte",
      titulo: "A Vida no Planeta Marte e os Discos Voadores",
      capa: "/obras/vida_planeta_marte.jpg",
      sinopse:
        "Ramatís transporta o leitor para o cotidiano da civilização marciana — cidades, arquitetura, lares, educação, medicina, música, naves espaciais. “Marte é um grau sideral à vossa vanguarda”.",
      capitulos: [
        "Aspectos gerais marcianos",
        "Casamento, Família, Infância",
        "Educação e escolas",
        "Religião, Medicina, Alimentação",
        "Esportes e divertimentos",
        "Música, Canto, dança e teatro",
        "Energia motriz",
        "Governo",
        "Aeronaves, espaçonaves, discos voadores",
        "Viagens interplanetárias",
      ],
    },
    {
      slug: "magia-de-redencao",
      titulo: "Magia de Redenção",
      capa: "/obras/magia_redencao.jpg",
      sinopse:
        "Análise objetiva da Magia, do significado do Ritual, dos processos de enfeitiçamento (verbal, mental, por objetos, aura humana, metais organogênicos) e do verdadeiro combustível das obsessões.",
      capitulos: [
        "Considerações sobre o feitiço",
        "Enfeitiçamento verbal",
        "Enfeitiçamento Mental",
        "Enfeitiçamento através de objetos",
        "Enfeitiçamento através da aura humana",
        "O mau olhado",
        "O uso de amuletos e talismãs",
        "Benzimentos e simpatias",
        "As defumações e as ervas de efeitos psíquicos",
        "Os males do vampirismo",
      ],
    },
    {
      slug: "elucidacoes-do-alem",
      titulo: "Elucidações do Além",
      capa: "/obras/elucidacoes_alem.jpg",
      sinopse:
        "Em perguntas e respostas: a constituição oculta do homem (corpos astral e mental, duplo etérico, chacras, prâna), faculdades psíquicas e a missão social e espiritual do Brasil.",
      capitulos: [
        "O Brasil e a sua missão social e espiritual",
        "O espiritismo e o caráter da sua assistência",
        "Elucidações sobre o perispírito",
        "Elucidações sobre a prece",
        "Relato e análise da psicometria",
        "Relato e análise da radiestesia",
        "Os trabalhos de fenômenos físicos",
        "O fenômeno da “voz direta”",
        "Algumas noções sobre o Prâna",
        "O duplo etérico e suas funções",
        "Os chacras",
      ],
    },
    {
      slug: "mediunidade-de-cura",
      titulo: "Mediunidade de Cura",
      capa: "/obras/mediunidade_cura.jpg",
      sinopse:
        "A terapêutica por via mediúnica: receituários, cirurgias espirituais, passes, água fluidificada, benzimentos e simpatias, eutanásia e distanásia — com a objetividade de um Mestre.",
      capitulos: [
        "A antiguidade do fenômeno mediúnico",
        "Novos aspectos da saúde e das enfermidades",
        "A assistência terapêutica dos espíritos",
        "Aspectos do receituário mediúnico alopata",
        "Os passes mediúnicos e o receituário de água fluidificada",
        "Os médiuns de cura e os curandeiros",
        "A terapêutica exótica dos benzimentos, exorcismos e simpatias",
        "A psicotécnica espírita nas operações cirúrgicas",
        "A assistência mediúnica aos moribundos",
      ],
    },
    {
      slug: "fisiologia-da-alma",
      titulo: "Fisiologia da Alma",
      capa: "/obras/fisiologia_alma.jpg",
      sinopse:
        "Mecanismo oculto que desencadeia, a partir dos corpos sutis, as enfermidades do físico. Alimentação carnívora, vegetarianismo, álcool, fumo, câncer, Homeopatia e carma.",
      capitulos: [
        "A alimentação carnívora e o vegetarianismo",
        "O vício de fumar e suas conseqüências futuras",
        "O vício do álcool e suas conseqüências",
        "A saúde e a enfermidade",
        "A evolução da Homeopatia",
        "A Homeopatia e a Alopatia",
        "A Homeopatia, a fé e a sugestão",
        "A medicina e o Espiritismo",
        "Considerações gerais sobre o Carma",
        "Considerações sobre a origem do câncer",
        "A terapêutica dos passes e a cooperação do enfermo",
      ],
    },
    {
      slug: "mediunismo",
      titulo: "Mediunismo",
      capa: "/obras/mediunismo.jpg",
      sinopse:
        "O amplo espectro dos fenômenos mediúnicos — dos efeitos físicos à intuição telepática — com atenção aos territórios inusitados e controversos da fenomenologia.",
      capitulos: [
        "No campo da mediunidade",
        "Considerações sobre o “Livro dos Médiuns”",
        "A mediunidade e o Consolador Prometido",
        "Todas as criaturas são médiuns?",
        "A prova da obsessão",
        "A mediunidade mecânica",
        "A mediunidade intuitiva e a de incorporação",
        "Mediunidade sonambúlica",
        "Trabalhos de tiptologia",
        "Considerações sobre a vidência",
        "A telepatia e as comunicações mediúnicas",
        "Considerações sobre o desenvolvimento mediúnico",
      ],
    },
    {
      slug: "mensagens-do-astral",
      titulo: "Mensagens do Astral",
      capa: "/obras/mensagens_astral.jpg",
      sinopse:
        "O planejamento sideral oculto por trás do “juízo final”: astro intruso, verticalização do eixo terrestre, seleção planetária, o signo de Peixes e a nova humanidade do Terceiro Milênio.",
      capitulos: [
        "Os tempos são chegados",
        "O juízo final",
        "As influências astrológicas",
        "O signo de Pisces",
        "O valor da profecia",
        "O simbolismo do apocalipse",
        "A besta apocalíptica",
        "O astro intruso e a sua influência sobre a Terra",
        "A verticalização do eixo da Terra",
        "Os Engenheiros Siderais e o Plano da Criação",
        "O terceiro milênio e a nova humanidade",
      ],
    },
    {
      slug: "semeando-e-colhendo",
      titulo: "Semeando e Colhendo",
      capa: "/obras/semeando_colhendo.jpg",
      sinopse:
        "Dezesseis contos reencarnacionistas transmitidos por Atanagildo. O conto “O Polvo” premiou Hercílio Maes com o primeiro lugar num concurso literário nacional.",
      capitulos: [
        "O Quebra Ossos",
        "Não se levanta!",
        "O Ergástulo de Carne",
        "A Mina",
        "Os Romeiros",
        "Assim estava escrito",
        "Inquisição Moderna",
        "O Cantor",
        "A Serraria",
        "Um mau negócio",
        "Frustração",
        "Adestramento Materno",
        "Hei de ser rico",
        "A Vida contra a vida",
        "Expurgo Psíquico",
        "Anjos Rebeldes",
      ],
    },
    {
      slug: "sublime-peregrino",
      titulo: "O Sublime Peregrino",
      capa: "/obras/sublime_peregrino.jpg",
      sinopse:
        "A realidade do Espírito angélico de Jesus, com informações dos “registros etéricos” e de discípulos do Mestre em serviço no Espaço. Longe de uma biografia romanceada.",
      capitulos: [
        "Considerações sobre a divindade e existência de Jesus",
        "Jesus e sua descida à Terra",
        "A descida Angélica e a queda Angélica",
        "Jesus de Nazaré e o Cristo Planetário",
        "A identidade sideral de Jesus",
        "Maria e sua missão na Terra",
        "Jesus e sua infância",
        "As pregações e parábolas de Jesus",
        "Jesus e os essênios",
        "A prisão e o julgamento de Jesus",
        "O drama do Calvário",
      ],
    },
    {
      slug: "evangelho-a-luz-do-cosmo",
      titulo: "O Evangelho à Luz do Cosmo",
      capa: "/obras/evangelho_luz_cosmo.jpg",
      sinopse:
        "Leitura esotérica dos ensinos e parábolas de Jesus — a dimensão cósmica das histórias singelas do Mestre nazareno como “miniatura do metabolismo do próprio Criador”.",
      capitulos: [
        "Deus",
        "Evolução",
        "O Evangelho e a Lei do Cosmo",
        "O Código Moral do Evangelho",
        "A Ciência e a Fé do Evangelho",
        "Jesus e as suas parábolas",
        "O Semeador",
        "“Meu reino não é deste mundo”",
        "“Sede Prefeitos”",
        "A Túnica Nupcial",
        "O trigo e o joio",
      ],
    },
    {
      slug: "sob-a-luz-do-espiritismo",
      titulo: "Sob a Luz do Espiritismo",
      capa: "/obras/sob_luz_espiritismo.jpg",
      sinopse:
        "Dilemas da vida cotidiana sob a Lei Cósmica: aborto, prostituição, homossexualidade, eutanásia, sexo, suicídio e a dor humana — na perspectiva da Espiritualidade Superior.",
      capitulos: [
        "A dor humana",
        "Os fenômenos físicos",
        "Exorcismo",
        "Suicídio",
        "Eutanásia",
        "Aborto",
        "A mente",
        "Sexo",
        "Homossexualismo",
        "Prostituição",
        "“Buscai e achareis”",
      ],
    },
  ],
};

/* ----- América Paoliello Marques ----- */

const americaPaoliello: Medium = {
  slug: "america-paoliello",
  nome: "América Paoliello Marques",
  descricao:
    "Médium também psicógrafa de Ramatís, recebeu obras em co-autoria com o discípulo Nicanor e tratou de temas universalistas e mediúnicos, com forte presença do Evangelho e da missão do Brasil.",
  obras: [
    {
      slug: "jesus-nova-jerusalem",
      titulo: "Jesus e a Nova Jerusalém",
      capa: "/obras/jesus_jerusalem_renovada.jpg",
      sinopse:
        "Obra psicografada por América Paoliello em colaboração com Ramatís — anúncio do Cristo e preparação espiritual para a Nova Era.",
    },
    {
      slug: "mensagens-grande-coracao",
      titulo: "Mensagens do Grande Coração",
      capa: "/obras/mensagens_grande_coracao.jpg",
      sinopse:
        "Mensagens vindas da colônia espiritual Metrópole do Grande Coração, em co-autoria com Ramatís, Nicanor e outros espíritos luminares.",
    },
    {
      slug: "brasil-terra-promissao",
      titulo: "Brasil, Terra de Promissão",
      capa: "/obras/brasil_terra_promissao.jpg",
      sinopse:
        "A missão espiritual do Brasil no Terceiro Milênio, à luz da Lei Cósmica — o papel do povo brasileiro na transição planetária.",
    },
    {
      slug: "evangelho-parapsicologia-ioga",
      titulo: "Evangelho, Parapsicologia e Ioga",
      capa: "/obras/evangelho_parapsicologia_io.jpg",
      sinopse:
        "Ponte entre o Evangelho, a parapsicologia moderna e as disciplinas iniciáticas do Oriente — leitura integrada da experiência espiritual.",
    },
  ],
};

/* ----- Maria Margarida Liguori ----- */

const mariaLiguori: Medium = {
  slug: "maria-liguori",
  nome: "Maria Margarida Liguori",
  descricao:
    "Médium que trouxe obras atribuídas a Ramatís marcadas pelo tom introspectivo — convite ao despertar da consciência, à busca da luz interior e à reflexão sobre a jornada da alma.",
  obras: [
    {
      slug: "despertar-da-consciencia",
      titulo: "O Despertar da Consciência",
      capa: "/obras/despertar_consciencia.jpg",
      sinopse:
        "O chamado interior ao despertar — reconhecimento do espírito imortal por trás da experiência humana.",
    },
    {
      slug: "homem-e-planeta-terra",
      titulo: "O Homem e o Planeta Terra",
      capa: "/obras/homem_planeta_terra.jpg",
      sinopse:
        "A relação profunda entre o ser humano e o planeta que o abriga: responsabilidade espiritual pela Terra.",
    },
    {
      slug: "jornada-de-luz",
      titulo: "Jornada de Luz",
      capa: "/obras/jornada_luz.jpg",
      sinopse:
        "A travessia da alma pelo mundo material como peregrinação iniciática rumo à luz do Pai.",
    },
    {
      slug: "em-busca-da-luz-interior",
      titulo: "Em Busca da Luz Interior",
      capa: "/obras/em_busca_luz_interior.jpg",
      sinopse:
        "Convite à introspecção: a luz que se busca fora já habita o santuário íntimo de cada criatura.",
    },
    {
      slug: "momentos-de-reflexao",
      titulo: "Momento de Reflexão (3 Volumes)",
      capa: "/obras/momentos_reflexao.jpg",
      sinopse:
        "Trilogia de pequenos textos para meditação diária — pausas de luz na correria do mundo.",
    },
  ],
};

/* ----- Norberto Peixoto ----- */

const norbertoPeixoto: Medium = {
  slug: "norberto-peixoto",
  nome: "Norberto Peixoto",
  descricao:
    "Médium contemporâneo que trouxe uma leva mais recente de obras atribuídas a Ramatís, com forte diálogo entre Espiritismo, Umbanda e tradição iniciática oriental.",
  obras: [
    {
      slug: "samadhi",
      titulo: "Samadhi",
      capa: "/obras/samadhi.jpg",
      sinopse:
        "O estado contemplativo de união com o Divino — introduzido na linguagem ocidental com clareza iniciática.",
    },
    {
      slug: "evolucao-no-planeta-azul",
      titulo: "Evolução no Planeta Azul",
      capa: "/obras/evolucao_planeta_azul.jpg",
      sinopse:
        "A trajetória evolutiva da humanidade terrena vista do Espaço — a Terra como escola de almas.",
    },
    {
      slug: "chama-cristica",
      titulo: "Chama Crística",
      capa: "/obras/chama_cristica.jpg",
      sinopse:
        "A Chama Crística que arde no íntimo de cada criatura — símbolo do estado pleno de amor que Jesus veio inaugurar.",
    },
    {
      slug: "jardim-dos-orixas",
      titulo: "Jardim dos Orixás",
      capa: "/obras/jardim_orixas.jpg",
      sinopse:
        "O panteão umbandista como jardim espiritual — leitura das forças da natureza e das linhas de trabalho da Umbanda.",
    },
  ],
};

/* ----- Jan Val Ellam ----- */

const janValEllam: Medium = {
  slug: "jan-val-ellam",
  nome: "Jan Val Ellam",
  descricao:
    "Médium que recebeu uma obra atribuída a Ramatís em diálogo com os temas da astronomia espiritual e da vida nos mundos siderais.",
  obras: [
    {
      slug: "muito-alem-do-horizonte",
      titulo: "Muito Além do Horizonte",
      capa: "/obras/muito_alem_horizonte.jpg",
      sinopse:
        "O horizonte da vida terrena como pequena fronteira do infinito — visão ampliada da Criação cósmica.",
    },
  ],
};

/* ----- Sidnei Carvalho (via Navarana) ----- */

const sidneiCarvalho: Medium = {
  slug: "sidnei-carvalho",
  nome: "Sidnei Carvalho",
  descricao:
    "Médium que recebeu obra transmitida por Navarana — discípulo de Ramatís, instrutor de mentalismo avançado na Metrópole do Grande Coração.",
  obras: [
    {
      slug: "sementes-do-infinito",
      titulo: "Sementes do Infinito",
      capa: "/obras/sementes_infinito.jpg",
      sinopse:
        "Mensagens de Navarana sobre a semeadura espiritual: cada pensamento, palavra e gesto como semente lançada no infinito.",
    },
  ],
};

/* ----- Resenhas ----- */

export type Resenha = {
  slug: string;
  titulo: string;
  capa: string;
  autor: string;
  sinopse: string;
};

export const resenhas: Resenha[] = [
  {
    slug: "ramatis-uma-proposta-de-luz",
    titulo: "Ramatís — Uma Proposta de Luz",
    capa: "/obras/proposta_luz.jpg",
    autor: "Autor diverso",
    sinopse:
      "Estudo e apresentação da obra de Ramatís como proposta universalista de luz para o Terceiro Milênio.",
  },
];

export const mediums: Medium[] = [
  hercilioMaes,
  americaPaoliello,
  mariaLiguori,
  norbertoPeixoto,
  janValEllam,
  sidneiCarvalho,
];

export const mediumPor = (slug: string) => mediums.find((m) => m.slug === slug);

export const totalObras = mediums.reduce((n, m) => n + m.obras.length, 0);
