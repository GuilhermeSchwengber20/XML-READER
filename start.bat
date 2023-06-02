@echo off
setlocal

set "SCRIPT_DIR=%~dp0XMLReaderBDS"
set "XML_PATH=%~dp0..\xml_misturado_path"
set "FOLDER_PATH=%~dp0..\xmls"

echo Executando o script Node.js...

cd /d "%SCRIPT_DIR%"
npm run start

pause

endlocal