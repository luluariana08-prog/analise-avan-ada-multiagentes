# Relatório do Construtor — rodada 04

## Versão e hashes

Sem commit (workspace sem Git). Arquivos relevantes nesta versão:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/README.md` (alterado nesta rodada) | `09559779D5DA0E70540A8A7EF437DE943A2C3EC8B5A3F52FF4D09425FC8AB236` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/site/index.html` | `E8CD536B90087FDBAF40BD25E43B58D129977555AA5A9CC7696C34AC6C1B0D37` |
| `projeto-dashboard/site/app.js` | `EDA8DDB13743F46CEFFEAF6EEB9260A49C151C4BC4E87067E8A2676B45AE4856` |
| `projeto-dashboard/site/styles.css` | `B491020CE091F1A2824FF4440D241321B40654BAEFF6EFA68EC89878B01C3865` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |

Hashes dos históricos preservados:

| Relatório | SHA-256 |
| --- | --- |
| `rodada-01/construtor.md` | `E10366ED67E7A15B4C9E8EF791BC47580B4B18EBDA49E372F8A2EF57105B71F8` |
| `rodada-01/tester.md` | `C35308AD3A2F87C928F208273963F4145D30FB1517101EC51F9BFAD7091882FA` |
| `rodada-01/revisor.md` | `577364884D83D979A5A91DE22C6A776AA7CC6A0E1E65674F2560605201A85EB5` |
| `rodada-02/construtor.md` | `68C2150BB1911BD70FD0E33D0BB3364457DEB303FF9313280C6924815E38BE8C` |
| `rodada-02/tester.md` | `3039A500449E132A111A46714CD7325B5F150F989E0A49073E1C7158CA92C601` |
| `rodada-03/construtor.md` | `744D86251A7AA8FAFCD97A9B45FF19EF4FB7D20E5DD01BF523A67B66975CCE8C` |
| `rodada-03/tester.md` | `238976038EA91BE6DB1CEF1AECF8657C9F0ACFC7A7043C6422801B7CDE104413` |
| `rodada-03/revisor.md` | `D455A7232A235A12D908434FF10432F7E45B8B20AB0BE9CFCAB4C9B69FF3FE3C` |

Origem/documentos preservados: `papelaria_limpa.csv` — `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E`; `resumo.md` — `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B`; `verificacao.md` — `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698`.

Hashes conferíveis com `Get-FileHash <arquivos> -Algorithm SHA256`.

## Correção e evidências

- Alterei somente `README.md` além deste relatório. Documentei o teste browser `node .\projeto-dashboard\test_dashboard_browser.mjs`, os requisitos Node.js 22+, Microsoft Edge em caminho padrão do Windows e `.venv\Scripts\python.exe` com pandas. Expliquei que o teste usa esse Python do harness para servir `site/`, e como interpretar `PASS` versus falha/código de saída diferente de zero. A suíte Python já documentada permanece separada e necessária.
- Ambiente conferido: `.venv\Scripts\python.exe` — Python 3.14.7/pandas 3.0.6; Node.js v24.21.0; Edge encontrado em `%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe`.
- `py .\projeto-dashboard\preparar_dados.py` — concluído; validação e exportação de 180 vendas para `site/dados.json`, com R$ 20.059,00 bruto, ticket médio R$ 111,44 e 548 unidades.
- `py -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` — **8 testes passaram**. O teste HTTP emitiu `ResourceWarning` ao limpar um `HTTPError 404`, mas terminou `ok`.
- `node .\projeto-dashboard\test_dashboard_browser.mjs` — **PASS** em Edge headless real. Verificou carregamento HTTP, KPIs/gráficos/tabela, filtros isolados/combinados/vazios/limpar, teclado, layouts 390 px e 1440 px, contraste (cabeçalho da tabela 5,03:1) e ausência de erros JS/rede. O Edge solicitou `/favicon.ico` automaticamente (404 excluído pelo teste); não houve falha de recurso da aplicação.
- Não alterei HTML/CSS/JavaScript, preparação, testes, origem ou relatórios anteriores. A preparação regenerou `site/dados.json` com o mesmo hash registrado acima (sem mudança de conteúdo).

## Encaminhamento e status

**APROVADO — etapa do Construtor somente.** Encaminho ao Tester para confirmar a reprodutibilidade dos comandos documentados e ao Revisor para reexaminar o achado do README na versão com este hash. Não declaro aprovação final ou conjunta; essas etapas permanecem pendentes.
