# Revisão independente — rodada 09

## Versão examinada e hashes

Sem commit: workspace sem Git. Hashes SHA-256 conferidos nesta revisão:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/site/styles.css` | `1A9965CFDE823933732AC5CFC17C82074814AA30111468DC088624CF589C7985` |
| `projeto-dashboard/site/index.html` | `96EAF4698E111B7D02AEE40D3AAA1E0B4411D33C3125D7E40EE77445D95A6192` |
| `projeto-dashboard/site/app.js` | `721F4AE85733884D71279BD875BDE536D18C8858BF70C0D6D72F765CB4146A8E` |
| `projeto-dashboard/site/chart-average.mjs` | `083E7EEE9EF5FAF5AD1472FC7A49AACC3F5D1DC9866525A6513B4740A1DD6955` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/README.md` | `FDE1AFFD6EF5FAFA75D623387F9390B60BF172EBBA3D05939F637A11FCE44BE0` |
| `projeto-dashboard/test_construtor_chart_average.mjs` | `495A1EA4FB4AA34A3E60624799B42C702321ED6252A6EA5D3A5046C421B16CB1` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/test_tester_rodada05.mjs` | `6E7C0CC7583F526044350B16F85B904D6643EA665D63893D8D86190D41664512` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/relatorios/rodada-09/construtor.md` | `A28920C4801B624058A2DA54955CE399E6150520D3C1D2A972790D75ED8D6AB6` |
| `projeto-dashboard/relatorios/rodada-09/tester.md` | `BEAFE0D98373490FF52FBA9B9E47B1818A506FD3F765716C71DF11302FA77656` |
| `projeto-dashboard/relatorios/rodada-08/construtor.md` | `17BABE9B16CF107C3694BD49896EDE51576E4B7CE7CE0D9E0383840CD25A6D00` |
| `projeto-dashboard/relatorios/rodada-08/tester.md` | `EAEB0A8BFAE1DF8FD8D2D6213D639C3B7EDBBCD82B23DF6568CC93AA994BC6D4` |
| `projeto-dashboard/relatorios/rodada-07/construtor.md` | `FB5F96E8525BE9301CF72AD77AC2A2BA82E604CB6D3EDB26C3A381BCB571EC93` |
| `projeto-dashboard/relatorios/rodada-06/construtor.md` | `383C47EEC44419B1F4E74ED21E688AB7380BA58202949BADE124BE785E5A98FF` |
| `projeto-dashboard/relatorios/rodada-06/tester.md` | `7F8770917B576B6880251D5F3715ED97972A49E7E3F23ABD60781E9C739EF34F` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |
| `projeto-dashboard/relatorios/FINAL.md` (intocado) | `670A74324D04F47BF2AEE4D30AEBDCCBEA6205BCDB12772F1FD83BC301399AA2` |

Os hashes do produto R9 coincidem com o manifesto do Construtor; os hashes citados de históricos/origem coincidem com os manifestos R7–R9. `FINAL.md` não foi alterado, conforme pedido.

## Revisão do tema, contraste, cálculos e requisitos

- CSS define o fundo externo exato `#65000B`, texto herdado claro, banner em gradiente rosa e cartões/painéis rosa-claro. A auditoria do Tester reporta valores computados pelo Edge; comparei-os com as regras CSS presentes.
- A falha R8 dos textos do KPI primário (label 4,19:1 e note 3,91:1) está corrigida em R9: label `#4f5d56`, note `#55645d`. A auditoria independente no Edge mede os três labels e as três notes em cartões primários e normais. Todas as combinações passam WCAG 2.2 AA 1.4.3; mínimo 4,87:1. O teste do Construtor calcula as seis combinações nos extremos do gradiente e cartão normal.
- As cores de barras continuam rosa `#c2185b` para `total >= média` e preto `#18181b` abaixo. A média é recalculada por gráfico sobre os grupos visíveis, após cada filtro; os valores são arredondados a centavos. A legenda explica os dois estados e esclarece que igualdade também fica rosa.
- A média inicial dos totais por categoria e por cidade é R$ 6.686,33. Recalculei e conferi os grupos rosa/preto registrados: categoria Acessórios/Livros rosa e Papelaria preto; cidade Campinas/Santos rosa e Sorocaba preto. Os testes também cobrem filtros isolados, combinação Campinas+Papelaria (grupos únicos, iguais à média), limpar, vazio e centavos.
- Totais preservados: 180 vendas/IDs, 548 unidades, R$ 20.059,00 bruto, ticket médio R$ 111,44; dados JSON com o mesmo hash anterior. O README documenta a suíte Python e os três comandos Node, dependências, servidor HTTP e `site/` publicável.
- Histórico relevante: R8 reprovou por contraste insuficiente nos textos KPI; R9 altera somente essas duas cores no produto e estende o teste de contraste. Tester R9 aprova a correção; Constructor e Tester identificam a mesma versão/hashes.
- Skills `explore-data`, `data-visualization` e `validate-data` não estão disponíveis na pasta `.agents`; não foram usadas nem alego uso.

## Comandos e evidências executados

- `Get-FileHash <arquivos> -Algorithm SHA256`: hashes listados acima; nenhuma divergência nos artefatos R9 ou nos históricos citados.
- `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v`: **8 testes passaram**. Incluem validação dos dados, cálculos independentes, exemplo conhecido, infinitos e HTTP. `ResourceWarning` do 404 intencional ocorreu na limpeza, sem falha.
- `node .\projeto-dashboard\test_construtor_chart_average.mjs`: **PASS**, inclusive classificação inclusiva, filtros, vazio, centavos, contraste de barras e seis pares KPI.
- `node .\projeto-dashboard\test_dashboard_browser.mjs`: **PASS** em Edge headless real; HTTP, KPIs, gráficos/tabela, filtros, teclado, JavaScript/rede, contraste e layouts 390/1440 px. Sem overflow; `/favicon.ico` foi 404 automático e ignorado como recurso externo ao dashboard.
- `node .\projeto-dashboard\test_tester_rodada05.mjs`: **PASS** em Edge real; oráculo independente recalculou os grupos em centavos e verificou classes, cores SVG e ARIA nos estados inicial, filtros isolados/combinados e limpar, além das legendas e responsividade.
- Repreparação para arquivo temporário, sem regravar o produto: `.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py --output <temporário>`. Reproduziu os totais e o hash do JSON temporário coincide com `site/dados.json`: `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694`.
- Evidência R9 do Tester: auditoria temporária via Edge/CDP e HTTP, métricas de tema/KPI em estilos computados, reportada em `rodada-09/tester.md`; nenhuma falha pendente.

## Pendências e status

Nenhuma falha reproduzida nem pendência de revisão nesta versão. `FINAL.md` permanece intocado e só deve ser atualizado pelo Coordenador após as aprovações conjuntas. **APROVADO — revisão independente R9**, restrita à versão identificada pelos hashes acima; não é aprovação conjunta.
