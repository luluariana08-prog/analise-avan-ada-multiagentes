# Dashboard de vendas da papelaria

Análise local em Python/pandas e dashboard estático responsivo. A origem é `../papelaria_limpa.csv`; a preparação valida essa base e gera `site/dados.json`, sem alterar o CSV.

## Preparar e testar (Windows / PowerShell)

Na raiz do workspace, use `.venv\Scripts\python.exe` (o mesmo interpretador definido pelo harness). Se `.venv` ainda não existir, no VS Code abra `Ctrl+Shift+P` → **Python: Create Environment** → **Venv**, selecione um CPython instalado e crie `.venv` na raiz. Não use o launcher `py`, que falha neste Windows. Instale pandas no ambiente:

```powershell
.\.venv\Scripts\python.exe -m pip install pandas
```

Com `.venv` pronto e pandas instalado, na raiz do workspace execute a preparação e a suíte Python:

```powershell
.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py
.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v
```

A preparação valida a base com pandas, imprime indicadores/agrupamentos e regenera os dados estáticos. A suíte executa os testes Python do projeto.

### Testes automatizados JavaScript e navegador

Os três comandos Node abaixo são adicionais à suíte Python. Todos exigem Node.js 22 ou mais recente. `test_construtor_chart_average.mjs` roda só com Node. Os testes `test_dashboard_browser.mjs` e `test_tester_rodada05.mjs` também exigem Microsoft Edge em um caminho padrão do Windows (`%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe` ou `%ProgramFiles%\Microsoft\Edge\Application\msedge.exe`) e `.venv\Scripts\python.exe` com pandas: eles usam esse Python especificado pelo harness para iniciar o servidor HTTP local. Para criar o ambiente, siga o setup acima.

Na raiz do workspace, execute os testes:

```powershell
node .\projeto-dashboard\test_construtor_chart_average.mjs
node .\projeto-dashboard\test_dashboard_browser.mjs
node .\projeto-dashboard\test_tester_rodada05.mjs
```

- O teste do Construtor verifica média inclusiva, recálculo após filtros, lista vazia e contraste das cores das barras. O teste browser verifica carregamento HTTP, KPIs, gráficos, tabela, filtros, teclado, telas de 390 px e 1440 px, erros de JavaScript/rede e contraste de texto WCAG AA. O teste independente do Tester calcula as médias a partir do JSON servido e compara classificações, cores renderizadas, legendas, filtros e responsividade no Edge.
- `PASS` ou código de saída zero indica sucesso; `FAIL`, `Browser test failed` ou código diferente de zero indica falha. Confira a mensagem do terminal para identificar pré-requisito ausente ou asserção não atendida. Esses testes Node não substituem a suíte Python.

## Abrir localmente por HTTP

Com `.venv` pronto, na pasta raiz inicie o servidor HTTP simples:

```powershell
.\.venv\Scripts\python.exe -m http.server 8000 --directory .\projeto-dashboard\site
```

Abra <http://localhost:8000/> no navegador. Para parar o servidor, pressione `Ctrl+C` no terminal. O site usa `fetch` para ler `dados.json`, portanto deve ser aberto por HTTP, não diretamente por `file://`.

## Publicação

`projeto-dashboard/site/` é a pasta publicável em hospedagem estática. Gere `dados.json` antes de publicar; não é necessário servidor de aplicação, banco de dados ou dependência de terceiros no navegador. A publicação em si não faz parte desta entrega.

## Como interpretar

- Cada linha de `papelaria_limpa.csv` representa uma venda identificada por `id_venda`; a base tem um ID por linha. Este projeto não exclui nem deduplica linhas: valida IDs únicos e preserva os registros recebidos. A quantidade de vendas é a contagem de IDs, enquanto `quantidade` representa unidades vendidas.
- Valor vendido bruto é a soma de `valor_venda` (`quantidade × preco_unitario`); ticket médio é valor bruto dividido pelo número de vendas filtradas. Não são medidas de lucro.
- A preparação usa pandas para recalcular o resumo sem filtros (período, vendas, bruto, ticket, unidades e agrupamentos de cidade/categoria); no dashboard, os mesmos indicadores e gráficos são recalculados para os filtros escolhidos.
- Os filtros de cidade e categoria atuam juntos sobre os três indicadores, os dois gráficos e a tabela.
- A análise descreve somente as vendas registradas de 1º de janeiro a 31 de março de 2026. Custos, despesas, margens e estoque não estão disponíveis; pagamento `Não informado` continua como tal. Não se inferem vendas fora do período nem causas para os padrões observados.
