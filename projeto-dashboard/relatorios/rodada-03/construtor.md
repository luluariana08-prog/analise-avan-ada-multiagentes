# Relatório do Construtor — rodada 03

## Versão e hashes

Sem commit. SHA-256 dos arquivos relevantes:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/site/styles.css` | `B491020CE091F1A2824FF4440D241321B40654BAEFF6EFA68EC89878B01C3865` |
| `projeto-dashboard/site/dados.json` | `0CC873CE9C6E13A6F9DC1D4653C2EE22B5B444E471B07CEBB98EAAF86A66D694` |
| `projeto-dashboard/preparar_dados.py` (inalterado) | `C6255BEBE174B7F029071F236B730F61538611BD1A970606A40CD07982F212B3` |
| `projeto-dashboard/test_preparar_dados.py` (inalterado) | `A26B96895AEE63731F32660AA049CC97FCD9C05C1C1379C5CD1E641A38F3F64C` |
| `projeto-dashboard/test_tester_independente.py` (inalterado) | `C004E684DBB32C5369DD83A9994DAEDD4BC39A8446B7F46748D73C1FAB7C1CC8` |

Relatórios/testes alheios conferidos sem alterações nesta rodada:

| Arquivo | SHA-256 |
| --- | --- |
| `projeto-dashboard/relatorios/rodada-01/construtor.md` | `E10366ED67E7A15B4C9E8EF791BC47580B4B18EBDA49E372F8A2EF57105B71F8` |
| `projeto-dashboard/relatorios/rodada-01/tester.md` | `C35308AD3A2F87C928F208273963F4145D30FB1517101EC51F9BFAD7091882FA` |
| `projeto-dashboard/relatorios/rodada-01/revisor.md` | `577364884D83D979A5A91DE22C6A776AA7CC6A0E1E65674F2560605201A85EB5` |
| `projeto-dashboard/relatorios/rodada-02/construtor.md` | `68C2150BB1911BD70FD0E33D0BB3364457DEB303FF9313280C6924815E38BE8C` |
| `projeto-dashboard/relatorios/rodada-02/tester.md` | `3039A500449E132A111A46714CD7325B5F150F989E0A49073E1C7158CA92C601` |

Origem/documentos preservados: `papelaria_limpa.csv` `97CB3B3F24BFF88F732A8FB07757EA19C0492ABCFD47999FEB8A88EC7FC27D6E`; `resumo.md` `6EACC775BDDD8B1F6B0D829E548DB15C1EC622A3D1302B4932B5E76C019A6B4B`; `verificacao.md` `8B263E77704C6210D77406E31378AD01DD69D6A62B3435D68D1B3DB211EBA698`.

Hash reproduzível com `Get-FileHash <arquivos> -Algorithm SHA256`.

## Alteração e evidências

- Alterei somente a cor de `th` em `projeto-dashboard/site/styles.css`: de `#728079` para `#5f6e67`. Tamanho, peso e espaçamento tipográfico e o fundo `#f7f8f5` foram mantidos; as demais cores do site não foram alteradas.
- Contraste sRGB calculado pela fórmula de luminância relativa WCAG: `#5f6e67` sobre `#f7f8f5` = **5,035:1**, acima do mínimo AA de 4,5:1 para texto normal. O contraste anterior era 3,879:1.
- `py .\projeto-dashboard\preparar_dados.py` — concluído; exportou 180 vendas para `site/dados.json` (hash acima).
- `py -m unittest discover -s .\projeto-dashboard -p "test_*.py" -v` — **8 testes passaram**. O teste HTTP terminou `ok`, com `ResourceWarning` de limpeza de `HTTPError 404`; testes e relatórios do Tester foram preservados.
- Hashes registrados com PowerShell: `Get-FileHash ... -Algorithm SHA256`.

## Encaminhamento

**Encaminhado ao Tester** para conferência de browser da cor corrigida e registro da rodada-03. A execução Python não substitui essa verificação visual. Não declaro aprovação final nem aprovação conjunta.
