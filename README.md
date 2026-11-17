# Acompanhamento de RH · Dashboard descritiva

Versão web (HTML, CSS e JavaScript puros, sem build) do painel feito no Power BI Desktop.
Mostra total de colaboradores, gênero, salário por filial / departamento / colaborador e faltas por filial, com filtros.

## Estrutura
- `index.html`: página do painel
- `style.css`: visual (azul e amarelo, como o relatório no Power BI)
- `app.js`: filtros e gráficos
- `data.js`: dados da tabela `tb_rh` (hoje, **dados fictícios de exemplo**)
- `fundo.png`: imagem de fundo original do relatório (referência)
- `vercel.json`: configuração do Vercel

## Usar os dados reais
No Power BI, exporte a tabela `tb_rh` e converta as linhas para o formato de `data.js`
(campos: ID, NOME, SEXO, IDADE, FILIAL, DEPARTAMENTO, SALARIO, CONTRATACOES, FALTAS).

## Publicar no Vercel
1. Crie um repositório no GitHub com o conteúdo desta pasta.
2. No Vercel: Add New → Project → importe o repositório.
3. Framework Preset: **Other**. Deixe Build Command e Output Directory em branco. Deploy.
Depois, preencha `site` e `repo` deste projeto em `src/data/content.json` do portfólio.
