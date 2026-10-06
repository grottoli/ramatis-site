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

/**
 * Gera um resumo curto e limpo a partir do texto markdown de uma seção,
 * para usar como meta description (busca e compartilhamento).
 * Remove marcações, imagens, links e espaços repetidos, e corta numa
 * fronteira de palavra perto do limite.
 */
export function trechoDescricao(markdown: string, max = 160): string {
  const texto = (markdown || "")
    .replace(/^---[\s\S]*?---/, "")          // frontmatter, se houver
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")     // imagens
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")  // links -> texto
    .replace(/[#>*_`~]/g, "")                 // marcações
    .replace(/\s+/g, " ")                      // espaços/linhas repetidas
    .trim();
  if (texto.length <= max) return texto;
  const corte = texto.slice(0, max);
  const ultimoEspaco = corte.lastIndexOf(" ");
  return (ultimoEspaco > max * 0.6 ? corte.slice(0, ultimoEspaco) : corte).trimEnd() + "…";
}
