# Sistema Web para Avaliação Atitudinal

## 1. Sobre o projeto

O Sistema Web para Avaliação Atitudinal é um protótipo acadêmico desenvolvido para apoiar o registro, o acompanhamento e a devolutiva de observações relacionadas ao desenvolvimento atitudinal dos estudantes.

A proposta busca oferecer uma ferramenta de apoio ao trabalho pedagógico, permitindo que professores registrem observações, que a coordenação acompanhe informações consolidadas e que estudantes e responsáveis participem do processo de acompanhamento.

O projeto considera a avaliação atitudinal como um processo contínuo e formativo, baseado em observações contextualizadas, e não como uma prova ou classificação isolada.

## 2. Objetivos

### Objetivo geral

Desenvolver um protótipo de sistema web que permita registrar e acompanhar observações atitudinais, favorecendo o diálogo entre professores, coordenação, estudantes e responsáveis.

### Objetivos específicos

- Permitir o registro de observações atitudinais;
- Organizar os registros por estudante e dimensão;
- Diferenciar observações positivas, negativas e neutras;
- Disponibilizar histórico de observações;
- Apresentar indicadores e visualizações para a coordenação;
- Permitir o registro de intervenções pedagógicas;
- Acompanhar observações relacionadas ao clima escolar;
- Disponibilizar devolutivas aos estudantes e responsáveis;
- Permitir a realização de autoavaliações;
- Oferecer espaço para manifestações e contestações;
- Demonstrar registros de auditoria das ações realizadas.

## 3. Dimensões atitudinais

O protótipo considera cinco dimensões:

1. Responsabilidade;
2. Colaboração;
3. Autonomia;
4. Participação;
5. Respeito e convivência.

As observações são classificadas como:

- Positivas;
- Negativas;
- Neutras.

A classificação representa a natureza da observação registrada e não corresponde a uma nota ou escore geral do estudante.

## 4. Perfis de utilização

O sistema apresenta quatro áreas principais.

### Professor

Permite:

- Selecionar estudantes;
- Registrar observações atitudinais;
- Consultar o histórico de registros;
- Registrar devolutivas;
- Consultar manifestações recebidas;
- Solicitar autoavaliações aos estudantes.

### Coordenação

Permite:

- Consultar indicadores gerais;
- Filtrar registros por estudante, dimensão, tipo e período;
- Visualizar a distribuição por dimensão;
- Acompanhar a evolução temporal;
- Consultar sinais de atenção pedagógica;
- Registrar intervenções pedagógicas;
- Registrar observações sobre o clima escolar;
- Consultar o histórico de intervenções;
- Consultar eventos de auditoria.

### Estudante

Permite:

- Consultar informações do próprio acompanhamento;
- Visualizar o histórico de observações;
- Consultar devolutivas;
- Responder solicitações de autoavaliação;
- Registrar autoavaliações;
- Manifestar-se sobre registros.

### Responsáveis

Permite:

- Consultar informações de acompanhamento;
- Visualizar registros e devolutivas;
- Acompanhar solicitações de autoavaliação;
- Consultar informações relacionadas às autoavaliações;
- Registrar manifestações sobre observações.

## 5. Tecnologias utilizadas

O protótipo foi desenvolvido utilizando:

- HTML5;
- CSS3;
- JavaScript;
- LocalStorage do navegador.

Não há backend ou banco de dados remoto nesta versão.

## 6. Estrutura do projeto

```text
sistema-avaliacao-atitudinal/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── script.js
│   ├── coordenacao.js
│   ├── estudante.js
│   └── responsaveis.js
│
├── pages/
│   ├── professor/
│   │   └── registro.html
│   │
│   ├── coordenacao/
│   │   └── painel.html
│   │
│   ├── estudante/
│   │   └── formativa.html
│   │
│   └── responsaveis/
│       └── acompanhamento.html
│
└── docs/
    └── privacidade-e-salvaguardas.md

## 11. Recursos adicionais implementados

### Gráfico radar formativo

As áreas do estudante e dos responsáveis apresentam um gráfico radar com a quantidade de observações em cada uma das cinco dimensões. O gráfico não converte tipos de observação em pontos, não calcula nota geral e não estabelece comparação entre estudantes.

### Auditoria demonstrativa

As ações relevantes realizadas nas áreas de professor, coordenação, estudante e responsáveis são registradas em `auditoriaAtitudinal`, com perfil, ação, responsável, estudante relacionado, detalhes e data/hora. A coordenação pode consultar os eventos na seção de auditoria. Como os dados ficam no `localStorage`, o histórico pode ser alterado ou apagado no navegador e não constitui trilha inviolável.

### Análise por turma

A coordenação pode associar manualmente cada estudante a uma turma e filtrar os registros atitudinais por esse vínculo. Os vínculos ficam em `vinculosTurmasAtitudinais`. Nenhuma turma é presumida para os estudantes já existentes; é necessário cadastrar a associação.

### Frequência e desempenho

A coordenação pode importar um arquivo CSV com as colunas `estudante,turma,frequencia,desempenho,periodo`. Os dados são armazenados separadamente em `dadosAcademicosAtitudinais` e exibidos para consulta conjunta. Um modelo está disponível em `docs/modelo-importacao-dados-academicos.csv`.

A importação não conecta automaticamente o sistema a uma plataforma escolar, não valida a origem institucional e não calcula indicadores combinados nem alertas automáticos. A frequência deve ser informada como percentual entre 0 e 100. O campo desempenho é descritivo e preserva o valor fornecido.

### Permissões por perfil

A coordenação pode habilitar ou desabilitar a exibição de módulos por perfil na matriz de permissões. A configuração é salva em `permissoesAtitudinais`. Trata-se exclusivamente de controle demonstrativo da interface: como o protótipo não possui autenticação, backend ou autorização no servidor, não impede acesso direto a arquivos, scripts ou dados do navegador. Não utilizar dados pessoais reais.

## 12. Execução e validação

Abra `index.html` em um navegador moderno. Para a importação CSV, selecione um arquivo no módulo da coordenação. Use apenas dados fictícios durante os testes. As funcionalidades que dependem de armazenamento utilizam o `localStorage` do navegador e não sincronizam automaticamente entre dispositivos.


## Cadastro demonstrativo de estudantes e turmas

Na área da coordenação, o módulo **Análise por turma e dados acadêmicos** permite atribuir estudantes às turmas, criar novas turmas e cadastrar novos estudantes (com turma inicial opcional). A versão inclui turmas fictícias e cinco estudantes demonstrativos para facilitar os testes. Os estudantes cadastrados ficam disponíveis nos seletores das demais áreas.

Na área do professor, a observação só é salva após clicar em **Salvar observação**. Assim, é possível preencher a observação qualitativa opcional sem que a seleção dos três campos obrigatórios envie o formulário automaticamente.

Esses cadastros também são demonstrativos e ficam armazenados localmente no navegador (`localStorage`).
