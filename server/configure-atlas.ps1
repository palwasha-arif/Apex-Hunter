$ErrorActionPreference = "Stop"

$envPath = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envPath)) {
    throw "server/.env was not found. Create it from .env.example first."
}

$securePassword = Read-Host "Enter the Atlas database user's password" -AsSecureString
if ($securePassword.Length -eq 0) {
    throw "The database password cannot be empty."
}

$passwordPointer = [IntPtr]::Zero
try {
    $passwordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
    $password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPointer)
    $encodedPassword = [Uri]::EscapeDataString($password)
    $uri = "mongodb+srv://palwashaarifkhan11_db_user:${encodedPassword}@apexhunter-db.wdzdyvx.mongodb.net/apex_hunter_platform?retryWrites=true&w=majority&appName=apexhunter-db"

    $lines = @(Get-Content -Path $envPath)
    $mongoLineIndex = -1
    for ($index = 0; $index -lt $lines.Count; $index++) {
        if ($lines[$index] -match "^MONGO_URI=") {
            $mongoLineIndex = $index
            break
        }
    }

    if ($mongoLineIndex -ge 0) {
        $lines[$mongoLineIndex] = "MONGO_URI=$uri"
    } else {
        $lines += "MONGO_URI=$uri"
    }

    Set-Content -Path $envPath -Value $lines -Encoding ascii
    Write-Output "Atlas connection saved to server/.env. Password was not displayed."
} finally {
    if ($passwordPointer -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPointer)
    }
    if ($null -ne $password) {
        $password = $null
    }
    $securePassword.Dispose()
}
