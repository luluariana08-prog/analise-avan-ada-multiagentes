# Revisão independente — rodada 05

## Versão examinada e hashes

Sem commit: workspace sem Git. Hashes SHA-256 da versão atual e evidências relevantes:

| Arquivo | SHA-256 |
| --- | --- |
| `vendas_papelaria.csv` | `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/site/index.html` | `96EAF4698E111B7D02AEE40D3AAA1E0B4411D33C3125D7E40EE77445D95A6192` |
| `projeto-dashboard/site/app.js` | `721F4AE85733884D71279BD875BDE536D18C8858BF70C0D6D72F765CB4146A8E` |
| `projeto-dashboard/site/styles.css` | `5C864687F9B344112C867F3E4426D1F8409C34B99C8A31F3373746C4F457042B` |
| `projeto-dashboard/site/chart-average.mjs` | `083E7EEE9EF5FAF5AD1472FC7A49AACC3F5D1DC9866525A6513B4740A1DD6955` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |
| `projeto-dashboard/README.md` | `09559779D5DA0E70540A8A7EF437DE943A2C3EC8B5A3F52FF4D09425FC8AB236` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/test_construtor_chart_average.mjs` | `29B89CF88640A93FE0C7E18C3D10A04C0C1FC6AB6F08538E8AE4552AD365E3E3` |
| `projeto-dashboard/test_tester_rodada05.mjs` | `6E7C0CC7583F526044350B16F85B904D6643EA665D63893D8D86190D41664512` |
| `relatorios/rodada-05/construtor.md` | `9A7CF3FEA060E620F16D42794D07B998EEF247F510328C0CE53D44048AA0F417` |
| `relatorios/rodada-05/tester.md` | `6929B84D08AB093B32B639F1BE5877A12FB56B4FB613F4D6AB722E2CCD63FCC0` |

Conferi `Get-FileHash` dos artefatos acima e relatórios históricos R1–R4 contra seus manifestos; nenhum hash divergiu. `papelaria_limpa.csv`, `resumo.md`, `verificacao.md` e os relatórios anteriores permanecem nos hashes documentados. O hash de `vendas_papelaria.csv` continua igual ao registrado na revisão R3. O `FINAL.md` ainda identifica R4 como versão final; atualização futura é responsabilidade do Coordenador, não desta revisão.

## Cálculos, implementação e requisitos conferidos

- `chart-average.mjs` calcula, em centavos, a média aritmética dos totais dos grupos presentes e marca rosa quando `total >= média`; vazio retorna vazio. `app.js` usa essa classificação a cada renderização dos dois gráficos, após aplicar os filtros atuais.
- Totais iniciais independentes: categorias Acessórios R$ 10.517,00, Livros R$ 7.438,00 e Papelaria R$ 2.104,00; cidades Campinas R$ 8.578,00, Santos R$ 6.937,50 e Sorocaba R$ 4.543,50. Soma total R$ 20.059,00; média entre os três totais de cada gráfico R$ 6.686,33. Em ambos, os dois grupos maiores ficam rosas e o menor preto. Valores iguais à média também ficam rosa; a nota visível esclarece essa regra apesar do rótulo “Acima da média”.
- Legendas dos dois gráficos são nomeadas para tecnologia assistiva, mostram “Acima da média” e “Na média ou abaixo”, usam swatches rosa/preto e explicam o empate. O teste confere texto, classe, cor renderizada e descrição ARIA.
- A paleta atual é rosa `#c2185b` e preto `#18181b`, sobre trilho `#f0f3ef`; contraste calculado pelo teste: 5,25:1 e 15,84:1, respectivamente (ambos acima de 4,5:1).
- Dados e métricas preexistentes foram preservados: 180 vendas/IDs, 548 unidades, R$ 20.059,00 bruto e ticket médio R$ 111,44, no período 2026-01-01 a 2026-03-31. Bruto continua distinto de lucro.
- Histórico resumido: R1 encontrou falha de infinito; R2 corrigiu infinito e encontrou falha de contraste `th`; R3 corrigiu contraste e reprovou a documentação do browser no README; R4 documentou o browser e aprovou a revisão. A R5 acrescenta a classificação por média e testes próprios, sem mudanças nos artefatos históricos.
- Skills `explore-data`, `data-visualization` e `validate-data` ausentes em `.agents`; não foram usadas nem alego uso.

## Comandos e evidências reproduzidos

- `Get-FileHash <arquivos relevantes> -Algorithm SHA256`: hashes acima; os hashes dos relatórios históricos coincidem com os registrados pelos construtores.
- `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v`: **8 testes passaram**. Inclui os testes de dados, cálculo independente, exemplo conhecido, infinitos, HTTP e preservação/esquema. O `ResourceWarning` acompanha apenas o 404 intencional e não impediu `OK`.
- `node .\projeto-dashboard\test_construtor_chart_average.mjs`: **PASS**; igualdade inclusiva, mudança de média após filtro, vazio, grupo único, centavos e contraste.
- `node .\projeto-dashboard\test_dashboard_browser.mjs`: **PASS** no Edge real; HTTP, KPIs/gráficos/tabela, filtros, teclado, ausência de erros JS/rede/`NaN`, legibilidade e layouts. A 390 px, sem overflow (seletor 330 px, KPIs/filtros/gráficos em uma coluna); a 1440 px, três colunas de KPIs e duas de gráficos. `/favicon.ico` foi 404 automático e excluído do teste como recurso alheio ao site.
- `node .\projeto-dashboard\test_tester_rodada05.mjs`: **PASS** no Edge. O oráculo independente agregou o JSON servido em centavos, calculou as médias e conferiu classes/cores reais em estado inicial, filtro de cidade, filtro de categoria, combinação Campinas+Papelaria e limpar. Também verificou os grupos únicos empatados rosa, ambas as legendas e layout responsivo. Não importa a função de classificação do produto.
- Preparação para arquivo temporário, sem regravar o site: `.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py --output <temporário>`. Reproduziu 180 vendas, R$ 20.059,00, ticket R$ 111,44 e 548 unidades; SHA-256 temporário igual a `site/dados.json`: `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694`.

## Pendência — encaminhar ao Construtor/Coordenador

O README ainda documenta somente a suíte Python e `test_dashboard_browser.mjs`; não lista `test_construtor_chart_average.mjs` nem o novo teste independente `test_tester_rodada05.mjs`. A suíte `unittest` (`test_*.py`) não descobre arquivos `.mjs`, e `test_dashboard_browser.mjs` não invoca esses dois scripts (verificado por busca). Portanto, seguindo apenas o README, os testes específicos da nova regra rosa/preto não são executados. Recomendo documentar os dois comandos Node e explicitar que são testes adicionais necessários. Não alterei o README por instrução.

## Status

**REPROVADO — revisão independente da versão identificada pelos hashes acima.** A regra, cores, legendas, recálculos por filtro, totais e responsividade passaram; a pendência é documentar todos os testes automatizados da nova funcionalidade no README. Não é aprovação conjunta. `FINAL.md` deve ser atualizado pelo Coordenador somente após concluir o ciclo.
