# Revisão independente — rodada 03

## Versão examinada

Sem commit: workspace sem Git. SHA-256 final dos arquivos de produto, testes e fontes relevantes:

| Arquivo | SHA-256 |
| --- | --- |
| `vendas_papelaria.csv` (original, hash atual) | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/README.md` | `8B20E77CC207F20F13EBB44C7A003136B59E8B8B3B25128827C6A346D6901475` |
| `projeto-dashboard/site/index.html` | `E8CD536B90087FDBAF40BD25E43B58D129977555AA5A9CC7696C34AC6C1B0D37` |
| `projeto-dashboard/site/app.js` | `EDA8DDB13743F46CEFFEAF6EEB9260A49C151C4BC4E87067E8A2676B45AE4856` |
| `projeto-dashboard/site/styles.css` | `B491020CE091F1A2824FF4440D241321B40654BAEFF6EFA68EC89878B01C3865` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |

Hashes dos relatórios de Construtor/Tester/Revisor existentes nas rodadas 01–03 também foram conferidos com `Get-FileHash`; coincidem com os hashes citados nos relatórios anteriores, sem alteração do histórico. Em especial, `rodada-03/construtor.md` = `744D86251A7AA8FAFCD97A9B45FF19EF4FB7D20E5DD01BF523A67B66975CCE8C` e `rodada-03/tester.md` = `238976038EA91BE6DB1CEF1AECF8657C9F0ACFC7A7043C6422801B7CDE104413`.

## Histórico e conferência

- **Rodada 01:** a revisão encontrou a aceitação tardia de infinitos e evidência incompleta de legibilidade; seu status foi REPROVADO.
- **Rodada 02:** o Construtor corrigiu a validação numérica; o Tester passou a suíte Python, mas detectou contraste insuficiente nos cabeçalhos da tabela (3,88:1).
- **Rodada 03:** o Construtor mudou a cor `th` para `#5f6e67`; o Tester registrou contraste 5,03:1 e aprovou sua etapa. Reexecutei as verificações contra os hashes desta versão. O relatório do Construtor encaminha ao Tester, mas não registra um status APROVADO explícito para essa etapa.
- Os três arquivos com hashes históricos de preservação (`papelaria_limpa.csv`, `resumo.md`, `verificacao.md`) coincidem com as referências de rodada 01/02/03. `vendas_papelaria.csv` permanece presente e seu hash atual está acima, mas nenhum relatório anterior registrou seu hash: não é possível atestar por comparação hash-a-hash que seus bytes são os mesmos da linha de base anterior.
- Skills `explore-data`, `data-visualization` e `validate-data`: diretório `.agents`/arquivos de skill ausentes neste workspace; não foram usados nem alego uso.

## Comandos e evidências reproduzidas

- `Get-FileHash <arquivos relevantes> -Algorithm SHA256`: hashes finais acima; hashes documentados da origem limpa, resumos e relatórios históricos conferem.
- `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v`: **8 testes passaram**. Incluem recálculo independente com `csv`/`Decimal`, fixture conhecida, esquema/ausências/IDs/duplicatas, HTTP e o teste parametrizado de `+inf`/`-inf` em `preco_unitario` e `valor_venda`, que verifica rejeição antes de criar JSON. Houve `ResourceWarning` no 404 intencional; execução encerrou `OK`.
- `node .\projeto-dashboard\test_dashboard_browser.mjs`: **PASS** em Microsoft Edge headless real/CDP. Carregamento HTTP, comparação de KPIs/gráficos/tabela com os dados servidos, filtros isolados/combinados/vazios/limpar, operação por teclado e ausência de erros JS ou falhas de recursos passaram. `/favicon.ico` retornou 404 automático e foi excluído por não ser recurso da aplicação.
  - A 390 px: sem overflow, filtros/KPIs/gráficos em uma coluna; seletor 330 px. A 1440 px: KPIs em três e gráficos em duas colunas; scrollWidth 1425 px.
  - Contraste WCAG 2.2 AA 1.4.3 obtido dos estilos computados no Edge: rótulos de gráfico 6,27:1; valores de gráfico 9,64:1; 9 cabeçalhos `th` 5,03:1; 630 células `td` 7,84:1. Todos os grupos testados superam 4,5:1 nos dois viewports. Cabeçalho 10 px, rótulos 11–12 px, valores 10–11 px e células 11 px.
- Preparação isolada para não regravar a entrega: `.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py --output <temporário>`. Reproduziu 180 vendas, período 2026-01-01 a 2026-03-31, R$ 20.059,00 bruto, R$ 111,44 de ticket médio e 548 unidades. SHA-256 do JSON temporário igual ao `site/dados.json`: `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694`.
- Revisei o README: comandos para preparação, suíte Python e servidor HTTP local estão corretos; identifica `site/` como pasta publicável e não chama valor bruto de lucro.

## Achado / pendência a encaminhar

1. **README não documenta a execução do teste obrigatório de navegador.** O comando Python indicado no README executa os 8 testes `test_*.py`, mas não executa `test_dashboard_browser.mjs`. O README também não informa os requisitos Node.js e Microsoft Edge nem o comando `node .\projeto-dashboard\test_dashboard_browser.mjs`. O teste existe e passou nesta revisão, portanto a evidência da versão atual está presente; a falha é de reprodutibilidade/documentação para quem seguir apenas o README. Encaminhar ao Construtor para documentar o comando e pré-requisitos, sem substituir nem omitir o comando Python.

## Status

**REPROVADO — revisão independente da versão identificada pelos hashes acima.** Correções de infinitos e contraste confirmadas; testes atuais passaram. A pendência é a documentação incompleta do teste de navegador no README, e a preservação byte-a-byte do CSV original bruto não tem hash histórico para comparação. Não é aprovação conjunta: o relatório do Construtor da rodada 03 não declara status explícito, e skills ausentes não foram usadas.
