# Relatório do Tester independente — rodada 09

## Versão e hashes

Sem commit: workspace sem Git. Hashes conferidos após preparação e testes:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/README.md` | `FDE1AFFD6EF5FAFA75D623387F9390B60BF172EBBA3D05939F637A11FCE44BE0` |
| `projeto-dashboard/site/styles.css` | `1A9965CFDE823933732AC5CFC17C82074814AA30111468DC088624CF589C7985` |
| `projeto-dashboard/site/index.html` | `96EAF4698E111B7D02AEE40D3AAA1E0B4411D33C3125D7E40EE77445D95A6192` |
| `projeto-dashboard/site/app.js` | `721F4AE85733884D71279BD875BDE536D18C8858BF70C0D6D72F765CB4146A8E` |
| `projeto-dashboard/site/chart-average.mjs` | `083E7EEE9EF5FAF5AD1472FC7A49AACC3F5D1DC9866525A6513B4740A1DD6955` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_construtor_chart_average.mjs` | `495A1EA4FB4AA34A3E60624799B42C702321ED6252A6EA5D3A5046C421B16CB1` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/test_tester_rodada05.mjs` | `6E7C0CC7583F526044350B16F85B904D6643EA665D63893D8D86190D41664512` |
| `projeto-dashboard/relatorios/rodada-09/construtor.md` | `A28920C4801B624058A2DA54955CE399E6150520D3C1D2A972790D75ED8D6AB6` |
| `projeto-dashboard/relatorios/rodada-08/tester.md` | `EAEB0A8BFAE1DF8FD8D2D6213D639C3B7EDBBCD82B23DF6568CC93AA994BC6D4` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |

Os hashes de README, dados, origem, scripts, produto e relatórios anteriores coincidem com as referências do Construtor R9. A preparação regenerou `dados.json` sem alterar seu conteúdo. Não alterei produto nem histórico.

## Comandos e resultados

Ambiente: Python 3.14.7/pandas 3.0.6 via `.venv`, Node.js v24.21.0 e Microsoft Edge real.

| Comando | Resultado / evidência |
| --- | --- |
| `.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py` | **PASS**. 180 vendas, período 2026-01-01 a 2026-03-31, bruto R$ 20.059,00, ticket médio R$ 111,44 e 548 unidades. Hash de `dados.json` permaneceu `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694`. |
| `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` | **8 testes passaram** (`Ran 8 tests ... OK`). O `ResourceWarning` associado à limpeza do 404 intencional não impediu o teste HTTP, que terminou `ok`. |
| `node .\projeto-dashboard\test_construtor_chart_average.mjs` | **PASS**. Inclui asserções dos dois extremos do gradiente e do cartão normal para rótulo e nota KPI: todas as combinações >=4,5:1. |
| `node .\projeto-dashboard\test_dashboard_browser.mjs` | **PASS** no Edge real: carregamento HTTP, indicadores/gráficos/tabela, filtros, teclado, rede/JS e layouts. 390 px: sem overflow, grids em uma coluna; 1440 px: sem overflow, gráficos em duas colunas. O teste informa contraste mínimo de texto: gráficos 5,87:1, tabela 5,68:1 nos cabeçalhos e >=7,34:1 nas células. Favicon automático 404 foi ignorado pelo teste. |
| `node .\projeto-dashboard\test_tester_rodada05.mjs` | **PASS** no Edge real: classificações e cores renderizadas comparadas a médias recalculadas independentemente em estado inicial, filtros isolados/combinados e após limpar; legendas e responsividade passaram. |

Pandas já estava instalado no `.venv`; o comando condicional de instalação do README não foi necessário. Nenhum outro comando foi necessário para executar preparação, suíte e os três testes Node documentados.

## Edge: tema, contraste e KPIs

Auditoria adicional temporária via Edge/CDP e HTTP, removida ao terminar; nenhuma alteração de script permanente. Contraste calculado sobre valores CSS computados, conforme WCAG 2.2 AA 1.4.3 (>=4,5:1 para texto normal):

| Item | Estilo/fundo computado | Contraste mínimo | Resultado |
| --- | --- | ---: | --- |
| Fundo do `body` e texto herdado | fundo `rgb(101,0,11)` = **#65000B**; texto `rgb(230,236,232)` | 11,25:1 | Passa; cor exata |
| Banner rosa, título | gradiente `rgb(249,220,230)` → `rgb(255,240,244)`; texto `rgb(87,38,58)` | 9,41:1 | Passa |
| Banner rosa, eyebrow | texto `rgb(163,67,102)` contra os dois extremos | 4,62:1 | Passa |
| Banner rosa, introdução | texto `rgb(87,38,58)` contra os dois extremos | 9,41:1 | Passa |
| Painéis | cartão `#fff5f8`; cabeçalho de seção `#ffe8ef` | — | Cores computadas confirmam os painéis rosas claros |
| KPI primário, label (12 px) | `rgb(79,93,86)` sobre `#f9dce6` e `#fff1f5` | 5,41:1; 6,32:1 | Passa em ambos os extremos |
| KPI primário, note (10 px) | `rgb(85,100,93)` sobre `#f9dce6` e `#fff1f5` | 4,87:1; 5,69:1 | Passa em ambos os extremos |
| KPI normal, labels (2; 12 px) | `rgb(79,93,86)` sobre `#fff5f8` | 6,49:1 cada | Passa |
| KPI normal, notes (2; 10 px) | `rgb(85,100,93)` sobre `#fff5f8` | 5,84:1 cada | Passa |

Foram medidos e asseridos individualmente os três labels e as três notes KPI. Mínimo de todos os seis pares: **4,87:1**, no note do cartão primário contra o extremo mais saturado do gradiente. A cor exata do body, banner, cartão e seção rosa também foi verificada por asserções.

## Cálculos rosa/preto, filtros e responsividade

O teste Edge independente usou totais em centavos do JSON servido, média dos grupos visíveis e regra inclusiva `valor >= média`; comparou classes e `fill` do SVG com o resultado esperado. Inicialmente: categorias Acessórios/Livros rosa e Papelaria preta; cidades Campinas/Santos rosa e Sorocaba preta. Passaram cidade isolada Campinas, categoria isolada Livros, combinação Campinas + Papelaria (grupos únicos rosa por igualdade com a própria média) e reset. A legenda ARIA identifica cada gráfico e apresenta “Acima da média”, “Na média ou abaixo” e a nota de igualdade; swatches computados rosa/preto. Em 390 px, as legendas quebram linha e não há overflow; em 1440 px os dois gráficos permanecem em duas colunas.

## Pendências e status

Nenhuma falha reproduzida. Produto, scripts e histórico foram preservados; o contraste de todos os labels/notes KPI atende ao limiar solicitado.

**APROVADO — etapa do Tester independente.** Encaminhar esta versão ao Revisor para revisão independente; este status não substitui aprovação conjunta/final.
