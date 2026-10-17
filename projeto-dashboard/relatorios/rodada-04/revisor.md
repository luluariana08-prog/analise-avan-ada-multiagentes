# Revisão independente — rodada 04

## Versão examinada

Sem commit: workspace sem Git. Hashes SHA-256 conferidos nesta revisão:

| Arquivo | SHA-256 |
| --- | --- |
| `vendas_papelaria.csv` | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/README.md` | `09559779D5DA0E70540A8A7EF437DE943A2C3EC8B5A3F52FF4D09425FC8AB236` |
| `projeto-dashboard/site/index.html` | `E8CD536B90087FDBAF40BD25E43B58D129977555AA5A9CC7696C34AC6C1B0D37` |
| `projeto-dashboard/site/app.js` | `EDA8DDB13743F46CEFFEAF6EEB9260A49C151C4BC4E87067E8A2676B45AE4856` |
| `projeto-dashboard/site/styles.css` | `B491020CE091F1A2824FF4440D241321B40654BAEFF6EFA68EC89878B01C3865` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |

Hashes dos relatórios históricos também conferidos contra o manifesto da rodada 04: R1 construtor `E10366ED67E7A15B4C9E8EF791BC47580B4B18EBDA49E372F8A2EF57105B71F8`, tester `C35308AD3A2F87C928F208273963F4145D30FB1517101EC51F9BFAD7091882FA`, revisor `577364884D83D979A5A91DE22C6A776AA7CC6A0E1E65674F2560605201A85EB5`; R2 construtor `68C2150BB1911BD70FD0E33D0BB3364457DEB303FF9313280C6924815E38BE8C`, tester `3039A500449E132A111A46714CD7325B5F150F989E0A49073E1C7158CA92C601`; R3 construtor `744D86251A7AA8FAFCD97A9B45FF19EF4FB7D20E5DD01BF523A67B66975CCE8C`, tester `238976038EA91BE6DB1CEF1AECF8657C9F0ACFC7A7043C6422801B7CDE104413`, revisor `D455A7232A235A12D908434FF10432F7E45B8B20AB0BE9CFCAB4C9B69FF3FE3C`. R4 construtor `077E2AB6C9B22E7F2C94BDDBEE5ABD3AD06CD71ED267819D034EB0BD60EE18C0`; tester `9126D810D5DCF96F5053E8C85C07B448D0B63807A75EAE93206298D6B5117883`. Nenhuma divergência de hash encontrada.

## Histórico, produto e requisitos

- R1: revisão reprovou pela validação tardia de infinito e evidência parcial de legibilidade. R2: infinito corrigido; Tester reprovou contraste `th` (3,88:1). R3: contraste corrigido para 5,03:1; ficou a documentação do teste browser no README. R4: README documenta comando/pré-requisitos, e Construtor e Tester registram aprovação de suas etapas.
- Confirmei no código a rejeição de valores não finitos por `numpy.isfinite` e os testes `+inf`/`-inf` em `preco_unitario` e `valor_venda`. CSS mantém `th` em `#5f6e67`; código/teste browser mede contraste dos rótulos e textos de gráficos e tabela.
- A preparação e as evidências independentes confirmam 180 vendas (IDs únicos), 548 unidades, R$ 20.059,00 bruto e ticket médio R$ 111,44, no período 2026-01-01 a 2026-03-31. Os agrupamentos por cidade/categoria e sua correspondência no JSON/site foram aprovados pela suíte. Bruto não é apresentado como lucro.
- README atualizado inclui preparação, suíte Python, teste Edge/browser (Node.js 22+, Edge e `.venv` com pandas), servidor HTTP local e pasta publicável `site/`. Os comandos estão corretos para o workspace indicado.
- Hashes de `papelaria_limpa.csv`, `resumo.md` e `verificacao.md` coincidem com as referências históricas. `vendas_papelaria.csv` existe e seu hash atual coincide com o hash registrado na revisão R3; portanto está preservado de R3 para R4. Limitação histórica: não há hash desse CSV bruto registrado antes de R3, então não atesto comparação byte-a-byte com o início da rodada 01.
- Skills `explore-data`, `data-visualization` e `validate-data` ausentes (pasta `.agents` inexistente); não foram usadas nem alego uso.

## Evidências executadas nesta revisão

- `Get-FileHash <arquivos relevantes> -Algorithm SHA256`: hashes acima; também confirmei os hashes históricos e os de origem/documentação preservados.
- `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v`: **8 testes passaram**. Cobrem validações/esquema/ausências/duplicatas, cálculo independente com `csv`/`Decimal`, exemplo conhecido, quatro casos de infinito e serviço HTTP. Houve `ResourceWarning` na limpeza do 404 intencional; os testes terminaram `OK`.
- `node .\projeto-dashboard\test_dashboard_browser.mjs`: **PASS** no Microsoft Edge headless real. HTTP, cálculos/indicadores/gráficos/tabela, filtros isolados/combinados/vazios/limpar, teclado, ausência de `NaN`/erros JS/falhas de recursos passaram. O favicon automático 404 foi excluído como não pertencente à aplicação.
  - 390 px: sem overflow, KPIs/filtros/gráficos em uma coluna, seletor 330 px. 1440 px: KPIs em três e gráficos em duas colunas, `scrollWidth` 1425 px.
  - Contraste computado pelo browser nos dois viewports: rótulos de gráfico 6,27:1; valores 9,64:1; cabeçalhos `th` 5,03:1; células `td` 7,84:1. Todos os grupos testados superam o mínimo 4,5:1 WCAG 2.2 AA 1.4.3.
- Repreparei para arquivo temporário via `.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py --output <temporário>`: os totais reproduziram e o JSON temporário teve o mesmo hash de `site/dados.json` (`0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694`), sem regravar o produto.
- O Tester registrou execução dos comandos do README, inclusive `py -m http.server 8000 --directory .\projeto-dashboard\site` com resposta HTTP 200; conferi essa evidência no relatório `rodada-04/tester.md`.

## Pendências e status

Nenhuma falha reproduzida nem pendência obrigatória de teste/documentação para a versão identificada acima. A ressalva histórica do hash do CSV bruto está explícita; o hash atual coincide com R3 e os outros arquivos originais têm hashes preservados desde as referências anteriores. **APROVADO — revisão independente desta versão.** Isto não é aprovação conjunta nem status final: cabe ao Coordenador consolidar as aprovações.
