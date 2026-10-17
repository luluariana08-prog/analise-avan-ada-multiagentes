# Verificação da análise de vendas da papelaria

## Escopo e método

Conferi localmente `vendas_papelaria.csv`, `papelaria_limpa.csv`, `resumo.md` e `graficos.py`. Usei `.venv/Scripts/python.exe` com pandas para recalcular os valores a partir dos dados, sem banco de dados ou integração externa. Reexecutei `graficos.py`.

## Contagens e cálculo independente

- CSV original: **182 linhas de dados, 8 colunas**; **2** linhas duplicadas exatas.
- Cópia limpa: **180 linhas, 9 colunas**; **180 `id_venda` únicos**.
- Portanto, contei **180 vendas** (uma por linha/ID após deduplicação). A soma da coluna `quantidade` é **548 unidades**; não confundir unidades com número de vendas.
- Recalculei `quantidade * preco_unitario` em cada linha: todos os valores conferem com `valor_venda`.
- Total geral por soma da coluna `valor_venda`: **R$ 20.059,00**. Recalculando diretamente quantidade × preço: **R$ 20.059,00**.

## Reconciliação dos agrupamentos

| Categoria | Valor vendido |
|---|---:|
| Acessórios | R$ 10.517,00 |
| Livros | R$ 7.438,00 |
| Papelaria | R$ 2.104,00 |
| **Soma das categorias** | **R$ 20.059,00** |

A soma por categoria coincide com o total geral. Conferi também que a soma por cidade coincide:

| Cidade | Valor vendido |
|---|---:|
| Campinas | R$ 8.578,00 |
| Santos | R$ 6.937,50 |
| Sorocaba | R$ 4.543,50 |
| **Soma das cidades** | **R$ 20.059,00** |

## Cópia limpa e gráficos

- Reproduzi a transformação a partir do CSV original (remoção das duplicatas exatas, espaços das cidades, normalização das categorias, preenchimento do pagamento vazio e cálculo de `valor_venda`); os campos e valores conferidos coincidem com `papelaria_limpa.csv`.
- `graficos.py` constrói o caminho para `papelaria_limpa.csv` a partir da pasta do próprio script e agrupa `valor_venda` por categoria e cidade. O script foi executado e exibiu os mesmos totais acima.
- Os gráficos têm títulos e rótulos em português, formatação monetária em reais e eixo das barras com limite inferior zero (`bottom=0`).

## Conclusão revisada

Não encontrei divergências nos totais, na soma por categoria/cidade ou na base usada pelo código dos gráficos. Atualizei `resumo.md` para distinguir **180 vendas** de **548 unidades** e registrar os totais por categoria e cidade. Os valores são **valor vendido/faturamento bruto**, não lucro; custos e despesas não foram analisados.
