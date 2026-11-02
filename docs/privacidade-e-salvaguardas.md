# Privacidade e Salvaguardas Éticas

## 1. Apresentação

O Sistema Web para Avaliação Atitudinal é um protótipo acadêmico desenvolvido para demonstrar possibilidades de registro, acompanhamento e devolutiva de observações relacionadas às dimensões atitudinais dos estudantes.

A proposta busca apoiar o diálogo entre professores, coordenação, estudantes e responsáveis, contribuindo para o acompanhamento pedagógico e para a reflexão sobre o desenvolvimento dos estudantes.

A avaliação atitudinal não deve ser utilizada como instrumento isolado de julgamento, punição ou classificação dos estudantes.

Este documento apresenta os cuidados éticos considerados no protótipo, suas limitações atuais e as medidas que deverão ser consideradas em uma implementação real.

## 2. Princípios de utilização

A utilização de um sistema de avaliação atitudinal deve considerar os seguintes princípios:

- **Finalidade pedagógica:** os registros devem apoiar o acompanhamento e o desenvolvimento dos estudantes.
- **Contextualização:** as observações devem ser interpretadas considerando as situações em que ocorreram.
- **Continuidade:** o acompanhamento deve considerar diferentes momentos, evitando conclusões baseadas em episódios isolados.
- **Respeito à individualidade:** cada estudante deve ser acompanhado em seu próprio processo de desenvolvimento.
- **Diálogo:** as informações devem favorecer conversas construtivas entre professores, estudantes, responsáveis e coordenação.
- **Não discriminação:** os registros não devem ser utilizados para rotular ou estigmatizar estudantes.
- **Transparência:** os usuários devem compreender a finalidade dos registros e a forma como as informações são apresentadas.

## 3. Dimensões atitudinais

O protótipo considera cinco dimensões:

1. Responsabilidade;
2. Colaboração;
3. Autonomia;
4. Participação;
5. Respeito e convivência.

Essas dimensões representam aspectos que podem ser acompanhados por meio de observações pedagógicas.

Os registros podem ser classificados como positivos, negativos ou neutros, acompanhados de uma observação qualitativa opcional.

Essa classificação representa a natureza da observação registrada, não uma nota ou uma avaliação definitiva da personalidade do estudante.

## 4. Prevenção de rankings e classificações

O sistema não deve produzir rankings de estudantes, classificações comparativas ou um escore único de comportamento.

A quantidade de observações positivas ou negativas não deve ser interpretada isoladamente como medida da qualidade do estudante.

Os indicadores apresentados no painel da coordenação têm finalidade informativa e devem ser analisados em conjunto com as evidências qualitativas e o contexto pedagógico.

Os sinais de atenção apresentados pelo protótipo são indicativos para análise, não diagnósticos ou conclusões automáticas.

## 5. Registros e evidências

Os registros atitudinais devem apresentar informações contextualizadas e relacionadas a situações observáveis.

Recomenda-se:

- Registrar observações no momento da ocorrência ou logo após a atividade;
- Evitar descrições vagas ou julgamentos pessoais;
- Descrever situações concretas;
- Evitar expressões ofensivas, discriminatórias ou estigmatizantes;
- Considerar diferentes contextos e momentos;
- Utilizar devolutivas para orientar o desenvolvimento do estudante.

A observação qualitativa deve contribuir para a compreensão do contexto, sem transformar uma situação pontual em um rótulo permanente.

## 6. Participação dos estudantes e responsáveis

O protótipo prevê funcionalidades de autoavaliação, consulta de devolutivas e manifestação sobre registros.

Esses recursos buscam ampliar a participação dos estudantes e responsáveis no acompanhamento pedagógico.

A possibilidade de manifestação deve ser compreendida como um espaço de diálogo e contextualização.

Uma contestação não deve ser interpretada automaticamente como confirmação ou rejeição da observação original. Sua análise depende de apreciação humana e do contexto apresentado.

## 7. Controle de acesso e perfis

O protótipo apresenta quatro perfis de utilização:

- Professor;
- Coordenação;
- Estudante;
- Responsáveis.

A seleção de perfil existente na aplicação é demonstrativa.

O projeto não possui autenticação real, controle de identidade ou autorização segura no servidor. Portanto, a separação visual das áreas não representa uma garantia efetiva de controle de acesso.

Em uma implementação real, será necessário desenvolver:

