import { getCollection, type CollectionEntry } from "astro:content";

export type Secao = CollectionEntry<"apostilas">;
export type Apostila = { numero: string; titulo: string; modulo: string; secoes: Secao[] };

/** Todas as seções, em ordem global (apostila, depois seção). */
export async function todasSecoes(): Promise<Secao[]> {
  return (await getCollection("apostilas")).sort((a, b) => a.data.ordem - b.data.ordem);
}

/** Apostilas agrupadas, cada uma com suas seções em ordem. */
export async function apostilas(): Promise<Apostila[]> {
  const secoes = await todasSecoes();
  const mapa = new Map<string, Apostila>();
  for (const s of secoes) {
    const n = s.data.apostila;
    if (!mapa.has(n)) mapa.set(n, { numero: n, titulo: s.data.apostilaTitulo, modulo: s.data.modulo, secoes: [] });
    mapa.get(n)!.secoes.push(s);
  }
  return [...mapa.values()].sort((a, b) => Number(a.numero) - Number(b.numero));
}

/** Vizinhas de uma seção: anterior e próxima DENTRO da mesma apostila. */
export async function vizinhasNaApostila(id: string) {
  const secoes = await todasSecoes();
  const i = secoes.findIndex((s) => s.id === id);
  const atual = secoes[i];
  const anterior = secoes[i - 1];
  const proxima = secoes[i + 1];
  return {
    anterior: anterior && anterior.data.apostila === atual.data.apostila ? anterior : undefined,
    proxima: proxima && proxima.data.apostila === atual.data.apostila ? proxima : undefined,
  };
}
