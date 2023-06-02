@echo off
setlocal

set "SCRIPT_DIR=%~dp0XMLReaderBDS"
set "FOLDER_PATH=%~dp0..\xmls"

"%SCRIPT_DIR%"

echo Executando o script Node.js...

cd /d "%SCRIPT_DIR%"
npm run start

pause

endlocal