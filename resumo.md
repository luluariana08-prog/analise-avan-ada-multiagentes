# Análise e tratamento — vendas_papelaria.csv

## Estrutura e problemas encontrados

- O arquivo original tem **182 linhas de vendas e 8 colunas**. Cada linha representa uma venda; `id_venda` identifica a venda.
- Foram encontradas **2 linhas duplicadas exatas**, correspondentes às repetições de `V0010` e `V0020`. Após removê-las, os 180 IDs restantes são únicos.
- **6 cidades** tinham espaços no início e/ou no fim.
- **3 categorias** estavam como `acessórios` em minúsculas, em vez da forma padronizada `Acessórios`.
- **4 pagamentos** estavam vazios.
- Não foram encontrados valores ausentes nas demais colunas, nem quantidades ou preços negativos/inválidos.
- O período registrado vai de **2026-01-01 a 2026-03-31**.

## Tratamento aplicado

O original foi preservado. Na cópia `papelaria_limpa.csv`:

1. Removi somente as duplicatas de linhas inteiramente idênticas, mantendo a primeira ocorrência.
2. Retirei espaços no início e no fim de `cidade`.
3. Padronizei `categoria` para `Livros`, `Papelaria` e `Acessórios`.
4. Substituí pagamentos vazios por `Não informado`.
5. Calculei `valor_venda` como `quantidade * preco_unitario`.

## Resultado

- Cópia tratada: **180 linhas e 9 colunas** (inclui `valor_venda`).
- Categorias finais: **Livros 54**, **Papelaria 61**, **Acessórios 65**.
- Pagamentos marcados como `Não informado`: **4**.
- Quantidade de vendas: **180** (`id_venda` únicos); soma de `quantidade`: **548 unidades**. São medidas diferentes.
- Soma de `valor_venda`: **R$ 20.059,00**; valores por venda entre **R$ 3,50** e **R$ 475,00**.
- Total vendido por categoria: **Acessórios R$ 10.517,00**, **Livros R$ 7.438,00**, **Papelaria R$ 2.104,00**.
- Total vendido por cidade: **Campinas R$ 8.578,00**, **Santos R$ 6.937,50**, **Sorocaba R$ 4.543,50**.

`Valor vendido` é faturamento bruto calculado pelas linhas; não representa lucro.

O processamento foi feito localmente com `.venv/Scripts/python.exe`, sem integrações com bancos de dados.
