#!/usr/bin/env pwsh
# Push to all configured remotes

Write-Host "Pushing to all remotes..." -ForegroundColor Cyan
Write-Host ""

# Push to origin (main repo)
Write-Host "→ Pushing to AIBOS-DESIGN-SYSTEM (origin)..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully pushed to origin" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to push to origin" -ForegroundColor Red
}

Write-Host ""

# Check if storybook remote exists
$storybookRemote = git remote | Select-String -Pattern "storybook"
if ($storybookRemote) {
    Write-Host "→ Pushing to Storybook repository..." -ForegroundColor Yellow
    git push storybook main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Successfully pushed to storybook" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to push to storybook" -ForegroundColor Red
    }
} else {
    Write-Host "⚠ Storybook remote not configured. Run:" -ForegroundColor Yellow
    Write-Host "  git remote add storybook https://github.com/pohlai88/Storybook.git" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green

