@echo off
echo Starting Velvet Radio Development Servers...
echo.
echo Backend: http://127.0.0.1:8002
echo Frontend: http://127.0.0.1:5175
echo.

start "Velvet Radio Backend" cmd /k "php artisan serve --port=8002"
timeout /t 2 /nobreak >nul
start "Velvet Radio Frontend" cmd /k "npm run dev"

echo Development servers started!
echo Press any key to exit...
pause >nul