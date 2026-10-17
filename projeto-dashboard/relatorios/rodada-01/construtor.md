# Relatório do Construtor — rodada 01

## Versão examinada

Sem commit: o workspace não é um repositório Git. Hashes SHA-256 dos arquivos da entrega:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/preparar_dados.py` | `E558A221D588F5DF950FDB59851C75EAD707CDABE9DDA4E7D3A632FD5ABC43E2` |
| `projeto-dashboard/test_preparar_dados.py` | `59A5AE8CA4EFC487C565E96EDC2C25EDB4E7D934FD806D2E7666DF62187AEF4F` |
| `projeto-dashboard/README.md` | `8B20E77CC207F20F13EBB44C7A003136B59E8B8B3B25128827C6A346D6901475` |
| `projeto-dashboard/site/index.html` | `E8CD536B90087FDBAF40BD25E43B58D129977555AA5A9CC7696C34AC6C1B0D37` |
| `projeto-dashboard/site/app.js` | `EDA8DDB13743F46CEFFEAF6EEB9260A49C151C4BC4E87067E8A2676B45AE4856` |
| `projeto-dashboard/site/styles.css` | `FC2757C8E0F7E9E1C7ED5F46A9463B8B91CFF611C8F9E0FFB39D151E7F1FC42E` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |

Hashes da origem e dos arquivos que deveriam permanecer intactos, conferidos antes e depois da preparação:

| Arquivo | SHA-256 |
| --- | --- |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |

Comando usado para conferir hashes: `Get-FileHash <arquivos> -Algorithm SHA256`.

## Construção e análise

- Conferi a entrega que já existia em `projeto-dashboard/`, preservei os arquivos de origem/resumo/verificação e completei a preparação para também imprimir uma análise reproduzível com pandas.
- `preparar_dados.py` valida cabeçalhos e ordem das colunas, ausência de nulos/texto vazio, tipos, quantidades positivas inteiras, valores não negativos, data ISO, unicidade de `id_venda` e a igualdade monetária arredondada a centavos entre `valor_venda` e `quantidade × preco_unitario`. A exportação para `site/dados.json` preserva todas as colunas e linhas; este script não exclui nem deduplica registros.
- Cada linha recebida representa uma venda, e `id_venda` é único. `quantidade` mede unidades, não vendas. O valor bruto é a soma de `valor_venda`; ticket médio é bruto dividido pela contagem de IDs. Nenhum dos dois mede lucro.
- Análise reproduzida: 180 vendas entre 2026-01-01 e 2026-03-31; valor bruto de R$ 20.059,00; ticket médio de R$ 111,44; 548 unidades. Por categoria: Acessórios — 65 vendas, R$ 10.517,00, 196 unidades; Livros — 54, R$ 7.438,00, 161; Papelaria — 61, R$ 2.104,00, 191. Por cidade: Campinas — 70 vendas, R$ 8.578,00, 205 unidades; Santos — 60, R$ 6.937,50, 191; Sorocaba — 50, R$ 4.543,50, 152.
- O site estático responsivo contém os três KPIs de vendas, gráficos de valor por categoria e cidade, tabela de vendas, filtros combináveis por cidade/categoria, botão para limpar filtros e estado vazio. Os KPIs, gráficos e tabela são atualizados conjuntamente; valores monetários são formatados em BRL. `site/` é a pasta publicável.
- Limitações: a análise descreve somente os registros fornecidos para o primeiro trimestre de 2026. Não há custos, despesas, margens ou estoque para calcular lucro; não se inferem causas nem vendas fora do período. A preparação valida a base já limpa, mas não reconstitui nem confirma operações de limpeza anteriores.

## Comandos executados e evidências

Ambiente: `py` usa Python 3.14.7; pandas 3.0.6. `.venv` não está disponível.

- `py .\projeto-dashboard\preparar_dados.py` — concluído; validou e exportou 180 vendas para `projeto-dashboard/site/dados.json`, imprimindo os totais e agrupamentos acima.
- `py -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` — concluído; 2 testes passaram, cobrindo a base/agrupamentos e um exemplo pequeno conhecido com exportação determinística.
- `Get-FileHash papelaria_limpa.csv,resumo.md,verificacao.md -Algorithm SHA256` — hashes iguais antes/depois.
- Skills `.agents/skills/explore-data/SKILL.md`, `.agents/skills/data-visualization/SKILL.md` e `.agents/skills/validate-data/SKILL.md`: ausentes; não foram utilizadas.

Não executei o servidor HTTP nem teste de navegador/interação visual. A abertura por HTTP está documentada no README; a verificação de carregamento e interação permanece pendente, assim como revisão independente. Não há aprovação de Tester/Revisor registrada aqui.

## Status

**APROVADO — etapa do Construtor apenas.** A implementação e os testes locais desta etapa foram concluídos. Isso não é aprovação independente nem status final conjunto do projeto; a verificação no navegador e as etapas de Tester/Revisor permanecem pendentes.
