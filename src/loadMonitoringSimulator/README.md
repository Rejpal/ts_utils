# LoadBalancing logic

## Zadani
Napiste funkci splnujici nasledujici zadani

### Vstup:
- X vstupnich  metrik (například cpu, ram, disk) < 0, 100 >, krok zmeny <-100, 100 >, pravdepodobnost zmeny metriky < 0 , 100, minimalni a maximalni kriticke hodnoty metriky, jejichz prekroceni  zpusobi opacnou akci na vystupni metrice
- pocatecni hodnota vstupni metriky je v intervalu  minimalni + 10% a maximalni - 10% kriticke hodnoty
- jedna vystupni metrika (například penize) < 0, oo >, krok zmeny < -oo, 00 >  minimalne vsak  -1 * aktualni hodnota metriky, navyseni metriky zpusobni - opacnou akci na vstupni metrice o polovinu
- pocet iterací: I
- pocet zmen: Z


### Vystup:
- rada hodnot pro kazdou vstupni a vystupni metriku.

## Poznámky k řešení

- celkový čas implementace: 8 hodin a 30 minut
- implementace není plnohodnotným řešením zadání, pokrývá však velkou část užití.
- komplexita řešení je v nejhorším případě `O(2X + I*X)`

### nedostatky řešení
- `loadMonitoringSimulator` a `scaleMetrics` nejsou plně otestovány a jejich pokrytí unit testy by šlo ještě navýšit.
- směr změny hodnoty se aktuálně určuje náhodně s 50% pravděpodobností - u delších simulací s malým prokem změny nedochází k žádným škálovacím změnám.
- edge case kdy downscalem přeskakujeme až pod minCriticalValue (a případně opačně) není speciálně ošetřen, tedy existují případy, kdy s nepoměrně velkým krokem oproti `(maxCriticalValue - minCriticalValue)` ke každému upscalu v jedné iteraci, příchází v další iteraci odpovídající downscale.
