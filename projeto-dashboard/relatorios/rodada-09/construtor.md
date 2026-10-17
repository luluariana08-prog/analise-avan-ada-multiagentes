# Relatório do Construtor — rodada 09

## Versão e hashes

Sem commit (workspace sem Git). SHA-256 dos artefatos relevantes:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/site/styles.css` | `1A9965CFDE823933732AC5CFC17C82074814AA30111468DC088624CF589C7985` |
| `projeto-dashboard/test_construtor_chart_average.mjs` (inclui a asserção KPI) | `495A1EA4FB4AA34A3E60624799B42C702321ED6252A6EA5D3A5046C421B16CB1` |
| `projeto-dashboard/test_dashboard_browser.mjs` (inalterado) | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/test_tester_rodada05.mjs` (inalterado) | `6E7C0CC7583F526044350B16F85B904D6643EA665D63893D8D86190D41664512` |
| `projeto-dashboard/test_preparar_dados.py` (inalterado) | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` (inalterado) | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/relatorios/rodada-08/tester.md` (preservado) | `EAEB0A8BFAE1DF8FD8D2D6213D639C3B7EDBBCD82B23DF6568CC93AA994BC6D4` |
| `projeto-dashboard/relatorios/rodada-08/construtor.md` (preservado) | `17BABE9B16CF107C3694BD49896EDE51576E4B7CE7CE0D9E0383840CD25A6D00` |
| `projeto-dashboard/relatorios/rodada-07/construtor.md` (preservado) | `FB5F96E8525BE9301CF72AD77AC2A2BA82E604CB6D3EDB26C3A381BCB571EC93` |
| `projeto-dashboard/relatorios/FINAL.md` (não alterado) | `670A74324D04F47BF2AEE4D30AEBDCCBEA6205BCDB12772F1FD83BC301399AA2` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |

Hashes reproduzíveis com `Get-FileHash <arquivos> -Algorithm SHA256`.

## Correção e contraste

- Alterei somente as cores das duas regras indicadas em `site/styles.css`: `.kpi-label` de `#5f6e67` para `#4f5d56`, e `.kpi-note` de `#63736b` para `#55645d`. Fundo global `#65000B`, gradientes, cartões e demais estilos foram preservados.
- Estendi o teste próprio já documentado `test_construtor_chart_average.mjs` com asserções KPI. Lê as cores e fundos declarados no CSS, calcula luminância relativa WCAG e exige contraste >=4,5:1 nos dois extremos do gradiente rosa e no cartão KPI normal. Não alterei o browser test do Tester.
- Contrastes medidos: rótulo — **5,41:1** (`#f9dce6`), **6,32:1** (`#fff1f5`) e **6,49:1** (`#fff5f8`); nota — **4,87:1**, **5,69:1** e **5,84:1**, respectivamente. O mínimo dos seis pares é **4,87:1**.
- Não alterei o browser test do Tester: a evidência automatizada adicional está no teste próprio do Construtor; o browser existente foi executado como regressão.

## Comandos executados e resultados

Ambiente: Node.js v24.21.0; Python 3.14.7/pandas 3.0.6 via `.venv`; Microsoft Edge.

- `node .\projeto-dashboard\test_construtor_chart_average.mjs` — **PASS**; média inclusiva, filtros, vazio, centavos, contraste das barras e seis combinações de contraste KPI >=4,5:1.
- `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` — **8 testes passaram**. `ResourceWarning` ao limpar o 404 do teste HTTP; teste terminou `ok`.
- `node .\projeto-dashboard\test_dashboard_browser.mjs` — **PASS** em Edge headless; HTTP, interações, rede/JS e layouts 390/1440 px. Esse script não mede `.kpi-label`/`.kpi-note`; a verificação específica está no novo teste de contraste.
- `node .\projeto-dashboard\test_tester_rodada05.mjs` — **PASS** em Edge; classificações dos gráficos, filtros, legendas e responsividade mantidos.

Os relatórios alheios/históricos, `README.md`, outros estilos, dados e fontes mantiveram seus hashes. Não atualizei `FINAL.md`.

## Encaminhamento e status

**APROVADO — etapa do Construtor somente.** Devolvo a versão ao Tester para repetir a auditoria R8 no Edge/estilos computados e registrar a etapa. Não declaro aprovação conjunta ou final.
