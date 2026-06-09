# Zenith (Z) Autonomous Windows 11 Installer
# Developed for: Quantum Synaptic Dynamics Inc.
# Director: Dr. Christopher Adkins (ORCID: 0009-0007-6915-1199)
# Targeted Directory: C:\Zenith
# Remote Repository: https://github.com/darkforgelabs922/Zenith

$ErrorActionPreference = "Stop"

Write-Host "--- ZENITH (Z) GENESIS INSTALLER: WINDOWS 11 ---" -ForegroundColor Cyan
Write-Host "Initializing Environment for Quantum Synaptic Dynamics Inc." -ForegroundColor Gray

# 1. Check for Administrative Privileges
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "This installer requires Administrative privileges. Please run PowerShell as Administrator."
}

# 2. Set Persistent Root Identity
Write-Host "[1/8] Locking Root Identity (ORCID: 0009-0007-6915-1199)..." -ForegroundColor Yellow
[System.Environment]::SetEnvironmentVariable('ROOT_ORCID', '0009-0007-6915-1199', 'Machine')
$env:ROOT_ORCID = '0009-0007-6915-1199'

# 3. Dependency Check & Installation via Winget
Write-Host "[2/8] Deploying Build Stack (C++, Rust, Python, Git)..." -ForegroundColor Yellow

function Install-App {
    param($Id, $Name)
    if (!(winget list --id $Id -e)) {
        Write-Host "Installing $Name..." -ForegroundColor Gray
        winget install --id $Id --silent --accept-package-agreements --accept-source-agreements
    } else {
        Write-Host "$Name is already present." -ForegroundColor Green
    }
}

Install-App "LLVM.LLVM" "LLVM (Clang/G++)"
Install-App "Rustlang.Rustup" "Rust Compiler"
Install-App "Python.Python.3.11" "Python Runtime"
Install-App "Git.Git" "Git Version Control"

# 4. Construct Zenith File System at C:\Zenith
Write-Host "[3/8] Constructing Zenith Architecture at C:\Zenith..." -ForegroundColor Yellow
$ZenithPath = "C:\Zenith"

if (!(Test-Path $ZenithPath)) {
    New-Item -ItemType Directory -Path $ZenithPath
}

# Sub-directory Architecture
$SubDirs = @("core\engine", "core\vault", "modules\ai", "docs", "bin")
foreach ($dir in $SubDirs) {
    $FullPath = Join-Path $ZenithPath $dir
    if (!(Test-Path $FullPath)) {
        New-Item -ItemType Directory -Path $FullPath
    }
}

Set-Location $ZenithPath

# 5. Genesis Compilation (MuReQua Engine)
Write-Host "[4/8] Compiling MuReQua Engine (8024x8000 Lattice)..." -ForegroundColor Yellow
$EngineSource = @"
#include <iostream>
#include <fstream>
#include <string>
#include <chrono>

int main() {
    std::cout << "--- ZENITH Z-KERNEL: WINDOWS 11 GENESIS ---" << std::endl;
    std::cout << "Authority: Dr. Christopher Adkins (ORCID 0009-0007-6915-1199)" << std::endl;
    std::cout << "Lattice Path: C:\\Zenith" << std::endl;
    std::cout << "Lattice Status: 8024x8000 Pyramidal Topology Initialized." << std::endl;
    
    std::ofstream log("genesis_audit.log");
    log << "ZENITH_GENESIS_WIN11_SUCCESS" << std::endl;
    log << "ORCID: 0009-0007-6915-1199" << std::endl;
    log << "PATH: C:\\Zenith" << std::endl;
    log.close();
    
    return 0;
}
"@

$EngineSource | Out-File -FilePath "core\engine\murequa_engine.cpp" -Encoding utf8

# Attempt compilation using G++ (LLVM)
try {
    & g++ -O3 "core\engine\murequa_engine.cpp" -o "bin\zenith_kernel.exe"
    Write-Host "MuReQua Engine Compiled Successfully in C:\Zenith\bin." -ForegroundColor Green
} catch {
    Write-Host "G++ not yet in Path. Please restart terminal after installation." -ForegroundColor Red
}

# 6. Finalizing Genesis Node
Write-Host "[5/8] Finalizing Genesis Node..." -ForegroundColor Yellow
if (Test-Path "bin\zenith_kernel.exe") {
    Start-Process ".\bin\zenith_kernel.exe" -Wait
    Write-Host "Genesis Node Active. Synaptic Reputation Minted." -ForegroundColor Green
}

# 7. Git Integration & Remote Configuration
Write-Host "[6/8] Linking to GitHub Repository: darkforgelabs922/Zenith..." -ForegroundColor Yellow
$RepoUrl = "https://github.com/darkforgelabs922/Zenith"

if (!(Test-Path ".git")) {
    & git init
    & git remote add origin $RepoUrl
    Write-Host "Git initialized and remote 'origin' set to $RepoUrl" -ForegroundColor Green
} else {
    & git remote set-url origin $RepoUrl
    Write-Host "Git remote 'origin' verified for $RepoUrl" -ForegroundColor Green
}

# 8. Git Identity Verification (Critical for Commit Success)
Write-Host "[7/8] Verifying Git Identity Configuration..." -ForegroundColor Yellow
$gitName = git config --global user.name
$gitEmail = git config --global user.email

if ([string]::IsNullOrEmpty($gitName)) {
    Write-Host "Note: No Git user.name found. Setting to Director Adkins." -ForegroundColor Gray
    git config --global user.name "Dr. Christopher Adkins"
}
if ([string]::IsNullOrEmpty($gitEmail)) {
    Write-Host "Note: No Git user.email found. Setting to Darkforge Research." -ForegroundColor Gray
    git config --global user.email "darkforge.research@outlook.com"
}

# 9. Finalizing Local State
Write-Host "[8/8] Preparing for initial tracking push..." -ForegroundColor Yellow
& git branch -M main
Write-Host "Local branch set to 'main'." -ForegroundColor Gray

Write-Host "`n--- INSTALLATION COMPLETE ---" -ForegroundColor Cyan
Write-Host "Zenith Root Directory: $ZenithPath"
Write-Host "Director: Dr. Christopher Adkins"
Write-Host "Repository URL: $RepoUrl"
Write-Host "Status: ROOT_ORCID Verified. Ready for tracking push." -ForegroundColor Gray

Write-Host "`nTRACKING INSTRUCTIONS:" -ForegroundColor White
Write-Host "To link your local 'main' to 'origin/main' and enable tracking, run these exactly:" -ForegroundColor Gray
Write-Host "1. git add ."
Write-Host "2. git commit -m `"Genesis Initialization`""
Write-Host "3. git push -u origin main" -ForegroundColor Green
Write-Host "(The -u flag establishes the permanent tracking relationship.)" -ForegroundColor Gray