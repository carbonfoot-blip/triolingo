@echo off
echo ========================================================
echo [TrioLingo] Lancement de la validation locale et build
echo ========================================================

echo [1/2] Analyse de la qualite de code (Oxlint)...
call npm.cmd run lint
if %errorlevel% neq 0 (
    echo [ERREUR] Echec lors de l'analyse Oxlint.
    exit /b %errorlevel%
)

echo [2/2] Verification TypeScript et compilation Vite...
call npm.cmd run build
if %errorlevel% neq 0 (
    echo [ERREUR] Echec lors de la compilation Vite.
    exit /b %errorlevel%
)

echo ========================================================
echo [SUCCES] Projet TrioLingo valide avec succes !
echo ========================================================
