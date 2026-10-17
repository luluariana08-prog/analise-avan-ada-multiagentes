# Relatório do Construtor — rodada 06

## Versão e hashes

Sem commit (workspace sem Git). SHA-256 dos arquivos relevantes:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/site/styles.css` (fundo escuro e apoio do rodapé) | `F0F117B151864ED7EDE80F817E12641DD5E28D8F7428D30BC8CC8361D0CD7A59` |
| `projeto-dashboard/README.md` (três comandos Node documentados) | `051A8746E18AD2C807972AB218A4F5FD2B4E46053EA2DA3B2A4C8F9E050E5BF3` |
| `projeto-dashboard/site/index.html` | `96EAF4698E111B7D02AEE40D3AAA1E0B4411D33C3125D7E40EE77445D95A6192` |
| `projeto-dashboard/site/app.js` | `721F4AE85733884D71279BD875BDE536D18C8858BF70C0D6D72F765CB4146A8E` |
| `projeto-dashboard/site/chart-average.mjs` | `083E7EEE9EF5FAF5AD1472FC7A49AACC3F5D1DC9866525A6513B4740A1DD6955` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |
| `projeto-dashboard/test_construtor_chart_average.mjs` | `29B89CF88640A93FE0C7E18C3D10A04C0C1FC6AB6F08538E8AE4552AD365E3E3` |

Testes/relatórios externos e produtos não alterados, conferidos por hash:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/test_tester_rodada05.mjs` | `6E7C0CC7583F526044350B16F85B904D6643EA665D63893D8D86190D41664512` |
| `projeto-dashboard/relatorios/rodada-05/tester.md` | `6929B84D08AB093B32B639F1BE5877A12FB56B4FB613F4D6AB722E2CCD63FCC0` |
| `projeto-dashboard/relatorios/rodada-05/revisor.md` | `8FD92B525A03930F5A986A0081FED6766F3370DF49488C6C680AF4DE4240B5EF` |
| `projeto-dashboard/relatorios/rodada-05/construtor.md` | `9A7CF3FEA060E620F16D42794D07B998EEF247F510328C0CE53D44048AA0F417` |
| `projeto-dashboard/relatorios/FINAL.md` (não atualizado) | `670A74324D04F47BF2AEE4D30AEBDCCBEA6205BCDB12772F1FD83BC301399AA2` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |

Comando para conferir: `Get-FileHash <arquivos> -Algorithm SHA256`. Os demais relatórios históricos R1–R5 também foram hash-verificados e preservados.

## Alterações

- O fundo externo agora usa `--paper: #111214`, um quase-preto; o banner rosa, os painéis claros e as cores rosa/preto dos gráficos foram mantidos.
- Clareei somente os textos de apoio do rodapé sobre o fundo escuro: `#b7c2bc` e `#f3f6f4`. Contraste calculado sobre `#111214`: **10,22:1** e **17,22:1**.
- O README agora lista e explica os três comandos Node, além da suíte Python: teste do Construtor (`test_construtor_chart_average.mjs`), browser (`test_dashboard_browser.mjs`) e teste independente (`test_tester_rodada05.mjs`). Documenta pré-requisitos e significado de `PASS`/falha.
- `site/dados.json` foi regenerado pela preparação e manteve o mesmo hash/conteúdo.

## Comandos executados e evidências

Ambiente: Python 3.14.7/pandas 3.0.6 via `.venv`, Node.js v24.21.0 e Microsoft Edge.

- `.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py` — concluído: 180 vendas, bruto R$ 20.059,00, ticket médio R$ 111,44 e 548 unidades.
- `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` — **8 testes passaram**. O teste HTTP registrou `ResourceWarning` ao limpar um `HTTPError 404`, mas terminou `ok`.
- `node .\projeto-dashboard\test_construtor_chart_average.mjs` — **PASS**; classificação por média visível, igualdade inclusiva, filtros, vazio, contraste das barras e casos em centavos.
- `node .\projeto-dashboard\test_dashboard_browser.mjs` — **PASS** no Edge headless; HTTP, KPIs, gráficos/tabela, filtros, teclado, ausência de erros JS/rede e layouts de 390 px/1440 px. O favicon automático retornou 404 e foi excluído pelo teste.
- `node .\projeto-dashboard\test_tester_rodada05.mjs` — **PASS** no Edge; classificação e cores conferidas independentemente em estado inicial, filtros isolados/combinados e após limpar; legendas e responsividade passaram.
- O teste do Tester mediu os dois painéis sem overflow em 390 px (legendas com wrap) e os gráficos em duas colunas a 1440 px. O navegador não foi alterado para esta rodada.

## Encaminhamento e status

**APROVADO — etapa do Construtor somente.** Encaminho as alterações ao Tester para confirmar tema e testes na versão atual e ao Revisor para revisão independente da correção documental R5 e do fundo escuro. Não alterei `FINAL.md` nem declaro aprovação conjunta/final.
