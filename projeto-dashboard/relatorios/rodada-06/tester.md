# Relatório do Tester independente — rodada 06

## Versão testada e hashes

Sem commit: workspace sem repositório Git. SHA-256 conferidos antes/depois da preparação:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/README.md` | `051A8746E18AD2C807972AB218A4F5FD2B4E46053EA2DA3B2A4C8F9E050E5BF3` |
| `projeto-dashboard/site/styles.css` | `F0F117B151864ED7EDE80F817E12641DD5E28D8F7428D30BC8CC8361D0CD7A59` |
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
| `projeto-dashboard/relatorios/rodada-06/construtor.md` | `383C47EEC44419B1F4E74ED21E688AB7380BA58202949BADE124BE785E5A98FF` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |

Hashes dos testes, dados, produto e relatórios das rodadas 01–05 permaneceram iguais às referências registradas pelo Construtor R6. Não alterei produto, scripts ou relatórios anteriores. A preparação regenerou `dados.json`, mas seu conteúdo/hash permaneceu idêntico.

## Comandos documentados e resultados

Ambiente: Python 3.14.7/pandas 3.0.6, Node v24.21.0 e Microsoft Edge instalado.

| Comando | Resultado / evidência |
| --- | --- |
| `py .\projeto-dashboard\preparar_dados.py` | **PASS**. Exportou 180 vendas; período 2026-01-01 a 2026-03-31, bruto R$ 20.059,00, ticket médio R$ 111,44, 548 unidades. Hash final de `dados.json` igual ao inicial. |
| `py -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` | **FALHOU neste ambiente**: Python informou `can't open file 'C:\Users\IAdados\AppData\Local\Microsoft\WindowsApps\py.exe': [Errno 22] Invalid argument`. |
| `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` (fallback para executar a mesma suíte) | **8 testes passaram** (`Ran 8 tests ... OK`). Um `ResourceWarning` ocorreu durante a limpeza do 404 intencional; o teste HTTP terminou `ok`. |
| `node .\projeto-dashboard\test_construtor_chart_average.mjs` | **PASS**: cálculo da média, inclusão do igual, filtros, vazio, centavos e contraste das barras >= 4,5:1. |
| `node .\projeto-dashboard\test_dashboard_browser.mjs` | **PASS** no Edge real: filtros/resultados, teclado, HTTP, sem erros JS/rede/NaN; 390 px (scrollWidth 390, gráficos em uma coluna) e 1440 px (scrollWidth 1425, gráficos em duas). A verificação de texto declarada por esse teste passou; seu escopo não inclui o texto introdutório sobre o banner. `/favicon.ico` automático retornou 404 e foi excluído pelo teste. |
| `node .\projeto-dashboard\test_tester_rodada05.mjs` | **PASS** no Edge real: cores de barras conferidas contra médias recalculadas independentemente em estado inicial, filtros isolados/combinados e após limpar; legenda e layouts passaram. |

## Auditoria independente do tema R6 no Edge

Usei uma inspeção temporária via Edge/CDP, por HTTP, com asserções próprias sobre estilos computados. O script temporário foi removido após a execução; não foi gravado no workspace. Critério para texto normal: WCAG 2.2 AA, contraste mínimo 4,5:1.

| Verificação computada | Evidência | Resultado |
| --- | --- | --- |
| Fundo do `body` | `rgb(17, 18, 20)` (`#111214`) | Passa a cor/tema pedido |
| Cor default do `body` contra seu fundo | `rgb(25, 44, 42)` sobre `rgb(17, 18, 20)`: **1,28:1**; há zero nós de texto diretos em `body` | Não é texto diretamente renderizado nesta página; é uma cor herdada insegura se texto vier a ser posto diretamente sobre o fundo. |
| Banner | `linear-gradient(120deg, rgb(249, 220, 230), rgb(255, 240, 244))` | Rosa claro presente |
| Título do banner (`h1`) | menor contraste contra os extremos do gradiente: **9,41:1** | Passa |
| Eyebrow do banner | **4,62:1** | Passa, margem estreita |
| Texto introdutório do banner (`.intro`, 14 px) | `#71817c` sobre os extremos do banner: mínimo **3,20:1** | **FALHA**: texto normal abaixo de 4,5:1 |
| Rodapé sobre o fundo | texto `#b7c2bc`: **10,22:1**; `strong` `#f3f6f4`: **17,22:1** | Passa |
| Painéis/cards | `.panel` branco computado (`rgb(255, 255, 255)`); KPI mantém fundo claro | Passa inspeção do tema |
| Barras sobre trilho | rosa `rgb(194, 24, 91)`: **5,25:1**; preto `rgb(24, 24, 27)`: **15,84:1** sobre trilho `rgb(240, 243, 239)` | Passa; teste do Construtor também aprovou |

Falha reproduzida na auditoria temporária: asserção WCAG para `.page-header .intro` (`3.20:1`). O restante das medições foi impresso antes da asserção. Os testes Edge anteriores confirmaram reclassificação rosa/preto em filtros e responsividade.

## Encaminhamento e status

Devolvo ao **Construtor** duas pendências reproduzidas: (1) elevar o contraste do texto introdutório do banner (`.intro`) para >= 4,5:1 contra o gradiente rosa; (2) ajustar/documentar o comando de suíte Python, pois `py -m unittest ...` falhou neste Windows, enquanto o mesmo comando com `.venv\Scripts\python.exe` passou. A cor default do `body` tem contraste baixo sobre o próprio fundo, embora não haja texto direto renderizado ali; recomendo evitar seu uso para texto no fundo escuro ou deixar esse comportamento explícito.

**REPROVADO — etapa do Tester independente.** Os três comandos Node e a suíte executada pelo Python do `.venv` passaram; a versão não atende integralmente ao critério de contraste do banner e o comando Python documentado não foi executável neste ambiente.
