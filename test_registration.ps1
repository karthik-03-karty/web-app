$json = Get-Content "test_reg.json" -Raw
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/api/v1/register" -Method POST -Body $json -ContentType "application/json"
    Write-Host "Success: $($response | ConvertTo-Json)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "Response: $($_.Exception.Response)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
    }
}
