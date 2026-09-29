# Fraternidade Ramatís — apostilas do curso

Site estático que publica as apostilas do curso **"Preparando-se para o Terceiro Milênio"** na íntegra, na ordem original em que foram concebidas, com as imagens (o quadro psicopictografado de Ramatís e as capas dos livros citados).

## Estado atual

**Piloto com a apostila 01 ("Ramatís e sua obra")**, para validar o formato. Cada apostila é dividida em **seções**, uma por página, com navegação anterior/próxima e um índice lateral. Falta processar as apostilas 02 a 19.

## Como funciona

O texto e as imagens são extraídos do PDF de cada apostila por `scripts/extrair_apostila.py`:

- Remove cabeçalhos e rodapés repetidos (o logo da Fraternidade não entra no corpo — é a marca do site).
- Detecta a estrutura pelos títulos numerados originais (seções `1.`, `2.`…, subseções `7.1`…, obras `8.1.1`…).
- Como o PDF não marca parágrafos, quebra os blocos longos em parágrafos por fim de frase (alvo ~460 caracteres).
- Salva o retrato de Ramatís e as capas dos livros, casando cada capa com a obra que ilustra.
- Gera um arquivo Markdown por seção em `src/content/apostilas/NN-SS.md`.

## Processar uma apostila

```bash
# coloque o PDF em fontes/ e rode:
python3 scripts/extrair_apostila.py "fontes/02 Deus.pdf" 02
```

Isso cria `src/content/apostilas/02-01.md`, `02-02.md`… e as imagens em `public/apostilas/02/`. O site monta o resto sozinho (índice, navegação, busca).

Depois de extrair, **revise**: confira os títulos das seções, a divisão de parágrafos e o casamento das capas. Como o extrator reconstrói do zero, edite os `.md` só depois de estar satisfeito com a extração — e então versione `src/content/` no git.

## Rodar no servidor (/opt/stacks/ramatis)

```bash
cd /opt/stacks/ramatis
docker compose up -d --build site      # http://grotzdesk:8088
```

Publicar com domínio, sem abrir portas: `docker compose --profile publico up -d --build` (token do Cloudflare Tunnel no `.env`). Sem domínio, para testar: `tailscale funnel --bg 8088`.

## Estrutura

```
scripts/extrair_apostila.py     PDF → seções em Markdown + imagens
src/content/apostilas/NN-SS.md  uma seção de apostila por arquivo
public/apostilas/NN/            retrato e capas daquela apostila
src/lib/acervo.ts               agrupa seções em apostilas, navegação
src/pages/                      home, índice, página de seção, busca, sobre
src/styles/global.css           identidade visual
deploy/ · compose.yaml          Caddy + Cloudflare Tunnel (profile publico)
```

## Ajustes finos possíveis

- **Título de grupo de obras**: a seção 9 aparece como "Obras Recebidas Através de Hercílio Maes:" (o cabeçalho "8. Obras de Ramatís" foi absorvido). Fácil de renomear no `.md` ou no script.
- **Capas duplicadas**: quando um livro tem duas edições, fica a primeira capa. Ajustável.
- O alvo de tamanho de parágrafo é o parâmetro `alvo` em `dividir_paragrafos()`.
