$ErrorActionPreference = "Stop"

$envPath = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envPath)) {
    throw "server/.env was not found. Create it from .env.example first."
}

$secureApiKey = Read-Host "Enter your newly rotated Gemini API key" -AsSecureString
if ($secureApiKey.Length -eq 0) {
    throw "The Gemini API key cannot be empty."
}

$keyPointer = [IntPtr]::Zero
try {
    $keyPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureApiKey)
    $apiKey = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($keyPointer)
    $lines = @(Get-Content -Path $envPath)
    $keyLineIndex = -1

    for ($index = 0; $index -lt $lines.Count; $index++) {
        if ($lines[$index] -match "^GEMINI_API_KEY=") {
            $keyLineIndex = $index
            break
        }
    }

    if ($keyLineIndex -ge 0) {
        $lines[$keyLineIndex] = "GEMINI_API_KEY=$apiKey"
    } else {
        $lines += "GEMINI_API_KEY=$apiKey"
    }

    Set-Content -Path $envPath -Value $lines -Encoding ascii
    Write-Output "Gemini API key saved to server/.env. Key was not displayed."
} finally {
    if ($keyPointer -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($keyPointer)
    }
    if ($null -ne $apiKey) {
        $apiKey = $null
    }
    $secureApiKey.Dispose()
}
