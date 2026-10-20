# Script de validation locale de TrioLingo
$ErrorActionPreference = "Stop"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " [TrioLingo] Validation de l'environnement et du code" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# 1. Verification de l'integrite des fichiers essentiels
$RequiredFiles = @("package.json", "tsconfig.json", "vite.config.ts", "index.html", "src\App.tsx", "AGENTS.md")
foreach ($file in $RequiredFiles) {
    if (-not (Test-Path $file)) {
        Write-Error "Fichier critique manquant : $file"
        exit 1
    }
}
Write-Host "[OK] Tous les fichiers d'architecture sont presents." -ForegroundColor Green

# 2. Linting Oxlint
Write-Host "`n[1/2] Execution de Oxlint..." -ForegroundColor Yellow
& npm.cmd run lint
if ($LASTEXITCODE -ne 0) {
    Write-Error "Echec lors de la verification Oxlint."
    exit $LASTEXITCODE
}
Write-Host "[OK] Oxlint valide sans erreur." -ForegroundColor Green

# 3. Compilation TypeScript et Vite
Write-Host "`n[2/2] Compilation TypeScript et bundling Vite..." -ForegroundColor Yellow
& npm.cmd run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Echec lors du build Vite."
    exit $LASTEXITCODE
}
Write-Host "[OK] Build de production genere avec succes." -ForegroundColor Green

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host " Validation complete reussie ! Pret pour revue." -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
