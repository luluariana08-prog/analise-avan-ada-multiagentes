# Relatório do Tester independente — rodada 05

## Versão e hashes

Sem commit: workspace sem repositório Git. SHA-256 da versão testada:

| Arquivo | SHA-256 |
| --- | --- |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `projeto-dashboard/site/index.html` | `96EAF4698E111B7D02AEE40D3AAA1E0B4411D33C3125D7E40EE77445D95A6192` |
| `projeto-dashboard/site/app.js` | `721F4AE85733884D71279BD875BDE536D18C8858BF70C0D6D72F765CB4146A8E` |
| `projeto-dashboard/site/styles.css` | `5C864687F9B344112C867F3E4426D1F8409C34B99C8A31F3373746C4F457042B` |
| `projeto-dashboard/site/chart-average.mjs` | `083E7EEE9EF5FAF5AD1472FC7A49AACC3F5D1DC9866525A6513B4740A1DD6955` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/test_construtor_chart_average.mjs` | `29B89CF88640A93FE0C7E18C3D10A04C0C1FC6AB6F08538E8AE4552AD365E3E3` |
| `projeto-dashboard/test_tester_rodada05.mjs` (novo teste independente) | `6E7C0CC7583F526044350B16F85B904D6643EA665D63893D8D86190D41664512` |
| `projeto-dashboard/relatorios/rodada-05/construtor.md` | `9A7CF3FEA060E620F16D42794D07B998EEF247F510328C0CE53D44048AA0F417` |

Os hashes dos arquivos de produto coincidem com os do Construtor R5. Os scripts e relatórios anteriores foram preservados; só acrescentei o teste próprio acima e este relatório.

## Comandos e resultados

Ambiente: Python 3.14.7/pandas 3.0.6, Node v24.21.0 e Microsoft Edge headless real via CDP.

| Comando | Resultado |
| --- | --- |
| `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` | **8 testes passaram** (`Ran 8 tests ... OK`). Inclui os testes Python e independentes anteriores; um `ResourceWarning` do 404 intencional no teste HTTP não impediu o `ok`. |
| `node .\projeto-dashboard\test_construtor_chart_average.mjs` | **PASS**: limiar inclusivo, média visível, filtros, caso vazio, centavos e contraste das cores das barras >= 4,5:1. |
| `node .\projeto-dashboard\test_dashboard_browser.mjs` | **PASS** no Edge: HTTP, indicadores/gráficos/tabela, filtros isolados/combinados/vazios/limpar, teclado, layout 390/1440 px, contraste de texto e rede/runtime. O favicon automático respondeu 404 e foi ignorado conforme o teste. |
| `node .\projeto-dashboard\test_tester_rodada05.mjs` | **PASS** no Edge. Teste independente descrito abaixo; stdout lista totais em centavos e cor efetivamente renderizada em cada estado. |

## Asserções independentes de classificação

O novo `test_tester_rodada05.mjs` serve o site e controla Edge por CDP. Não importa nem chama `classifyByVisibleMean`: lê o JSON servido, agrega `valor_venda` em centavos por grupo, calcula independentemente média dos totais visíveis e aplica a regra `totalCentavos >= média`. Compara os rótulos, a classe e o `fill` real do SVG com a classificação calculada, incluindo descrição ARIA.

| Estado | Categoria — total em centavos e classe esperada/observada | Cidade — total em centavos e classe esperada/observada |
| --- | --- | --- |
| Inicial (média em ambos: 668.633,33 centavos) | Acessórios 1.051.700 rosa; Livros 743.800 rosa; Papelaria 210.400 preto | Campinas 857.800 rosa; Santos 693.750 rosa; Sorocaba 454.350 preto |
| Cidade isolada: Campinas | Acessórios 451.800 rosa; Livros 312.300 rosa; Papelaria 93.700 preto | Campinas 857.800 rosa (grupo único) |
| Categoria isolada: Livros | Livros 743.800 rosa (grupo único) | Campinas 312.300 rosa; Santos 237.200 preto; Sorocaba 194.300 preto |
| Combinados: Campinas + Papelaria | Papelaria 93.700 rosa (grupo único) | Campinas 93.700 rosa (grupo único) |
| Após limpar | Voltou às três classificações iniciais | Voltou às três classificações iniciais |

Asserção de cor concreta: rosa `rgb(194, 24, 91)` / classe `chart-bar-above` para `>=` média; preto `rgb(24, 24, 27)` / classe `chart-bar-at-below` para abaixo. Os grupos únicos nos filtros combinados confirmam inclusividade: valor = média, portanto rosa. Todas as classificações foram recalculadas e comparadas depois de cada filtro e de limpar.

## Legenda e responsividade

Para os dois gráficos, o teste verificou nome ARIA (`Legenda do gráfico por categoria/cidade`), textos visíveis “Acima da média” e “Na média ou abaixo”, swatches com as cores rosa/preto efetivas, e nota de que valores exatamente iguais à média ficam em rosa. Em 390 px as legendas ficaram visíveis, com `flex-wrap`, largura 334 px sem overflow; grade de gráficos em uma coluna e página sem overflow (390 px). Em 1440 px: grade de gráficos em duas colunas e scrollWidth 1425 px sem overflow. O teste browser anterior também aprovou filtros, teclado e os dois breakpoints.

## Pendências e status

Nenhuma divergência encontrada entre classificação independente e barras/cores da interface; não há defeito para retornar ao Construtor. A evidência e esta versão estão prontas para encaminhamento ao Revisor para revisão independente.

**APROVADO — etapa do Tester independente.** Não representa aprovação final conjunta.
