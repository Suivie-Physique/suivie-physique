Get-NetTCPConnection -LocalPort 4400 | Where-Object { $_.State -eq "Listen" } | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id 25332
