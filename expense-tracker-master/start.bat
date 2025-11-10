@echo off
setlocal ENABLEDELAYEDEXPANSION
REM Change to the directory of this script
cd /d "%~dp0"

REM Ensure Node 18+ works with react-scripts 4
set "NODE_OPTIONS=--openssl-legacy-provider"

REM Speechly is disabled by default; set to true if you want it enabled
REM set "REACT_APP_ENABLE_SPEECHLY=true"

REM Start the React dev server
call npm start

endlocal

