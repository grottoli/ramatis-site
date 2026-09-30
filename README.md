# Fraternidade Ramatís — apostilas do curso

Site estático que publica as apostilas do curso **"Preparando-se para o Terceiro Milênio"** na íntegra, na ordem original em que foram concebidas, com as imagens (o quadro psicopictografado de Ramatís e as capas dos livros citados).

## Estado atual

O site é um **portal da Fraternidade** (home com o retrato de Ramatís e a lista de áreas de estudo). A primeira área é o **curso "Preparando-se para o Terceiro Milênio"**, em `/curso/`. Conteúdos futuros entram como novas entradas em `src/data/areas.ts`.

Apostilas **01 e 02** já processadas; faltam **03 a 19**. Cada apostila é dividida em **seções**, uma por subseção, com navegação anterior/próxima, índice lateral e busca.

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

## Fluxo de atualização (git → servidor)

Repositório: **https://github.com/grottoli/ramatis-site** (público). O ciclo é: editar no
Windows → `push` → o servidor WSL puxa e reconstrói sozinho.

**Enviar mudanças (Windows / PowerShell):**

```powershell
.\deploy\enviar.ps1 "descrição da mudança"   # faz add + commit + push
```

**Servidor (WSL Ubuntu, stack em /opt/stacks/ramatis-site, porta 8088):**
O container é reconstruído automaticamente pelo cron do usuário, que roda o `atualizar.sh`
a cada 5 min e só reconstrói quando há commit novo:

```
*/5 * * * * /opt/stacks/ramatis-site/deploy/atualizar.sh >> /home/grottoli/ramatis-update.log 2>&1
```

Para forçar a atualização na hora, sem esperar o cron:

```bash
cd /opt/stacks/ramatis-site && make atualizar
```

**Primeira instalação num servidor novo:**

```bash
git clone https://github.com/grottoli/ramatis-site.git /opt/stacks/ramatis-site
cd /opt/stacks/ramatis-site
cp .env.example .env        # ajuste porta/SITE_URL e, se for publicar, o token do túnel
make site
```

Publicar com domínio, sem abrir portas: `docker compose --profile publico up -d --build` (token do Cloudflare Tunnel no `.env`). Sem domínio, para testar: `tailscale funnel --bg 8088`.

## Estrutura

```
scripts/extrair_apostila.py     PDF → seções em Markdown + imagens
src/content/apostilas/NN-SS.md  uma seção de apostila por arquivo
public/apostilas/NN/            retrato e capas daquela apostila
public/ramatis-medalhao.png     retrato usado no logo e no herói da home
src/data/areas.ts               áreas de estudo do portal (hoje: o curso)
src/data/site.json              nome, lema e textos do site
src/lib/acervo.ts               agrupa seções em apostilas, navegação
src/pages/                      home (portal), /curso/, página de seção, busca, sobre
src/styles/global.css           identidade visual
compose.yaml · Dockerfile       build estático (Astro) servido por Caddy
deploy/caddy/Caddyfile          configuração do servidor web
deploy/atualizar.sh             git pull + rebuild no servidor (manual ou cron)
```

## Ajustes finos possíveis

- **Título de grupo de obras**: a seção 9 aparece como "Obras Recebidas Através de Hercílio Maes:" (o cabeçalho "8. Obras de Ramatís" foi absorvido). Fácil de renomear no `.md` ou no script.
- **Capas duplicadas**: quando um livro tem duas edições, fica a primeira capa. Ajustável.
- O alvo de tamanho de parágrafo é o parâmetro `alvo` em `dividir_paragrafos()`.
