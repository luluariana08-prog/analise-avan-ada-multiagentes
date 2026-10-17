# Relatórios e fluxos de trabalho — análise multiagentes

Repositório do projeto de análise de vendas da papelaria. Contém relatórios Markdown, o fluxo de trabalho dos agentes, as skills de análise disponíveis e os arquivos estáticos publicados pelo Render.

## Conteúdo

- `AGENTS.MD`: critérios do projeto, ciclo Construtor → Tester → Revisor, requisitos de teste e relatórios.
- `projeto-dashboard/relatorios/`: histórico dos relatórios Markdown das rodadas 01–09 e relatório final.
- `projeto-dashboard/README.md`: comandos e definições usados na análise original.
- `resumo.md` e `verificacao.md`: resultados e validações da análise anterior.
- `.opencode/skills/`: skills de exploração, visualização e validação de dados.
- `projeto-dashboard/site/`: arquivos estáticos do dashboard; `render.yaml` configura o deploy no Render.

## O que não foi publicado

CSVs originais, imagens, scripts Python, testes, caches e `.venv/` ficam fora do Git. O `dados.json` incluído em `site/` é a cópia preparada necessária para o dashboard público; não contém credenciais. Os relatórios preservam as conclusões e evidências escritas.

## Deploy no Render

O `render.yaml` publica `projeto-dashboard/site/` como um site estático. No Render, crie um Blueprint usando este repositório e aceite o serviço `analise-avan-ada-dashboard`, ou crie um Static Site manualmente com **Publish Directory** `projeto-dashboard/site`. O deploy automático é executado quando novos commits chegam à branch `main`.

## Skills

As pastas de skills seguem o formato OpenCode `SKILL.md`. A skill de validação foi normalizada a partir do arquivo Markdown local que não tinha nome/extensão padronizados. Consulte cada arquivo para instruções e escopo.

## Privacidade

Os relatórios são públicos neste repositório. Revise o conteúdo antes de acrescentar novos documentos e nunca inclua credenciais, tokens ou dados pessoais desnecessários.
