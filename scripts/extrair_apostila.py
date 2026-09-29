#!/usr/bin/env python3
"""Extrai uma apostila do curso preservando texto integral, estrutura e imagens.

Uso: python3 scripts/extrair_apostila.py "fontes/01 Ramatís e sua obra.pdf" 01

Gera:
  src/content/apostilas/NN.md   — frontmatter + corpo (texto integral, ordem original)
  public/apostilas/NN/*.png     — retrato de Ramatís e capas dos livros

Trabalha linha a linha (não por bloco) para respeitar a estrutura: títulos
numerados de seções (1., 2., ...), subseções (7.1, ...) e obras (8.1.1, ...)
são âncoras explícitas. Cabeçalhos e rodapés repetidos são descartados; o logo
recorrente da Fraternidade não entra no corpo. Cada capa de livro é casada com
a obra que ilustra, pela posição no PDF.
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
OUT_MD = ROOT / "src/content/apostilas"
OUT_IMG = ROOT / "public/apostilas"

RUNNING = [
    re.compile(r"^PREPARANDO-SE PARA O III MIL[ÊE]NIO\b.*$", re.I),
    re.compile(r"^FRATERNIDADE RAMAT[ÍI]S DE CURITIBA$", re.I),
    re.compile(r"^CURSO\s*[“\"'].*PREPARANDO.*$", re.I),
    re.compile(r"^\.?\s*\d+\s*º?\s*m[óo]dulo:.*$", re.I),
    re.compile(r"^\d+\s*$"),
    re.compile(r"^\.\s*$"),
    re.compile(r"^\(Microsoft Word.*$", re.I),
]

SECAO = re.compile(r"^(\d+)\s*\.\s+(.+)$")
SUBSECAO = re.compile(r"^(\d+\.\d+)\s+(.+)$")
OBRA = re.compile(r"^(8\.\d+\.\d+)\s+(.+)$")
GRUPO_OBRA = re.compile(r"^(8\.\d+)\s+(OBRAS?\b.+|RESENHAS?.*)$", re.I)
BIBLIO = re.compile(r"^Fontes bibliogr[áa]ficas:?\s*$", re.I)


def slugify(t):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")


def norm(s):
    return re.sub(r"\s+", " ", s.replace("\u00a0", " ")).strip()


def is_upper(t):
    ls = [c for c in t if c.isalpha()]
    return bool(ls) and sum(c.isupper() for c in ls) / len(ls) > 0.8


def titlecase(t):
    minusc = {"a", "o", "e", "de", "da", "do", "das", "dos", "à", "ao", "aos", "em",
              "no", "na", "nos", "nas", "os", "as", "um", "uma", "sua", "seu", "por",
              "para", "com", "sob", "ante", "à", "e"}
    palavras = norm(t).lower().split()
    out = []
    for i, w in enumerate(palavras):
        if i and w in minusc:
            out.append(w)
        else:
            out.append(w[:1].upper() + w[1:])
    return " ".join(out)


ABREV = {"sr", "sra", "dr", "dra", "prof", "profa", "a.c", "d.c", "etc", "ex", "obs",
         "p", "pp", "cap", "vol", "fig", "n", "no", "art", "séc", "km", "cm", "mm"}


def dividir_paragrafos(texto, alvo=460, minimo=240):
    """Divide um texto corrido em parágrafos, quebrando em fim de frase.

    O PDF de origem não marca parágrafos, então agrupamos frases até atingir
    ~alvo caracteres e fechamos na próxima fronteira de sentença. Abreviações
    comuns e iniciais não contam como fim de frase.
    """
    texto = norm(texto)
    if len(texto) <= alvo * 1.4:
        return [texto]
    # candidatos a fim de frase: . ! ? … seguidos de espaço e Maiúscula/aspa/travessão
    fronteiras = []
    for m in re.finditer(r'([.!?…]|\.{3})(["”»)]?)\s+(?=[“"«(A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9—])', texto):
        # descartar se o "ponto" pertence a abreviação ou inicial (letra isolada)
        ini = texto.rfind(" ", 0, m.start()) + 1
        palavra = texto[ini:m.start()].lower().strip("(“\"")
        if palavra in ABREV or (len(palavra) == 1 and palavra.isalpha()):
            continue
        fronteiras.append(m.end())
    if not fronteiras:
        return [texto]
    paragrafos, ini = [], 0
    for f in fronteiras:
        if f - ini >= alvo:
            paragrafos.append(texto[ini:f].strip())
            ini = f
    resto = texto[ini:].strip()
    if resto:
        # se o último pedaço ficou curto, cola no anterior
        if paragrafos and len(resto) < minimo:
            paragrafos[-1] = (paragrafos[-1] + " " + resto).strip()
        else:
            paragrafos.append(resto)
    return paragrafos


def linhas_uteis(doc):
    """Devolve todas as linhas de texto, em ordem, sem cabeçalhos/rodapés."""
    saida = []
    for page in doc:
        for b in sorted(page.get_text("dict")["blocks"], key=lambda b: b.get("bbox", [0, 0])[1]):
            if b.get("type") != 0:
                continue
            for line in b["lines"]:
                t = norm("".join(s["text"] for s in line["spans"]))
                if not t or any(p.match(t) for p in RUNNING):
                    continue
                saida.append(t)
    return saida


def match_capas(doc):
    NUM = re.compile(r"^(8\.\d+\.\d+)\b")
    mp = {}
    for i, page in enumerate(doc):
        imgs = [x for x in page.get_images(full=True) if x[0] not in (9, 17, 46)]
        if not imgs:
            continue
        titles = []
        for b in page.get_text("dict")["blocks"]:
            if b.get("type") != 0:
                continue
            t = " ".join(s["text"] for l in b["lines"] for s in l["spans"]).strip()
            m = NUM.match(t)
            if m:
                titles.append((b["bbox"][1], m.group(1)))
        for x in imgs:
            if x[2] > 400 and x[3] > 250 and x[2] / x[3] > 1.4:
                continue  # logo de editora
            rects = page.get_image_rects(x[0])
            if not rects:
                continue
            cand = sorted(titles, key=lambda t: abs(t[0] - rects[0].y0))
            if cand:
                mp.setdefault(cand[0][1], x[0])
    return mp


def salvar_img(doc, xref, dest):
    pix = pymupdf.Pixmap(doc, xref)
    if pix.n - pix.alpha >= 4:
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    dest.parent.mkdir(parents=True, exist_ok=True)
    pix.save(str(dest))


def extrair(pdf_path, num):
    doc = pymupdf.open(pdf_path)
    img_dir = OUT_IMG / num

    # imagens
    capas = match_capas(doc)  # obra_id -> xref
    capa_arq = {}
    for obra_id, xref in capas.items():
        fn = f"capa-{obra_id.replace('.', '-')}.png"
        salvar_img(doc, xref, img_dir / fn)
        capa_arq[obra_id] = f"/apostilas/{num}/{fn}"
    retrato_xref = None
    for page in doc:
        for x in page.get_images(full=True):
            if x[0] not in (9, 17) and x[3] > x[2] and x[3] > 500:
                retrato_xref = retrato_xref or x[0]
    if retrato_xref:
        salvar_img(doc, retrato_xref, img_dir / "ramatis.png")

    linhas = linhas_uteis(doc)

    # título = 1ª linha totalmente maiúscula que não é seção numerada
    titulo = None
    idx0 = 0
    for i, l in enumerate(linhas):
        if is_upper(l) and not SECAO.match(l) and 3 < len(l) < 60:
            titulo = titlecase(l)
            idx0 = i + 1
            break

    blocos = []  # (tipo, valor)
    buf = []

    def flush():
        if buf:
            blocos.append(("p", norm(" ".join(buf))))
            buf.clear()

    in_biblio = False
    for l in linhas[idx0:]:
        if BIBLIO.match(l):
            flush(); in_biblio = True
            blocos.append(("h2", "Fontes bibliográficas"))
            continue
        if in_biblio:
            item = re.sub(r"^\d+\s*\.\s*", "", l).strip()
            if item and not re.match(r"^https?://", item):
                blocos.append(("bib", item))
            continue

        mo = OBRA.match(l)
        mg = GRUPO_OBRA.match(l)
        ms = SUBSECAO.match(l)
        me = SECAO.match(l)

        if mo:
            flush()
            oid, nome = mo.group(1), titlecase(mo.group(2))
            blocos.append(("obra", (oid, nome, capa_arq.get(oid))))
            continue
        if mg:
            flush()
            blocos.append(("grupo", titlecase(mg.group(2))))
            continue
        # subseção só quando é título curto e em maiúsculas (ex "7.1 ATANAGILDO")
        if ms and is_upper(ms.group(2)) and len(ms.group(2)) < 45:
            flush()
            blocos.append(("h3", titlecase(ms.group(2))))
            continue
        if me and is_upper(me.group(2)) and len(me.group(2)) < 70:
            flush()
            blocos.append(("h2", titlecase(me.group(2))))
            continue

        buf.append(l)
    flush()

    # inserir retrato antes da seção "A imagem de Ramatís..."
    retrato_rel = f"/apostilas/{num}/ramatis.png" if retrato_xref else None
    corpo, posto = [], False
    for tipo, val in blocos:
        if retrato_rel and not posto and tipo == "h2" and re.search(r"imagem", val, re.I):
            corpo.append(("fig", retrato_rel))
            posto = True
        corpo.append((tipo, val))
    if retrato_rel and not posto:
        corpo.insert(0, ("fig", retrato_rel))

    # quebrar blocos "p" muito longos em parágrafos, por fronteira de sentença
    corpo2 = []
    for tipo, val in corpo:
        if tipo == "p":
            for par in dividir_paragrafos(val):
                corpo2.append(("p", par))
        else:
            corpo2.append((tipo, val))
    corpo = corpo2

    # agrupar em seções: cada h2/grupo inicia uma nova seção
    CAP = "Ramatís, em imagem psicopictografada pela médium Dinorah Azevedo de Simas Enéas (Rio de Janeiro, década de 1950)."
    secoes = []  # (titulo_secao, [blocos])
    atual_tit, atual = "Introdução", []
    primeiro_h2 = True
    for tipo, val in corpo:
        if tipo in ("h2", "grupo"):
            if atual or not primeiro_h2:
                secoes.append((atual_tit, atual))
            atual_tit, atual = val, []
            primeiro_h2 = False
        else:
            atual.append((tipo, val))
    if atual:
        secoes.append((atual_tit, atual))
    # se a 1ª "seção" (antes de qualquer h2) ficou vazia, descarta
    secoes = [(t, b) for t, b in secoes if b]

    def bloco_md(tipo, val):
        if tipo == "p":
            return val
        if tipo == "h3":
            return "### " + val
        if tipo == "fig":
            return f'<figure class="retrato">\n  <img src="{val}" alt="{CAP}" />\n  <figcaption>{CAP}</figcaption>\n</figure>'
        if tipo == "obra":
            oid, nome, capa = val
            if capa:
                return (f'<div class="obra">\n  <img class="capa" src="{capa}" alt="Capa do livro {nome}" loading="lazy" />\n'
                        f'  <h3 class="obra-titulo">{nome}</h3>\n</div>')
            return "### " + nome
        if tipo == "bib":
            return "- " + val
        return val

    OUT_MD.mkdir(parents=True, exist_ok=True)
    titulo_apostila = titulo or f"Apostila {num}"
    total = len(secoes)
    for i, (tit, blocos_sec) in enumerate(secoes, 1):
        fm = {
            "apostila": num,
            "apostilaTitulo": titulo_apostila,
            "modulo": "Introdução ao estudo das obras de Ramatís",
            "ordem": int(num) * 100 + i,     # ordena globalmente: apostila, depois seção
            "secao": i,
            "totalSecoes": total,
            "titulo": tit,
        }
        front = "---\n" + "\n".join(f"{k}: {json.dumps(v, ensure_ascii=False)}" for k, v in fm.items()) + "\n---\n\n"
        corpo_md = "\n\n".join(bloco_md(t, v) for t, v in blocos_sec)
        (OUT_MD / f"{num}-{i:02d}.md").write_text(front + corpo_md + "\n", "utf-8")

    print(f"{num}: '{titulo_apostila}' — {total} seções, retrato={'sim' if retrato_xref else 'não'}, {len(capa_arq)} capas")


if __name__ == "__main__":
    extrair(sys.argv[1], sys.argv[2].zfill(2))
