# Script to add NPM_TOKEN to GitHub Secrets
# Run this script after re-authenticating GitHub CLI with proper permissions

Write-Host "Adding NPM_TOKEN to GitHub Secrets..." -ForegroundColor Cyan

# Check if GitHub CLI is authenticated
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: GitHub CLI is not authenticated." -ForegroundColor Red
    Write-Host "Please run: gh auth login --scopes repo,admin:repo" -ForegroundColor Yellow
    exit 1
}

# Add the secret
# Replace YOUR_NPM_TOKEN_HERE with your actual npm token
$token = "YOUR_NPM_TOKEN_HERE"
gh secret set NPM_TOKEN --body $token

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully added NPM_TOKEN to GitHub Secrets!" -ForegroundColor Green
    Write-Host "You can now publish to npm via GitHub Actions." -ForegroundColor Green
} else {
    Write-Host "❌ Failed to add secret. Make sure you have proper permissions." -ForegroundColor Red
    Write-Host "Try: gh auth login --scopes repo,admin:repo" -ForegroundColor Yellow
}

