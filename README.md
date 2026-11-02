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