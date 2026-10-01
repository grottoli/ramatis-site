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
  "01": {
    audio: "/apostilas/01/01-resumo-audio.m4a",
    video: "/apostilas/01/01-resumo-video.mp4",
  },
};

/** Resumo de uma apostila, se houver áudio ou vídeo cadastrado. */
export function resumoDe(apostila: string): Resumo | undefined {
  const r = resumos[apostila];
  if (!r || (!r.audio && !r.video)) return undefined;
  return r;
}
