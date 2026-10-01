/**
 * Resumos em áudio e vídeo de cada apostila. Cada apostila tem, no máximo,
 * UM áudio e UM vídeo — um resumo da apostila inteira (não por seção).
 * Os arquivos ficam em public/apostilas/NN/ (versionados via Git LFS).
 *
 * Para liberar o resumo de uma apostila, basta adicionar a entrada aqui com
 * os arquivos correspondentes já salvos em public/. A capa da apostila e o
 * índice lateral mostram o bloco de resumo só quando a entrada existe.
 */
export type Resumo = {
  /** Caminho do áudio em /public, ou undefined se ainda não há. */
  audio?: string;
  /** Caminho do vídeo em /public, ou undefined se ainda não há. */
  video?: string;
  /** Duração legível opcional, ex.: "9min". */
  duracao?: string;
};

export const resumos: Record<string, Resumo> = {
  "01": { audio: "/midia/01/01-resumo-audio.m4a", video: "/midia/01/01-resumo-video.mp4" },
  "02": { audio: "/midia/02/02-resumo-audio.m4a", video: "/midia/02/02-resumo-video.mp4" },
  "03": { audio: "/midia/03/03-resumo-audio.m4a", video: "/midia/03/03-resumo-video.mp4" },
  "04": { audio: "/midia/04/04-resumo-audio.m4a", video: "/midia/04/04-resumo-video.mp4" },
  "05": { audio: "/midia/05/05-resumo-audio.m4a", video: "/midia/05/05-resumo-video.mp4" },
  "06": { audio: "/midia/06/06-resumo-audio.m4a", video: "/midia/06/06-resumo-video.mp4" },
  "07": { audio: "/midia/07/07-resumo-audio.m4a", video: "/midia/07/07-resumo-video.mp4" },
  "08": { audio: "/midia/08/08-resumo-audio.m4a", video: "/midia/08/08-resumo-video.mp4" },
  "09": { audio: "/midia/09/09-resumo-audio.m4a", video: "/midia/09/09-resumo-video.mp4" },
  "10": { audio: "/midia/10/10-resumo-audio.m4a", video: "/midia/10/10-resumo-video.mp4" },
  "11": { audio: "/midia/11/11-resumo-audio.m4a", video: "/midia/11/11-resumo-video.mp4" },
  "12": { audio: "/midia/12/12-resumo-audio.m4a", video: "/midia/12/12-resumo-video.mp4" },
  "13": { audio: "/midia/13/13-resumo-audio.m4a", video: "/midia/13/13-resumo-video.mp4" },
  "14": { audio: "/midia/14/14-resumo-audio.m4a", video: "/midia/14/14-resumo-video.mp4" },
  "15": { audio: "/midia/15/15-resumo-audio.m4a", video: "/midia/15/15-resumo-video.mp4" },
  // 16: sem mídia (PDF da apostila 16 não está no Drive).
  "17": { audio: "/midia/17/17-resumo-audio.m4a", video: "/midia/17/17-resumo-video.mp4" },
  "18": { audio: "/midia/18/18-resumo-audio.m4a", video: "/midia/18/18-resumo-video.mp4" },
  "19": { audio: "/midia/19/19-resumo-audio.m4a", video: "/midia/19/19-resumo-video.mp4" },
  // Mídia pronta mesmo p/ apostilas cujo conteúdo (src/content/apostilas/NN-*.md)
  // ainda não existe — a capa só renderiza o bloco quando a apostila existir.
};

/** Resumo de uma apostila, se houver áudio ou vídeo cadastrado. */
export function resumoDe(apostila: string): Resumo | undefined {
  const r = resumos[apostila];
  if (!r || (!r.audio && !r.video)) return undefined;
  return r;
}
