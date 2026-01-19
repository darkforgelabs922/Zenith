# Zenith ($\mathcal{Z}$) Windows 11 Implementation Guide

This guide ensures the 8024 × 8000 Pyramidal Lattice simulation and the MuReQua protocol are fully optimized for Windows 11 environments.

## 1. Prerequisites (The Development Stack)

To run Zenith natively, you need to install the core build tools. You can use Winget (Windows Package Manager) or install them manually if winget is not recognized.

### Option A: Using Winget (Recommended)

If winget is not recognized, please update the App Installer from the Microsoft Store first.

```powershell
# Install Build Tools via Winget
winget install Microsoft.VisualStudio.2022.BuildTools
winget install Rustlang.Rustup
winget install Python.Python.3.11
winget install LLVM.LLVM # For Clang/LLVM support
```

### Option B: Manual Installation (If Winget Fails)

If you continue to see `CommandNotFoundException`, download and install these components manually:

- **Visual Studio Build Tools 2022:** Download here. Select "Desktop development with C++" during installation.
- **Rustup (Rust Installer):** Download `rustup-init.exe`.
- **Python 3.11:** Download from Python.org. Ensure "Add Python to PATH" is checked.
- **LLVM/Clang:** Download the `LLVM-18.x.x-win64.exe`.

## 2. Environment Variables (ORCID Security)

Set your Root Authority identity in PowerShell (Admin):

```powershell
[System.Environment]::SetEnvironmentVariable('ROOT_ORCID', '0009-0007-6915-1199', 'User')
```

## 3. Compiling the Z-Kernel on Windows

Zenith uses the `core/engine/murequa_engine.cpp`. On Windows 11, use PowerShell or the Developer Command Prompt for VS 2022:

### Using MinGW/GCC:

```powershell
g++ -O3 core/engine/murequa_engine.cpp -o zenith_kernel.exe
./zenith_kernel.exe
```

### Using MSVC (cl.exe):

```cmd
cl /O2 core/engine/murequa_engine.cpp /Fe:zenith_kernel.exe
zenith_kernel.exe
```

## 4. Windows 11 Performance Tuning

The 8024x8000 lattice requires significant memory. Ensure your Windows swap file is optimized:

1.  **System Properties** > **Advanced** > **Performance Settings**.
2.  Set **Virtual Memory** to at least **32GB** to accommodate the full tetrahedral mesh simulation.

## 5. Shadow Vault Persistence

On Windows, Zenith stores the Shadow Equity commitments in `%LOCALAPPDATA%\Zenith\Vault`. Ensure this folder is excluded from **Windows Defender** to prevent latency spikes during high-speed MuReQua verification.
