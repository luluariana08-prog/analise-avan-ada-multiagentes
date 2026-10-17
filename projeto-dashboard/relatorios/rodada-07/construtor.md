# Relatório do Construtor — rodada 07

## Versão e hashes

Sem commit (workspace sem Git). SHA-256 dos arquivos relevantes:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/site/styles.css` | `EDB4BBAD4B353612E011B1C1124E545199926424A10EAA22BED2B7F3B061A8B3` |
| `projeto-dashboard/README.md` | `FDE1AFFD6EF5FAFA75D623387F9390B60BF172EBBA3D05939F637A11FCE44BE0` |
| `projeto-dashboard/site/index.html` | `96EAF4698E111B7D02AEE40D3AAA1E0B4411D33C3125D7E40EE77445D95A6192` |
| `projeto-dashboard/site/app.js` | `721F4AE85733884D71279BD875BDE536D18C8858BF70C0D6D72F765CB4146A8E` |
| `projeto-dashboard/site/chart-average.mjs` | `083E7EEE9EF5FAF5AD1472FC7A49AACC3F5D1DC9866525A6513B4740A1DD6955` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |

Artefatos de Tester/testes preservados e conferidos:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_construtor_chart_average.mjs` | `29B89CF88640A93FE0C7E18C3D10A04C0C1FC6AB6F08538E8AE4552AD365E3E3` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/test_tester_rodada05.mjs` | `6E7C0CC7583F526044350B16F85B904D6643EA665D63893D8D86190D41664512` |
| `projeto-dashboard/relatorios/rodada-05/tester.md` | `6929B84D08AB093B32B639F1BE5877A12FB56B4FB613F4D6AB722E2CCD63FCC0` |
| `projeto-dashboard/relatorios/rodada-05/revisor.md` | `8FD92B525A03930F5A986A0081FED6766F3370DF49488C6C680AF4DE4240B5EF` |
| `projeto-dashboard/relatorios/rodada-06/construtor.md` | `383C47EEC44419B1F4E74ED21E688AB7380BA58202949BADE124BE785E5A98FF` |
| `projeto-dashboard/relatorios/rodada-06/tester.md` | `7F8770917B576B6880251D5F3715ED97972A49E7E3F23ABD60781E9C739EF34F` |
| `projeto-dashboard/relatorios/FINAL.md` (não atualizado) | `670A74324D04F47BF2AEE4D30AEBDCCBEA6205BCDB12772F1FD83BC301399AA2` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |

Comando para conferir: `Get-FileHash <arquivos> -Algorithm SHA256`. Os demais relatórios históricos R1–R6 foram verificados e preservados.

## Alterações e evidências

- Mantive o fundo externo quase preto `#111214`, o banner rosa e as cores rosa/preto dos gráficos. Filtros, KPIs, gráficos e tabela agora usam fundos rosa claros; cabeçalhos de seção/tabela têm tom rosa mais forte. Controles continuam brancos e dados/tabela permanecem legíveis. O fundo branco das áreas operacionais foi substituído por blush claro; o cartão principal conserva destaque próprio.
- `.intro` agora usa `#57263a`: contraste calculado nos dois extremos do gradiente `#f9dce6`/`#fff0f4` = **9,41:1**/**10,91:1**, acima de 4,5:1.
- O texto herdado do `body` usa `--on-dark: #e6ece8` sobre `#111214` (**15,64:1**). `.panel` e `.kpi-card` redefinem a cor para o texto escuro apropriado sobre os fundos claros. Texto de apoio do rodapé mantém contraste **10,22:1**/**17,22:1**.
- Contrastes calculados para conteúdo dos painéis: rótulos dos filtros **5,45:1**, KPIs **5,03:1**/notas **4,69:1**, eyebrow de seção **4,69:1**, título de seção **12,57:1**, unidades BRL/cabeçalho da tabela **5,68:1**, células **8,06:1**, legenda **9,03:1** e estado vazio **5,66:1**.
- O README não usa mais comandos `py` para preparo, suíte ou servidor. Registra criação de `.venv` pelo VS Code, instalação de pandas e comandos com `.venv\Scripts\python.exe`; preserva os três comandos Node e pré-requisitos/descrições.
- A preparação regenerou `site/dados.json`, sem mudança de conteúdo/hash. Nenhum teste ou relatório alheio foi editado; `FINAL.md` não foi tocado.

## Comandos executados e resultados

Ambiente: Python 3.14.7/pandas 3.0.6 em `.venv`, Node v24.21.0, Microsoft Edge.

- `.\.venv\Scripts\python.exe -m pip install pandas` — concluiu; pandas e dependências já estavam instalados. A criação via VS Code é condicional e não foi repetida porque `.venv` já existia.
- `.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py` — **PASS**: 180 vendas, R$ 20.059,00 bruto, R$ 111,44 ticket médio e 548 unidades.
- `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` — **8 testes passaram**. `ResourceWarning` de limpeza do `HTTPError 404` no teste HTTP; o teste terminou `ok`.
- `node .\projeto-dashboard\test_construtor_chart_average.mjs` — **PASS**: média, igualdade inclusiva, filtros, vazio, centavos e contraste das barras.
- `node .\projeto-dashboard\test_dashboard_browser.mjs` — **PASS** no Edge headless; HTTP, métricas, filtros, teclado, contraste de texto e layouts 390/1440 px. Sem erros JS/rede; o 404 automático do favicon foi ignorado pelo teste.
- `node .\projeto-dashboard\test_tester_rodada05.mjs` — **PASS** no Edge; cores independentes em estado inicial, filtros isolados/combinados e limpar; legendas e responsividade.
- Servidor documentado `.\.venv\Scripts\python.exe -m http.server 8000 --directory .\projeto-dashboard\site` — verificado por HTTP; resposta 200 com a página inicial correta. Processo local encerrado após a verificação.
- Cálculo de contraste WCAG sobre estilos CSS computados diretamente dos valores documentados: `.intro` 9,41:1/10,91:1; cor herdada do body 15,64:1.

## Encaminhamento e status

**APROVADO — etapa do Construtor somente.** Entrego a versão para o Tester verificar o tema escuro/rosa e os comandos com `.venv`; após o teste, encaminhar ao Revisor. Não atualizei `FINAL.md` e não declaro aprovação conjunta/final.
