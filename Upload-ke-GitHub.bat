@echo off
title Upload Undangan ke GitHub
color 0b
echo ========================================================
echo   MENGHUBUNGKAN DAN MENGUPLOAD KE GITHUB OWENSAVALA
echo ========================================================
echo.
cd /d "D:\mus\undangan-mira"
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo   BERHASIL! SEMUA KODE SUDAH MASUK KE GITHUB!
    echo ========================================================
) else (
    echo.
    echo Ada kendala pada login GitHub.
)
echo.
pause
