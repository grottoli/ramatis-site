#!/usr/bin/env sh
# Atualiza o site no servidor: puxa o git e, se houve mudança, reconstrói o container.
#
# Uso manual (no servidor, dentro de /opt/stacks/ramatis):
#     ./deploy/atualizar.sh
#   ou:
#     make atualizar
#
# Automático — puxa sozinho a cada 5 min (só reconstrói quando há commit novo).
# Adicione ao crontab do servidor (crontab -e):
#     */5 * * * * /opt/stacks/ramatis/deploy/atualizar.sh >> /var/log/ramatis-update.log 2>&1
set -eu

cd "$(dirname "$0")/.."   # raiz do repositório

# Evita duas execuções ao mesmo tempo (importante no cron).
exec 9>/tmp/ramatis-update.lock
if command -v flock >/dev/null 2>&1; then
  flock -n 9 || { echo "$(date '+%F %T') já em execução, saindo"; exit 0; }
fi

git fetch --quiet origin
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse '@{u}')

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "$(date '+%F %T') sem mudanças ($LOCAL)"
  exit 0
fi

echo "$(date '+%F %T') atualizando ${LOCAL} -> ${REMOTE}"
git pull --ff-only --quiet
docker compose up -d --build site
docker image prune -f >/dev/null 2>&1 || true
echo "$(date '+%F %T') pronto — site reconstruído"
