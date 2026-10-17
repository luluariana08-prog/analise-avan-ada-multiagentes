# Relatório do Tester independente — rodada 02

## Versão examinada

Sem commit: workspace sem repositório Git. SHA-256 da origem, produto, testes preservados e navegador após a execução:

| Arquivo | SHA-256 |
| --- | --- |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/site/index.html` | `E8CD536B90087FDBAF40BD25E43B58D129977555AA5A9CC7696C34AC6C1B0D37` |
| `projeto-dashboard/site/app.js` | `EDA8DDB13743F46CEFFEAF6EEB9260A49C151C4BC4E87067E8A2676B45AE4856` |
| `projeto-dashboard/site/styles.css` | `FC2757C8E0F7E9E1C7ED5F46A9463B8B91CFF611C8F9E0FFB39D151E7F1FC42E` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |

Os arquivos do site e a origem não mudaram em relação à rodada 01. O código de preparação e seus testes são a versão corrigida submetida pelo Construtor. Ampliei `test_dashboard_browser.mjs` com uma inspeção automática do DOM/CSS, mantendo os testes anteriores de carregamento, resultados, filtros, teclado e layouts. Não alterei produto nem relatórios anteriores.

## Comandos e resultados

Ambiente: Python 3.14.7/pandas 3.0.6, Node v24.21.0 e Microsoft Edge headless real via CDP.

| Comando | Resultado |
| --- | --- |
| `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` | **8 testes passaram** (`Ran 8 tests ... OK`). Inclui a suíte independente preservada e o novo teste de infinitos. Um `ResourceWarning` acompanha o 404 intencional do teste HTTP. |
| `node .\projeto-dashboard\test_dashboard_browser.mjs` | Navegador carregou a página por HTTP; testes de resultados, filtros isolados/combinados/vazios/limpar e teclado passaram. Sem erros de runtime, requisições do dashboard com falha ou recursos da aplicação ausentes. **Falhou** apenas na asserção de contraste dos cabeçalhos, descrita abaixo (exit code 1). Favicon automático `/favicon.ico` retornou 404 e foi excluído como no teste anterior. |
| `Get-FileHash <arquivos listados acima> -Algorithm SHA256` | Hashes registrados nesta versão. |

### Infinitos: quatro casos pedidos

`test_positive_and_negative_infinity_are_rejected_before_export` executa os quatro pares coluna/valor: `preco_unitario` com `+inf` e `-inf`; `valor_venda` com `+inf` e `-inf`. Todos os subtestes passaram: cada caso gera `ValueError` identificando valor não finito e não deixa JSON de saída. A suíte completa também passou após a extensão do teste de navegador.

### Filtros e resultados

No Edge real, o oráculo independente derivado do JSON servido foi comparado com KPIs, agrupamentos/gráficos e IDs/linhas da tabela. Passaram estado sem filtros, cidade isolada, categoria isolada, filtros combinados, seleção vazia, botão limpar (incluindo foco devolvido) e alteração de filtro por teclado. As verificações anteriores continuam no script. Em 390 px não houve overflow horizontal; em 1440 px também não.

### Legibilidade automatizada — critério e evidência

Critério de contraste: WCAG 2.2 AA, 1.4.3, mínimo **4,5:1** para texto normal. Calculei contraste a partir das cores computadas pelo navegador para texto e fundo; não há um tamanho mínimo universal de fonte definido por esse critério, então registrei os tamanhos CSS em pixels sem inventar limite de aprovação.

| Elementos | Desktop 1440 px — tamanho mínimo / contraste mínimo | Celular 390 px — tamanho mínimo / contraste mínimo | Resultado de contraste |
| --- | --- | --- | --- |
| Rótulos dos gráficos | 12 px / 6,27:1 | 11 px / 6,27:1 | Passa |
| Valores dos gráficos | 11 px / 9,64:1 | 10 px / 9,64:1 | Passa |
| Cabeçalhos da tabela (9) | 10 px / **3,88:1** | 10 px / **3,88:1** | **Falha** — abaixo de 4,5:1 |
| Células da tabela (630) | 11 px / 7,84:1 | 11 px / 7,84:1 | Passa |

Evidência reproduzível: os campos `desktop` e `mobile` impressos por `test_dashboard_browser.mjs` na saída do comando registram contagem, menor tamanho, menor contraste e amostra de cor/fundo computados pelo Edge. A falha de 3,88:1 ocorre em desktop e celular para texto `rgb(114, 128, 121)` sobre `rgb(247, 248, 245)` nos cabeçalhos `th`.

## Pendência e encaminhamento

**Reprovado no critério de legibilidade dos cabeçalhos de tabela.** Encaminhar ao Construtor para ajustar cor de texto e/ou fundo dos `th` até atingir contraste de pelo menos 4,5:1 e devolver para nova execução do navegador. Os tamanhos medidos (10–12 px) estão registrados para avaliação; o critério WCAG usado aqui é contraste, não um limite de tamanho de fonte. Não alterei o produto para corrigir a pendência.

## Status

**REPROVADO — etapa do Tester independente.** Suíte Python aprovada; teste funcional de navegador aprovado, mas a inspeção WCAG automatizada detectou contraste insuficiente nos cabeçalhos da tabela.
