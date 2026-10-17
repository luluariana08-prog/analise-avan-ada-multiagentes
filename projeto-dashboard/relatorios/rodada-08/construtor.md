# Relatório do Construtor — rodada 08

## Versão e hashes

Sem commit (workspace sem Git). SHA-256 da mudança e artefatos relevantes:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/site/styles.css` | `2BA8D2E435B985B58E2B42AD5C1E7E88B9A05712FB6D02D79952D1339EAAC49E` |
| `projeto-dashboard/README.md` (preservado) | `FDE1AFFD6EF5FAFA75D623387F9390B60BF172EBBA3D05939F637A11FCE44BE0` |
| `projeto-dashboard/site/index.html` (preservado) | `96EAF4698E111B7D02AEE40D3AAA1E0B4411D33C3125D7E40EE77445D95A6192` |
| `projeto-dashboard/site/app.js` (preservado) | `721F4AE85733884D71279BD875BDE536D18C8858BF70C0D6D72F765CB4146A8E` |
| `projeto-dashboard/site/chart-average.mjs` (preservado) | `083E7EEE9EF5FAF5AD1472FC7A49AACC3F5D1DC9866525A6513B4740A1DD6955` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |

Testes e históricos hash-verificados, sem alterações:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/test_construtor_chart_average.mjs` | `29B89CF88640A93FE0C7E18C3D10A04C0C1FC6AB6F08538E8AE4552AD365E3E3` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/test_tester_rodada05.mjs` | `6E7C0CC7583F526044350B16F85B904D6643EA665D63893D8D86190D41664512` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/relatorios/rodada-06/construtor.md` | `383C47EEC44419B1F4E74ED21E688AB7380BA58202949BADE124BE785E5A98FF` |
| `projeto-dashboard/relatorios/rodada-06/tester.md` | `7F8770917B576B6880251D5F3715ED97972A49E7E3F23ABD60781E9C739EF34F` |
| `projeto-dashboard/relatorios/rodada-07/construtor.md` | `FB5F96E8525BE9301CF72AD77AC2A2BA82E604CB6D3EDB26C3A381BCB571EC93` |
| `projeto-dashboard/relatorios/FINAL.md` (não atualizado) | `670A74324D04F47BF2AEE4D30AEBDCCBEA6205BCDB12772F1FD83BC301399AA2` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |

Hashes conferíveis com `Get-FileHash <arquivos> -Algorithm SHA256`. Não havia relatório de Tester ou Revisor para a rodada-07; a aprovação dessas etapas permanece pendente.

## Alteração e contraste

- A única alteração de produto foi `--paper: #111214` → `--paper: #65000B` em `site/styles.css`. `body` continua usando `background: var(--paper)` e `color: var(--on-dark)`. Banner/cartões rosa, painéis, gráficos rosa/preto, texto, responsividade e README permaneceram inalterados.
- Contraste WCAG calculado a partir das cores do CSS: texto herdado do body `#e6ece8` sobre fundo `#65000B` = **11,25:1**; texto de rodapé `#b7c2bc` = **7,35:1**; ênfase do rodapé `#f3f6f4` = **12,39:1**. Todos excedem 4,5:1.

## Comandos executados e evidências

Ambiente: Python 3.14.7/pandas 3.0.6 via `.venv`, Node.js v24.21.0 e Microsoft Edge.

- `node` com leitura do CSS, cálculo de luminância relativa WCAG e asserções para o fundo/cores herdadas — **PASS**: body 11,25:1; rodapé 7,35:1; ênfase 12,39:1.
- `.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py` — **PASS**: 180 vendas; bruto R$ 20.059,00; ticket R$ 111,44; 548 unidades. `site/dados.json` manteve o mesmo hash.
- `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` — **8 testes passaram**. O teste HTTP emitiu `ResourceWarning` durante a limpeza de um `HTTPError 404`, mas terminou `ok`.
- `node .\projeto-dashboard\test_construtor_chart_average.mjs` — **PASS**, incluindo contraste e cores dos gráficos.
- `node .\projeto-dashboard\test_dashboard_browser.mjs` — **PASS** no Edge headless: HTTP, interações, ausência de erros JS/rede e layouts 390/1440 px. O 404 automático de favicon foi ignorado pelo próprio teste.
- `node .\projeto-dashboard\test_tester_rodada05.mjs` — **PASS** no Edge, incluindo filtros, cores rosa/preto, legendas e responsividade.
- Hashes conferidos com `Get-FileHash`; `README.md`, testes, origem e relatórios antigos não mudaram. `FINAL.md` não foi atualizado.

## Encaminhamento e status

**APROVADO — etapa do Construtor somente.** Encaminho esta versão ao Tester para conferir a nova cor de fundo e o contraste no navegador. A rodada-07 ainda não tinha aprovação independente de Tester/Revisor; não declaro aprovação conjunta ou final.
