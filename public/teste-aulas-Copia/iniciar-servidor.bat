@echo off
echo ============================================
echo        RoboTech Chat Server
echo ============================================
echo.
echo Iniciando servidor do chatbot...
echo.
cd /d "%~dp0"
npm start
echo.
echo Servidor parado. Pressione qualquer tecla para fechar...
pause > nul