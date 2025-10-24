@echo off
echo.
echo ========================================
echo  ShopSphere Website - Global Deployment
echo ========================================
echo.

echo [1] Creating deployment package...
if not exist "deploy" mkdir deploy
copy index.html deploy\
copy styles.css deploy\
copy script.js deploy\
copy README.md deploy\

echo.
echo [2] Deployment package ready in 'deploy' folder!
echo.
echo ========================================
echo  QUICK DEPLOYMENT OPTIONS
echo ========================================
echo.
echo Option A - NETLIFY (Recommended - 2 minutes):
echo 1. Go to: https://app.netlify.com/drop
echo 2. Drag the 'deploy' folder to the page
echo 3. Get instant live URL!
echo.
echo Option B - VERCEL (Fast):
echo 1. Go to: https://vercel.com/new
echo 2. Upload the files from 'deploy' folder
echo 3. Click Deploy
echo.
echo Option C - GITHUB PAGES:
echo 1. Create repository at: https://github.com/new
echo 2. Upload files from 'deploy' folder
echo 3. Enable Pages in Settings
echo.
echo ========================================
echo Ready for deployment! Choose any option above.
echo ========================================
pause