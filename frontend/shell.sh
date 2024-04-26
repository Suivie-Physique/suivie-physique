Get-NetTCPConnection -LocalPort 3008 | Where-Object { $_.State -eq "Listen" } | Select-Object -ExpandProperty OwningProcess
Stop-Process -Id 25332
