# Relatório do Tester independente — rodada 08

## Versão e hashes

Sem commit: workspace sem Git. Hashes conferidos antes e depois da preparação:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/README.md` | `FDE1AFFD6EF5FAFA75D623387F9390B60BF172EBBA3D05939F637A11FCE44BE0` |
| `projeto-dashboard/site/styles.css` | `2BA8D2E435B985B58E2B42AD5C1E7E88B9A05712FB6D02D79952D1339EAAC49E` |
| `projeto-dashboard/site/index.html` | `96EAF4698E111B7D02AEE40D3AAA1E0B4411D33C3125D7E40EE77445D95A6192` |
| `projeto-dashboard/site/app.js` | `721F4AE85733884D71279BD875BDE536D18C8858BF70C0D6D72F765CB4146A8E` |
| `projeto-dashboard/site/chart-average.mjs` | `083E7EEE9EF5FAF5AD1472FC7A49AACC3F5D1DC9866525A6513B4740A1DD6955` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_construtor_chart_average.mjs` | `29B89CF88640A93FE0C7E18C3D10A04C0C1FC6AB6F08538E8AE4552AD365E3E3` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/test_tester_rodada05.mjs` | `6E7C0CC7583F526044350B16F85B904D6643EA665D63893D8D86190D41664512` |
| `projeto-dashboard/relatorios/rodada-08/construtor.md` | `17BABE9B16CF107C3694BD49896EDE51576E4B7CE7CE0D9E0383840CD25A6D00` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |

Os hashes dos scripts, produto, origem e relatórios R1–R7 permaneceram iguais às referências do Construtor R8. A preparação regenerou `dados.json` com o mesmo hash/conteúdo. Não alterei produto, scripts ou relatórios anteriores.

## Comandos do README e resultados

Ambiente: Python 3.14.7/pandas 3.0.6 via `.venv`, Node.js v24.21.0 e Microsoft Edge disponível.

| Comando | Resultado / evidência |
| --- | --- |
| `.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py` | **PASS**. 180 vendas; período 2026-01-01–2026-03-31; bruto R$ 20.059,00; ticket médio R$ 111,44; 548 unidades. `dados.json` manteve o hash acima. |
| `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` | **8 testes passaram** (`Ran 8 tests ... OK`). Inclui os testes de dados independentes e os quatro subcasos de infinito. O `ResourceWarning` de limpeza do 404 intencional não impediu o teste HTTP, que terminou `ok`. |
| `node .\projeto-dashboard\test_construtor_chart_average.mjs` | **PASS**: médias, igualdade inclusiva, filtros, vazio, centavos e contraste das barras. |
| `node .\projeto-dashboard\test_dashboard_browser.mjs` | **PASS** no Edge headless: HTTP, resultados, filtros, teclado, erros de runtime/rede e responsividade. Em 390 px: sem overflow, grades em uma coluna; em 1440 px: sem overflow, três colunas de KPIs e duas de gráficos. Contraste medido pelo script: rótulos 5,87:1, valores 9,03:1, cabeçalhos da tabela 5,68:1 e células >=7,34:1. O 404 automático de `/favicon.ico` foi ignorado pelo teste. |
| `node .\projeto-dashboard\test_tester_rodada05.mjs` | **PASS** no Edge real: cores/classes comparadas a médias independentes em estado inicial, filtros isolados/combinados e limpar; legenda acessível e responsividade verificadas. |

O comando condicional `.\.venv\Scripts\python.exe -m pip install pandas` não foi necessário: pandas já está instalado no ambiente documentado. Também investiguei o comando opcional de servidor local: a porta 8000 já estava ocupada (PID 19908), então não iniciei nem encerrei processo alheio; o endpoint existente retornou HTTP 200 e o título do dashboard. O comando de servidor não faz parte da lista de preparação/suíte/três Node acima.

## Auditoria própria de tema e contraste no Edge

Foi usada uma auditoria temporária via Edge/CDP e servidor HTTP local, removida após execução; nenhum script permanente foi alterado. O critério para texto normal foi WCAG 2.2 AA 1.4.3: contraste >=4,5:1. Asserções próprias confirmaram os valores computados:

| Região/texto visível | Cor/fundo computados | Contraste mínimo | Resultado |
| --- | --- | ---: | --- |
| `body` | fundo `rgb(101, 0, 11)` = **#65000B**; texto herdado `rgb(230, 236, 232)` | 11,25:1 | Passa; cor de fundo exata |
| Banner, título | `rgb(87, 38, 58)` sobre gradiente rosa `rgb(249,220,230)` / `rgb(255,240,244)` | 9,41:1 | Passa |
| Banner, eyebrow | `rgb(163,67,102)` sobre o gradiente rosa | 4,62:1 | Passa |
| Banner, intro | `rgb(87,38,58)` sobre o gradiente rosa | 9,41:1 | Passa |
| Rodapé, texto/ênfase no fundo | `#b7c2bc` / `#f3f6f4` sobre `#65000B` | 7,35:1 / 12,39:1 | Passa |
| Cabeçalhos de seção e filtros | `#192c2a` sobre seção `#ffe8ef`; rótulos de filtro sobre cartão `#fff5f8` | 12,57:1; 5,45:1 | Passa |
| Legenda dos gráficos | `#344942` sobre cartões `#fff5f8` | 9,03:1 | Passa |
| Rótulos/valores dos gráficos | `#53645d` / `#344942` sobre `#fff5f8` | 5,87:1 / 9,03:1 | Passa |
| Cabeçalhos/células de tabela | `#4f5d56` sobre `#ffe1eb`; células sobre `#fff5f8` | 5,68:1; >=7,34:1 | Passa |
| **Rótulos KPI** | **`#5f6e67` sobre o gradiente rosa do KPI primário** | **4,19:1** | **FALHA** |
| **Notas KPI** | **`#63736b` sobre o gradiente rosa do KPI primário** | **3,91:1** | **FALHA** |

Painéis computados: cartão `rgb(255,245,248)` (`#fff5f8`), seção `rgb(255,232,239)` (`#ffe8ef`), cabeçalho da tabela `rgb(255,225,235)` (`#ffe1eb`). O gradiente do KPI primário é rosa claro (`rgb(249,220,230)` → `rgb(255,241,245)`). A auditoria computada incluiu 3 rótulos e 3 notas KPI; o mínimo veio do cartão primário rosa. Valores KPI contrastaram 6,12:1. Cor de barra rosa `rgb(194,24,91)` e preto `rgb(24,24,27)` sobre trilho rosa `rgb(248,229,235)` contrastam 5,25:1 e 15,84:1. As duas legendas têm nome ARIA, textos “Acima da média”/“Na média ou abaixo” e nota explícita sobre igualdade; os swatches computados são rosa/preto.

## Pendências e status

Devolvo ao **Construtor** as falhas reproduzidas: os rótulos (4,19:1) e as notas (3,91:1) do KPI primário rosa não atingem 4,5:1. Ajustar as cores desses textos ou o gradiente e repetir a auditoria Edge. Demais verificações solicitadas passaram; não foram alterados arquivos fora deste relatório (a auditoria adicional foi temporária e removida).

**REPROVADO — etapa do Tester independente.** Os comandos principais do README passaram e as cores dinâmicas/filtros funcionaram, mas o tema não atende ao critério de contraste para os dois textos do KPI primário.
