# Envia as mudanças do site para o GitHub: git add + commit + push, numa linha só.
# Uso:
#     .\deploy\enviar.ps1 "mensagem do commit"
#     .\deploy\enviar.ps1                     (usa uma mensagem padrão)
param([string]$Mensagem = "atualiza site")

git add -A

# Só commita se houver algo novo; senão segue direto para o push
# (caso existam commits ainda não enviados).
if (git status --porcelain) {
    git commit -m $Mensagem
} else {
    Write-Host "Nada novo para commitar."
}

git push
