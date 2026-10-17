# Relatório do Tester independente — rodada 03

## Versão verificada

Sem commit: workspace sem repositório Git. SHA-256 dos arquivos relevantes após os testes:

| Arquivo | SHA-256 |
| --- | --- |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/site/index.html` | `E8CD536B90087FDBAF40BD25E43B58D129977555AA5A9CC7696C34AC6C1B0D37` |
| `projeto-dashboard/site/app.js` | `EDA8DDB13743F46CEFFEAF6EEB9260A49C151C4BC4E87067E8A2676B45AE4856` |
| `projeto-dashboard/site/styles.css` | `B491020CE091F1A2824FF4440D241321B40654BAEFF6EFA68EC89878B01C3865` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |
| `projeto-dashboard/relatorios/rodada-03/construtor.md` | `744D86251A7AA8FAFCD97A9B45FF19EF4FB7D20E5DD01BF523A67B66975CCE8C` |

Também conferi hashes dos relatórios anteriores e dos arquivos de origem/documentação, sem divergências em relação às referências registradas pelo Construtor na rodada 03. Os scripts de teste e relatórios anteriores foram preservados. Não alterei produto nem relatório existente.

## Comandos executados e resultados

Ambiente: Python 3.14.7/pandas 3.0.6, Node v24.21.0 e Microsoft Edge headless real via CDP.

| Comando | Resultado / evidência |
| --- | --- |
| `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` | **8 testes passaram** (`Ran 8 tests ... OK`), incluindo recálculos independentes, exemplo conhecido, validações da origem/JSON, quatro casos de infinito, HTTP e cobertura já existente. O teste HTTP emitiu `ResourceWarning` na limpeza do 404 intencional e terminou `ok`. |
| `py .\projeto-dashboard\preparar_dados.py --output "$env:TEMP\dashboard-rodada03-dados.json"` | Concluído: 180 linhas; período 2026-01-01 a 2026-03-31; R$ 20.059,00 bruto; ticket médio R$ 111,44; 548 unidades. A saída foi temporária para não regravar o produto. |
| `Get-FileHash "$env:TEMP\dashboard-rodada03-dados.json",'projeto-dashboard\site\dados.json' -Algorithm SHA256` e comparação dos hashes | **Iguais**: ambos `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694`. |
| `node .\projeto-dashboard\test_dashboard_browser.mjs` | **PASS** no Edge headless real. Evidência resumida abaixo e valores completos no stdout da execução. |
| `Get-FileHash <arquivos relevantes> -Algorithm SHA256` | Hashes acima; scripts, origem e relatórios anteriores preservados. |

## Evidências de navegador, filtros e layouts

O Edge carregou o site via HTTP. Indicadores, gráficos e tabela coincidiram com o recálculo independente do JSON servido. Passaram filtro isolado de cidade, isolado de categoria, filtros combinados, seleção vazia, limpar filtros e operação por teclado. A tela não exibiu `NaN`/`Infinity`/`undefined`; não houve erros JavaScript ou requisições de recursos do dashboard com falha.

- **390 px:** largura de conteúdo 390 px sem overflow; KPIs, filtros e gráficos em uma coluna; seletor com 330 px.
- **1440 px:** scrollWidth 1425 px; KPIs em três colunas e gráficos em duas.
- O navegador fez uma requisição automática a `/favicon.ico` que retornou 404; o teste exclui esse favicon não referenciado da checagem de arquivos ausentes.

## Legibilidade e critério WCAG

Critério: WCAG 2.2 AA, 1.4.3 — contraste mínimo **4,5:1** para texto normal. As razões e tamanhos abaixo foram coletados de estilos computados no DOM, em desktop e celular:

| Texto | Desktop: menor tamanho / contraste | Celular: menor tamanho / contraste | Resultado |
| --- | --- | --- | --- |
| Rótulos dos gráficos | 12 px / 6,27:1 | 11 px / 6,27:1 | Passa |
| Valores dos gráficos | 11 px / 9,64:1 | 10 px / 9,64:1 | Passa |
| Cabeçalhos `th` (9) | 10 px / **5,03:1** | 10 px / **5,03:1** | **Passa** (>= 4,5:1) |
| Células `td` (630) | 11 px / 7,84:1 | 11 px / 7,84:1 | Passa |

No cabeçalho da tabela, o navegador computou primeiro plano `rgb(95, 110, 103)` (CSS `#5f6e67`) sobre `rgb(247, 248, 245)`; contraste observado **5,03:1**, superando o limiar pedido. A inspeção registra tamanho em pixels; WCAG 1.4.3 não define um tamanho mínimo universal de fonte. A inspeção visual automatizada foi incorporada ao `test_dashboard_browser.mjs` nesta rodada anterior e executada sem alteração nesta rodada.

## Encaminhamento e status

Sem pendências de Tester. Esta verificação aprova a correção de contraste e os testes solicitados na versão identificada pelos hashes acima. **APROVADO — etapa do Tester independente.** Encaminhar a versão e este relatório ao Revisor para a revisão independente; revisão e aprovação final conjunta não foram executadas por este Tester.
