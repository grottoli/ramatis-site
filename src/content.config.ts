import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const apostilas = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/apostilas" }),
  schema: z.object({
    apostila: z.string(),
    apostilaTitulo: z.string(),
    modulo: z.string(),
    ordem: z.number(),
    secao: z.number(),
    totalSecoes: z.number(),
    titulo: z.string(),
  }),
});

export const collections = { apostilas };
