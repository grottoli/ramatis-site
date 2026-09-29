# O .env é opcional: o "-" faz o make seguir mesmo sem ele.
-include .env
export

PORTA_LOCAL ?= 8088
SITE_URL    ?= http://localhost:$(PORTA_LOCAL)

.PHONY: help site atualizar publicar dev build parar logs

help:       ## Mostra os comandos disponíveis
	@grep -E '^[a-z]+:.*##' $(MAKEFILE_LIST) | sed 's/:.*##/ →/' | sort

site:       ## Constrói e sobe o site em http://localhost:$(PORTA_LOCAL)
	docker compose up -d --build site
	@echo "Site no ar em http://localhost:$(PORTA_LOCAL)"

atualizar:  ## No servidor: puxa o git e reconstrói só se houve mudança
	./deploy/atualizar.sh

publicar:   ## Sobe o site + túnel Cloudflare (precisa do token no .env)
	docker compose --profile publico up -d --build

parar:      ## Para os containers
	docker compose down

logs:       ## Acompanha os logs do site
	docker compose logs -f site

dev:        ## Servidor de desenvolvimento com recarga automática
	npm install && npm run dev -- --host

build:      ## Só gera a pasta dist/ (sem Docker)
	npm install && npm run build
