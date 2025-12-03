function Convert-NumberToWords {
    param (
        [decimal]$Number
    )

    $units = @("nulis","vienas","du","trys","keturi","penki","šeši","septyni","aštuoni","devyni")
    $teens = @("dešimt","vienuolika","dvylika","trylika","keturiolika","penkiolika","šešiolika","septyniolika","aštuoniolika","devyniolika")
    $tens = @("","","dvidešimt","trisdešimt","keturiasdešimt","penkiasdešimt","šešiasdešimt","septyniasdešimt","aštuoniasdešimt","devyniasdešimt")
    $hundreds = @("","šimtas","du šimtai","trys šimtai","keturi šimtai","penki šimtai","šeši šimtai","septyni šimtai","aštuoni šimtai","devyni šimtai")

    $euros = [math]::Floor($Number)
    $cents = [math]::Round(($Number - $euros) * 100)

    $h = [math]::Floor($euros / 100)
    $t = [math]::Floor(($euros % 100) / 10)
    $u = $euros % 10

    if ($t -eq 1) {
        $tensPart = $teens[$u]
        $unitsPart = ""
    } else {
        $tensPart = $tens[$t]
        $unitsPart = $units[$u]
    }

    $hundredsPart = $hundreds[$h]

    $words = "$hundredsPart $tensPart $unitsPart Eur $cents ct."
    return ($words -replace "\s+", " ").Trim()
}

# Testas
Convert-NumberToWords 181.50