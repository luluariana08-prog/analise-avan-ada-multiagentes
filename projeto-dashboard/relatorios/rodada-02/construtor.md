# Relatório do Construtor — rodada 02

## Versão examinada

Sem commit. Hashes SHA-256 da correção, testes e dados preparados:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/preparar_dados.py` | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/test_preparar_dados.py` | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |
| `projeto-dashboard/test_tester_independente.py` (não alterado; incluído na suíte) | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |
| `projeto-dashboard/relatorios/rodada-01/construtor.md` (preservado) | `E10366ED67E7A15B4C9E8EF791BC47580B4B18EBDA49E372F8A2EF57105B71F8` |
| `projeto-dashboard/relatorios/rodada-01/tester.md` (preservado) | `C35308AD3A2F87C928F208273963F4145D30FB1517101EC51F9BFAD7091882FA` |
| `projeto-dashboard/relatorios/rodada-01/revisor.md` (preservado) | `577364884D83D979A5A91DE22C6A776AA7CC6A0E1E65674F2560605201A85EB5` |

Hashes da origem e dos arquivos fora do escopo, conferidos nesta rodada:

| Arquivo | SHA-256 |
| --- | --- |
| `papelaria_limpa.csv` | `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E` |
| `resumo.md` | `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B` |
| `verificacao.md` | `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698` |

Comando para reproduzir a conferência: `Get-FileHash <arquivos> -Algorithm SHA256`.

## Correção

- Após `pd.to_numeric`, `load_clean_data` agora aplica `numpy.isfinite` às colunas `quantidade`, `preco_unitario` e `valor_venda`, antes das comparações de sinal, do cálculo de consistência e da exportação JSON.
- Valores infinitos positivos ou negativos são rejeitados com `ValueError` claro: `Valores numéricos não finitos (inf ou -inf) nas colunas: <colunas>. Informe valores finitos.`
- Acrescentei teste parametrizado para `inf` e `-inf` em `preco_unitario` e `valor_venda` (quatro combinações). Cada caso verifica a mensagem e que nenhum JSON seja criado. A cobertura anterior foi preservada.
- Não alterei relatórios de Tester/Revisor nem arquivos de origem, resumo ou verificação. A rodada-01 do Construtor permanece preservada.

## Comandos executados e evidências

Ambiente: Python 3.14.7 e pandas 3.0.6, via `py`.

- `py -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` — **8 testes passaram**, incluindo os três testes do Construtor, os testes independentes existentes do Tester e teste HTTP estático. O teste HTTP emitiu um `ResourceWarning` de limpeza de `HTTPError 404`, mas terminou `ok`; não alterei o teste alheio.
- `py .\projeto-dashboard\preparar_dados.py` — concluído; validou e exportou 180 vendas. Totais: bruto R$ 20.059,00, ticket médio R$ 111,44, 548 unidades.
- O hash de `site/dados.json` após a preparação corresponde ao hash registrado acima.
- `Get-FileHash papelaria_limpa.csv,resumo.md,verificacao.md -Algorithm SHA256` — hashes registrados acima; arquivos preservados.

## Retorno e status

**APROVADO — correção da etapa do Construtor somente.** Correção e suíte local concluídas. Encaminho esta versão ao Tester para revalidar o defeito reportado e registrar o resultado da rodada-02. Não declaro aprovação independente do Revisor nem aprovação conjunta/final do projeto.
