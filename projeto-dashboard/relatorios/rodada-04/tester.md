# Relatório do Tester independente — rodada 04

## Versão e hashes

Sem commit: workspace sem repositório Git. Hashes conferidos após os testes:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/README.md` | `09559779D5DA0E70540A8A7EF437DE943A2C3EC8B5A3F52FF4D09425FC8AB236` |
| `projeto-dashboard/relatorios/rodada-04/construtor.md` | `077E2AB6C9B22E7F2C94BDDBEE5ABD3AD06CD71ED267819D034EB0BD60EE18C0` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/site/index.html` | `E8CD536B90087FDBAF40BD25E43B58D129977555AA5A9CC7696C34AC6C1B0D37` |
| `projeto-dashboard/site/app.js` | `EDA8DDB13743F46CEFFEAF6EEB9260A49C151C4BC4E87067E8A2676B45AE4856` |
| `projeto-dashboard/site/styles.css` | `B491020CE091F1A2824FF4440D241321B40654BAEFF6EFA68EC89878B01C3865` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |

Os hashes da preparação, testes e site coincidem com a versão da rodada 03. A origem, documentação anterior e scripts não mudaram. Também conferi que os hashes dos relatórios das rodadas 01–03 correspondem aos registrados pelo Construtor da rodada 04; não alterei nenhum deles.

## Comandos documentados executados

Ambiente: Python 3.14.7/pandas 3.0.6, Node v24.21.0 e Edge em `%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe`.

| Comando do README | Resultado / evidência |
| --- | --- |
| `py .\projeto-dashboard\preparar_dados.py` | Concluído; preparou 180 vendas, período 2026-01-01 a 2026-03-31, bruto R$ 20.059,00, ticket médio R$ 111,44 e 548 unidades. O `dados.json` regenerado manteve o mesmo SHA-256 `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694`. |
| `py -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` | **8 testes passaram** (`Ran 8 tests ... OK`). Inclui testes independentes, caso conhecido, validações, os quatro subcasos de infinito e HTTP. O `ResourceWarning` de limpeza do 404 intencional não impediu o teste HTTP, que terminou `ok`. |
| `node .\projeto-dashboard\test_dashboard_browser.mjs` | **PASS** no Edge headless real via HTTP. Evidência detalhada no stdout: KPIs/gráficos/tabela comparados com recálculo; filtros isolados, combinados, vazios e limpar; teclado; layouts 390/1440 px; WCAG; sem erros JS ou requisições da aplicação com falha. O favicon automático `/favicon.ico` respondeu 404 e foi excluído pelo teste. |
| `py -m http.server 8000 --directory .\projeto-dashboard\site` | Executado em job temporário para validar o comando documentado sem manter servidor aberto. `GET http://127.0.0.1:8000/` retornou **HTTP 200** e continha o título “Vendas da papelaria”; job encerrado após a verificação. |

O passo condicional de criar `.venv` e instalar pandas não foi executado porque o ambiente virtual já existe e os comandos documentados funcionaram com ele. Não foi necessário instalar dependências.

## Filtros, resultados e legibilidade

O Edge real aprovou os estados sem filtro, cidade isolada, categoria isolada, combinação, seleção sem resultados e limpar filtros. Os valores exibidos em indicadores, gráficos e tabela coincidiram com o recálculo independente do JSON servido. Em 390 px não houve overflow (KPIs, filtros e gráficos em uma coluna; seletor 330 px). Em 1440 px, KPIs em três colunas, gráficos em duas e scrollWidth 1425 px.

Inspeção automatizada do DOM/CSS: pelo critério WCAG 2.2 AA 1.4.3 (mínimo de 4,5:1 para texto normal), os menores contrastes foram: rótulos de gráficos 6,27:1; valores de gráficos 9,64:1; cabeçalhos `th` 5,03:1 (9 cabeçalhos, 10 px); células `td` 7,84:1 (630 células, 11 px). Todos passaram em desktop e celular. Os tamanhos computados também foram registrados pelo teste: rótulos 12/11 px e valores 11/10 px em desktop/celular. WCAG 1.4.3 não define tamanho mínimo universal de fonte.

## Pendências e status

Não encontrei falha nos comandos documentados, nos filtros, nos cálculos ou no critério de contraste. A alteração do README é executável no ambiente especificado. Produto, scripts e relatórios anteriores permaneceram intactos.

**APROVADO — etapa do Tester independente.** Versão e evidências registradas para encaminhamento ao Revisor; esta aprovação não substitui a revisão independente nem o status final conjunto.
