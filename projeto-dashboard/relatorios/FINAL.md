# Relatório final — dashboard da papelaria

## Versão e status conjunto

Versão de código da rodada 09, identificada pelos hashes nos relatórios da rodada. Construtor, Tester e Revisor aprovaram suas etapas para essa mesma versão.

**APROVADO.** Os relatórios independentes de Construtor, Tester e Revisor concordam. Os históricos das rodadas 01–09 estão preservados.

## Entrega

- Dashboard estático responsivo em `projeto-dashboard/site/`, publicável como hospedagem estática. Fundo global `#65000B`; banner e painéis em tons de rosa.
- Usa `papelaria_limpa.csv`, preservado; a preparação valida e exporta os dados para `site/dados.json`.
- Indicadores: valor vendido bruto, número de vendas (IDs únicos) e ticket médio; inclui gráficos por categoria e cidade, tabela, filtros combináveis por cidade/categoria, estado vazio e botão para limpar filtros. As barras ficam rosa quando o total do grupo é igual ou superior à média visível e pretas quando abaixo; as cores são recalculadas após os filtros.
- Cada linha representa uma venda. A base tem 180 vendas e 548 unidades; valor vendido bruto de R$ 20.059,00 e ticket médio de R$ 111,44 no período de 1º de janeiro a 31 de março de 2026. Valor bruto não é lucro.
- Os relatórios documentam regras, limitações e evidências. Skills disponíveis em `.opencode/skills/` foram preservadas para publicação; a atividade anterior declarou quais skills não foram utilizadas.

## Verificações finais

Conforme os relatórios das rodadas 08 e 09:

- Preparação reproduzida; dados exportados e hash do JSON igual ao artefato do site.
- **8 testes Python passaram**, incluindo recálculo independente, exemplo conhecido, validação dos dados, quatro casos `inf`/`-inf` e HTTP.
- Os três testes Node passaram: teste da regra de média/contraste, teste no Edge e teste independente das barras com filtros.
- Teste automatizado no Microsoft Edge headless passou: carregamento HTTP, cálculos/indicadores/gráficos/tabela, filtros (isolados, combinados, sem resultados e limpar), teclado e telas de 390 px e 1440 px.
- Contraste WCAG 2.2 AA 1.4.3 passou para banner, painéis e KPIs; a menor razão medida foi **4,87:1** nas notas do KPI rosa.
- Os comandos documentados para preparar, testar e servir localmente foram executados. O `ResourceWarning` observado relaciona-se ao 404 intencional do teste HTTP e não impediu a suíte de passar; a requisição automática do Edge a `/favicon.ico` também não é recurso referenciado pelo dashboard.

## Como abrir

Na raiz do workspace, no PowerShell:

```powershell
py -m http.server 8000 --directory .\projeto-dashboard\site
```

Abra <http://localhost:8000/>. Para preparação e todos os testes Python/Node, consulte `projeto-dashboard/README.md`.

## Ressalva de rastreabilidade

Os hashes de `papelaria_limpa.csv`, `resumo.md` e `verificacao.md` foram conferidos contra registros anteriores. O hash de `vendas_papelaria.csv` só foi registrado a partir da revisão da rodada 03; portanto, não há comparação hash-a-hash documentada desde o início da rodada 01. O CSV original permaneceu fora do escopo de edição. As skills `explore-data`, `data-visualization` e `validate-data` não estavam disponíveis e não foram usadas. A publicação em hospedagem não foi realizada. Próximo passo para retirar o bloqueio: executar a revisão independente da rodada 09 quando a ferramenta estiver disponível.
