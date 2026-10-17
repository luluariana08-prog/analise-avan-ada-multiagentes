# Relatório do Construtor — rodada 05

## Versão examinada e hashes

Sem commit (workspace sem Git). SHA-256 dos arquivos da implementação desta rodada:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/site/index.html` | `96EAF4698E111B7D02AEE40D3AAA1E0B4411D33C3125D7E40EE77445D95A6192` |
| `projeto-dashboard/site/app.js` | `721F4AE85733884D71279BD875BDE536D18C8858BF70C0D6D72F765CB4146A8E` |
| `projeto-dashboard/site/styles.css` | `5C864687F9B344112C867F3E4426D1F8409C34B99C8A31F3373746C4F457042B` |
| `projeto-dashboard/site/chart-average.mjs` | `083E7EEE9EF5FAF5AD1472FC7A49AACC3F5D1DC9866525A6513B4740A1DD6955` |
| `projeto-dashboard/test_construtor_chart_average.mjs` | `29B89CF88640A93FE0C7E18C3D10A04C0C1FC6AB6F08538E8AE4552AD365E3E3` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |

Comando de hash: `Get-FileHash <arquivos> -Algorithm SHA256`.

Para confirmar a preservação, estes arquivos alheios e históricos foram hash-verificados, sem edição:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `61340A67AB05CF8D3736D7AE0120BCC25D97D6AAECF71D01D9880A244D7B9D13` |
| `projeto-dashboard/README.md` | `09559779D5DA0E70540A8A7EF437DE943A2C3EC8B5A3F52FF4D09425FC8AB236` |
| `projeto-dashboard/relatorios/FINAL.md` | `670A74324D04F47BF2AEE4D30AEBDCCBEA6205BCDB12772F1FD83BC301399AA2` |
| `rodada-01/construtor.md` | `E10366ED67E7A15B4C9E8EF791BC47580B4B18EBDA49E372F8A2EF57105B71F8` |
| `rodada-01/tester.md` | `C35308AD3A2F87C928F208273963F4145D30FB1517101EC51F9BFAD7091882FA` |
| `rodada-01/revisor.md` | `577364884D83D979A5A91DE22C6A776AA7CC6A0E1E65674F2560605201A85EB5` |
| `rodada-02/construtor.md` | `68C2150BB1911BD70FD0E33D0BB3364457DEB303FF9313280C6924815E38BE8C` |
| `rodada-02/tester.md` | `3039A500449E132A111A46714CD7325B5F150F989E0A49073E1C7158CA92C601` |
| `rodada-03/construtor.md` | `744D86251A7AA8FAFCD97A9B45FF19EF4FB7D20E5DD01BF523A67B66975CCE8C` |
| `rodada-03/tester.md` | `238976038EA91BE6DB1CEF1AECF8657C9F0ACFC7A7043C6422801B7CDE104413` |
| `rodada-03/revisor.md` | `D455A7232A235A12D908434FF10432F7E45B8B20AB0BE9CFCAB4C9B69FF3FE3C` |
| `rodada-04/construtor.md` | `077E2AB6C9B22E7F2C94BDDBEE5ABD3AD06CD71ED267819D034EB0BD60EE18C0` |
| `rodada-04/tester.md` | `9126D810D5DCF96F5053E8C85C07B448D0B63807A75EAE93206298D6B5117883` |
| `rodada-04/revisor.md` | `9997A72FCC945D22FDC57A5CF548FABE053731BFC92B5C1E003BB2B2EC2F9F9D` |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |

## Implementação

- Cada gráfico calcula a média aritmética dos totais monetários dos grupos visíveis (categorias ou cidades) após o filtro atual. A classificação ocorre novamente a cada renderização; um grupo com valor `>=` média recebe rosa e os demais recebem preto.
- Sem filtros, a média de totais é R$ 6.686,33 em cada gráfico: categorias Acessórios e Livros e cidades Campinas e Santos ficam rosa; Papelaria e Sorocaba ficam pretas.
- A comparação normaliza os totais para centavos inteiros antes da média, evitando erro de ponto flutuante em valores iguais ao limite. Grupos vazios não dividem por zero.
- Os dois gráficos têm legenda rosa “Acima da média” e preta “Na média ou abaixo”. Uma nota esclarece que valores exatamente iguais à média também ficam rosa, de acordo com a regra `>=`. O formato monetário BRL permanece. A legenda usa flex-wrap para telas estreitas.
- Paleta: rosa `#c2185b`, preto `#18181b`, trilho `#f0f3ef`. Razão de contraste calculada: rosa/trilho **5,25:1**, preto/trilho **15,84:1**.
- Converti `app.js` em módulo para compartilhar `classifyByVisibleMean` com o teste independente do Construtor. Não alterei os testes ou relatórios do Tester/Revisor.

## Comandos e resultados

Ambiente: Python 3.14.7/pandas 3.0.6, Node.js v24.21.0 e Microsoft Edge.

- `py .\projeto-dashboard\preparar_dados.py` — concluído; preparou 180 vendas, valor bruto R$ 20.059,00, ticket médio R$ 111,44 e 548 unidades.
- `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` — **8 testes passaram**. O teste HTTP registrou `ResourceWarning` ao limpar um `HTTPError 404`, mas terminou `ok`. Uma tentativa anterior via alias `py` falhou ao tentar abrir `WindowsApps\py.exe`; a suíte foi executada com sucesso pelo Python do harness.
- `node .\projeto-dashboard\test_construtor_chart_average.mjs` — **PASS** para limite inclusivo, reclassificação após filtro, grupo vazio, grupo único, comparação em centavos e contraste WCAG contra o CSS (rosa 5,25:1 e preto 15,84:1). A primeira execução revelou um valor esperado incorreto na fixture de filtro; corrigi a fixture (sem remover cobertura) e a execução final passou.
- `node .\projeto-dashboard\test_dashboard_browser.mjs` — **PASS** em Edge headless real. Carregamento HTTP, KPIs, gráficos/tabela, filtros isolados/combinados/vazios/limpar, teclado, 390 px/1440 px, contraste de texto e ausência de erros JS/rede passaram. O Edge requisitou `/favicon.ico` (404 automático ignorado pelo teste); recursos do dashboard carregaram.

## Encaminhamento e status

**APROVADO — etapa do Construtor somente.** Encaminho ao Tester para conferir integração, cores e reclassificação nos filtros no navegador; depois ao Revisor para revisão independente da nova versão. Não declaro aprovação conjunta ou final.
