#!/usr/bin/env sh
# Sincroniza as mídias dos resumos (áudio/vídeo) para o diretório servido
# pelo container (volume ./media -> /srv/midia, que aparece em /midia/ no site).
#
# As mídias NÃO ficam no Git (são ~2 GB no total); por isso o servidor não as
# recebe pelo `git pull`. Este script copia a cópia local (public/midia/) para
# o diretório ./media do stack no servidor.
#
# Uso (no WSL do servidor):
#     ./deploy/sync-midia.sh
#
# Fluxo completo para publicar novas mídias:
#   1. No Windows, salve os arquivos e organize em public/midia/NN/
#      (NN-resumo-audio.m4a / NN-resumo-video.mp4).
#   2. Cadastre a apostila em src/data/resumos.ts e dê push.
#   3. No servidor: ./deploy/sync-midia.sh  (copia as mídias)
#      e ./deploy/atualizar.sh              (puxa o código e reconstrói).
#
# Caminhos podem ser sobrescritos por variáveis de ambiente.
set -eu

SRC="${MIDIA_SRC:-/mnt/e/work/ramatis-site/public/midia}"
DST="${MIDIA_DST:-/opt/stacks/ramatis-site/media}"

if [ ! -d "$SRC" ]; then
  echo "origem não encontrada: $SRC (defina MIDIA_SRC)" >&2
  exit 1
fi

mkdir -p "$DST"
echo "sincronizando $SRC -> $DST"
if command -v rsync >/dev/null 2>&1; then
  rsync -a --delete "$SRC"/ "$DST"/
else
  cp -r "$SRC"/. "$DST"/
fi
# O container roda como uid 1000; garante leitura.
chmod -R a+rX "$DST"

echo "pronto — $(find "$DST" -type f | wc -l) arquivos, $(du -sh "$DST" | cut -f1)"
