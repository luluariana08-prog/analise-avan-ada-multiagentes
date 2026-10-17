# Revisão independente — rodada 01

## Versão examinada

Sem commit: o workspace não é um repositório Git. SHA-256 dos arquivos relevantes examinados:

| Arquivo | SHA-256 |
| --- | --- |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `projeto-dashboard/preparar_dados.py` | `E558A221D588F5DF950FDB59851C75EAD707CDABE9DDA4E7D3A632FD5ABC43E2` |
| `projeto-dashboard/test_preparar_dados.py` | `59A5AE8CA4EFC487C565E96EDC2C25EDB4E7D934FD806D2E7666DF62187AEF4F` |
| `projeto-dashboard/test_tester_independente.py` | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/test_dashboard_browser.mjs` | `0D6E73A9AB3D0241E022BE83F685BB499712E97ACF5A6B6ADB70050A8F112410` |
| `projeto-dashboard/README.md` | `8B20E77CC207F20F13EBB44C7A003136B59E8B8B3B25128827C6A346D6901475` |
| `projeto-dashboard/site/index.html` | `E8CD536B90087FDBAF40BD25E43B58D129977555AA5A9CC7696C34AC6C1B0D37` |
| `projeto-dashboard/site/app.js` | `EDA8DDB13743F46CEFFEAF6EEB9260A49C151C4BC4E87067E8A2676B45AE4856` |
| `projeto-dashboard/site/styles.css` | `FC2757C8E0F7E9E1C7ED5F46A9463B8B91CFF611C8F9E0FFB39D151E7F1FC42E` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |

Os hashes do produto coincidem com os relatórios do Construtor e Tester. O hash da origem também coincide. Skills indicadas em `AGENTS.MD` não foram usadas; a pasta `.agents` não está presente.

## O que conferi e evidências

- Li `AGENTS.MD`, os relatórios de Construtor e Tester, o código de preparação, os testes, o README, HTML/CSS/JavaScript e JSON. Conferi ainda `resumo.md` e `verificacao.md` para rastrear a definição das vendas e a limpeza anterior.
- `Get-FileHash ... -Algorithm SHA256`: hashes acima; origem preservada em relação aos registros anteriores.
- `.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v`: **7 testes passaram**. A suíte cobre esquema, IDs únicos, ausências, duplicatas rejeitadas de acordo com a regra de preservar e validar a base limpa, cálculo independente com `csv`/`Decimal`, fixture conhecida, exportação e serviço HTTP. Houve `ResourceWarning` relativo ao 404 intencional; o teste terminou `OK`.
- `node .\projeto-dashboard\test_dashboard_browser.mjs`: **PASS** em Microsoft Edge headless real. Reproduzi a execução descrita pelo Tester: 180 linhas, filtros isolados/combinados/vazios/limpar e teclado; KPIs, agrupamentos e tabela conferidos contra recálculo dos dados servidos; sem erros JS nem falhas de recursos da aplicação. Em 390 px: largura de conteúdo 390, filtros/KPIs/gráficos em uma coluna e seletor de 330 px. Em 1440 px: três colunas de KPIs e duas de gráficos. O `/favicon.ico` automático respondeu 404 e foi registrado/excluído pelo teste; não é recurso referenciado pelo dashboard.
- Conferência dos cálculos: os valores descritos nos relatórios conferem com os testes independentes e os dados preparados: 180 vendas, 548 unidades, R$ 20.059,00 bruto e ticket médio de R$ 111,44; totais por categoria e cidade também coincidem. A definição de venda por `id_venda`, distinção entre unidades e vendas e ressalva de que bruto não é lucro estão documentadas.

## Defeitos reproduzidos — encaminhar ao Construtor

1. **A validação aceita valores infinitos, mas a exportação falha depois.** Em `preparar_dados.py`, `pd.to_numeric` aceita `inf`; as verificações de não negatividade e igualdade monetária também o deixam passar (`inf == inf`). Reproduzi com um CSV temporário de uma linha (`quantidade=1`, `preco_unitario=inf`, `valor_venda=inf`): `load_clean_data` retornou a linha aceitando os dois infinitos; `prepare_data` falhou ao serializar com `ValueError: Out of range float values are not JSON compliant: inf`. Isso torna a validação incompleta e produz falha tardia para entrada inválida. Solicitação: rejeitar valores não finitos durante a validação, com mensagem clara, e cobrir `inf` (e, idealmente, `-inf`) em teste. A base atual não contém esses valores; não encontrei divergência nela.

## Pendências de evidência

- A exigência de rótulos legíveis tem evidência parcial: o teste verifica tamanho mínimo de 10 px para rótulo de filtro no celular e inspeciona layout, mas não verifica tamanho/contraste dos rótulos e valores dos gráficos e da tabela, nem registra inspeção visual desses textos. O CSS define valores de gráfico de 10 px em tela estreita. Não reproduzi ilegibilidade, mas a legibilidade integral não está demonstrada; Tester deve acrescentar/verificar essa evidência.
- Não executei navegador com leitor de tela/tecnologia assistiva. O teste comprova foco e operação por teclado dos filtros nativos; não certifica acessibilidade além desses critérios.

## Status

**REPROVADO — revisão independente.** Há defeito reproduzível no validador e pendência de evidência de legibilidade dos rótulos. Este status é apenas do Revisor; não constitui aprovação conjunta nem status final do projeto.