- Autenticação individual;
- Autorização baseada em perfil;
- Vínculo seguro entre estudantes e responsáveis;
- Restrição de acesso aos registros conforme a função de cada usuário;
- Proteção das operações de consulta, criação e alteração;
- Mecanismos de recuperação e encerramento seguro de sessões.

## 8. Armazenamento e auditoria no protótipo

O protótipo utiliza o `localStorage` do navegador para armazenar informações demonstrativas.

Esse mecanismo permite testar funcionalidades sem a necessidade de um servidor ou banco de dados.

Entretanto, o armazenamento local apresenta limitações:

- Os dados ficam associados ao navegador utilizado;
- Não existe sincronização automática entre dispositivos;
- Os registros podem ser alterados ou apagados por quem possui acesso ao navegador;
- Não há garantia de integridade ou disponibilidade dos dados;
- Não existe controle de acesso efetivo no servidor.

A aplicação também possui registros de auditoria demonstrativos, que permitem visualizar determinadas ações realizadas nos módulos.

Essa funcionalidade não representa uma trilha de auditoria inviolável. Uma implementação real deverá prever armazenamento centralizado, proteção contra alterações indevidas, identificação confiável dos usuários e mecanismos de monitoramento.

## 9. Privacidade e proteção de dados

Uma implementação real deverá considerar a legislação aplicável à proteção de dados pessoais, especialmente a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).

Antes da utilização com dados reais, será necessário definir e documentar:

- A finalidade do tratamento dos dados;
- Os dados estritamente necessários para cada funcionalidade;
- A base legal aplicável ao tratamento;
- Os responsáveis pelo tratamento;
- As regras de acesso e compartilhamento;
- Os prazos de retenção;
- Os procedimentos de correção e atendimento aos direitos dos titulares;
- As medidas técnicas e administrativas de segurança;
- Os procedimentos para lidar com incidentes de segurança.

Como o sistema envolve informações relacionadas a estudantes, incluindo crianças e adolescentes, sua implementação deverá considerar as disposições legais específicas aplicáveis a esse público e o princípio do melhor interesse.

Este protótipo não realiza uma avaliação jurídica de conformidade e não deve ser utilizado para armazenar dados pessoais reais de estudantes.

## 10. Integração com frequência e desempenho

O documento de referência do projeto prevê a possibilidade de cruzar informações atitudinais com dados de frequência e desempenho escolar.

No protótipo atual, essas informações não são simuladas nem utilizadas para gerar indicadores.

Uma integração futura deverá considerar:

- A finalidade pedagógica do cruzamento;
- A origem e a confiabilidade das informações;
- As permissões de acesso;
- A necessidade de contextualização;
- A prevenção de interpretações automáticas ou discriminatórias.

Qualquer alerta resultante dessa integração deverá servir como apoio à análise humana, e não como decisão automática sobre o estudante.

## 11. Análise por turma

O painel da coordenação apresenta informações gerais e permite consultar registros por estudante, dimensão, tipo e período.

A análise por turma depende da existência de um vínculo entre estudantes e turmas.

Como essa informação ainda não está implementada no modelo atual de registros, o protótipo não atribui estudantes a turmas fictícias nem apresenta indicadores de turma sem dados que sustentem essa associação.

Essa funcionalidade deverá ser desenvolvida após a definição do cadastro e do vínculo dos estudantes com suas respectivas turmas.

## 12. Recomendações para uma implementação futura

Antes da utilização em ambiente escolar real, recomenda-se:

1. Desenvolver backend e banco de dados apropriados;
2. Implementar autenticação e autorização;
3. Definir regras de acesso por perfil;
4. Implementar proteção e criptografia dos dados conforme os riscos identificados;
5. Criar mecanismos confiáveis de auditoria;
6. Definir políticas de retenção e descarte;
7. Documentar os procedimentos de contestação e revisão;
8. Avaliar os riscos de privacidade;
9. Realizar testes de segurança e acessibilidade;
10. Submeter a solução à avaliação dos responsáveis institucionais e jurídicos.

## 13. Considerações finais

A avaliação atitudinal deve ser compreendida como um processo formativo, contextualizado e contínuo.

O sistema tem como finalidade apoiar a observação pedagógica, a comunicação e o acompanhamento do desenvolvimento dos estudantes.

Os registros não devem substituir a análise profissional dos educadores nem ser utilizados isoladamente para produzir julgamentos ou decisões punitivas.

As funcionalidades apresentadas neste projeto constituem um protótipo acadêmico e dependem de evolução técnica, pedagógica e institucional antes de qualquer utilização com dados reais.