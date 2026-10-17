# Relatório do Tester independente — rodada 01

## Versão examinada

Sem commit: workspace sem repositório Git. SHA-256 conferidos após os testes:

| Arquivo | SHA-256 |
| --- | --- |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `projeto-dashboard/preparar_dados.py` | `E558A221D588F5DF950FDB59851C75EAD707CDABE9DDA4E7D3A632FD5ABC43E2` |
| `projeto-dashboard/test_preparar_dados.py` | `59A5AE8CA4EFC487C565E96EDC2C25EDB4E7D934FD806D2E7666DF62187AEF4F` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `0D6E73A9AB3D0241E022BE83F685BB499712E97ACF5A6B6ADB70050A8F112410` |
| `projeto-dashboard/site/index.html` | `E8CD536B90087FDBAF40BD25E43B58D129977555AA5A9CC7696C34AC6C1B0D37` |
| `projeto-dashboard/site/app.js` | `EDA8DDB13743F46CEFFEAF6EEB9260A49C151C4BC4E87067E8A2676B45AE4856` |
| `projeto-dashboard/site/styles.css` | `FC2757C8E0F7E9E1C7ED5F46A9463B8B91CFF611C8F9E0FFB39D151E7F1FC42E` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |

Os hashes dos sete arquivos do produto coincidem com os registrados pelo Construtor. O hash do CSV também coincide com a referência do Construtor. A preparação foi executada uma vez com saída temporária e uma vez para o destino documentado; `dados.json` permaneceu idêntico ao hash acima. Não alterei arquivos do produto nem os testes existentes. Não usei skill.

## Verificações e evidências

Ambiente: Python 3.14.7, pandas 3.0.6, Node v24.21.0 e Microsoft Edge disponível. Os testes independentes já presentes em `test_tester_independente.py` foram executados junto dos testes do Construtor.

| Comando | Resultado / evidência |
| --- | --- |
| `py .\projeto-dashboard\preparar_dados.py --output "$env:TEMP\dashboard-tester-dados.json"` | Concluído; validou e exportou 180 linhas para arquivo temporário. Recalculou período 2026-01-01 a 2026-03-31, 180 vendas, R$ 20.059,00 bruto, R$ 111,44 de ticket médio e 548 unidades. |
| `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` | **7 testes passaram**. Evidência detalhada no stdout desta execução; incluiu os arquivos `test_preparar_dados.py` e `test_tester_independente.py`. |
| `node .\projeto-dashboard\test_dashboard_browser.mjs` | **PASS** em Edge headless real via CDP. Evidência detalhada no stdout desta execução. |
| `Get-FileHash <arquivos listados acima> -Algorithm SHA256` | Hashes registrados nesta versão; sem divergência nos arquivos de produto em relação à versão examinada pelo Construtor. |

Os testes Python verificaram preservação da origem, esquema/ordem das colunas, valores ausentes, IDs únicos, valores e tipos, rejeição de entradas inválidas e duplicatas, e exportação de um exemplo pequeno conhecido (R$ 17,50 e 5 unidades). O recálculo independente usa `csv`, iteração e `Decimal`, em vez das agregações pandas da preparação. Os totais e agrupamentos independentes coincidiram com o CSV e o JSON: categorias Acessórios (65 vendas, R$ 10.517,00, 196 unidades), Livros (54, R$ 7.438,00, 161) e Papelaria (61, R$ 2.104,00, 191); cidades Campinas (70, R$ 8.578,00, 205), Santos (60, R$ 6.937,50, 191) e Sorocaba (50, R$ 4.543,50, 152).

O teste HTTP serviu página, CSS, JS e JSON com status 200 e confirmou 404 para um recurso inexistente esperado. O teste de navegador comparou KPIs, gráficos e todas as linhas/IDs da tabela com recálculos derivados do JSON servido. Passaram estado inicial, filtro isolado por cidade, filtro isolado por categoria, combinação, seleção sem correspondências, limpar filtros, ausência de `NaN`/`Infinity`/`undefined`, operação via teclado e foco após limpar. Em 390 px: sem overflow horizontal, KPIs/filtros/gráficos em uma coluna e seletor com 330 px. Em 1440 px: sem overflow, três colunas de KPIs e duas de gráficos. Não houve erros JavaScript nem requisições de recursos do dashboard falhas.

Observação registrada sem mascarar evidência: o navegador fez uma requisição automática a `/favicon.ico` que retornou 404; o teste identifica e exclui esse favicon gerado pelo navegador dos recursos da aplicação. Também apareceu um `ResourceWarning` associado ao 404 intencional no teste HTTP; os sete testes terminaram com `OK`.

## Pendências e encaminhamentos

Nenhuma verificação obrigatória de Tester ficou pendente. O `/favicon.ico` automático não é usado ou referenciado pelo dashboard e não alterou o resultado dos testes. Nenhum defeito reproduzido a encaminhar ao Construtor. Este status é somente a aprovação independente do Tester; não substitui a revisão do Revisor nem a aprovação conjunta final prevista no `AGENTS.MD`.

## Status

**APROVADO — etapa do Tester independente.**
