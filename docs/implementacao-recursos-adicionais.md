# Implementação dos recursos adicionais

## Gráfico radar
Disponível nas áreas do estudante e dos responsáveis. Representa contagens absolutas de observações por dimensão, sem atribuir pesos aos tipos e sem produzir nota ou ranking.

## Auditoria
Foi preservada e aproveitada a estrutura de auditoria que já existia nos quatro módulos. Os eventos são armazenados na chave `auditoriaAtitudinal`. A coordenação mantém a consulta filtrável. As novas operações de vínculo de turma, importação acadêmica e alteração de permissões também geram eventos.

## Análise por turma
A coordenação pode associar cada estudante a uma turma. O vínculo é armazenado em `vinculosTurmasAtitudinais`; o filtro da consulta de registros utiliza esse vínculo. Registros novos também guardam a turma vinculada no momento do registro. Registros antigos podem ser filtrados usando o vínculo cadastrado posteriormente.

## Frequência e desempenho
A importação CSV utiliza o cabeçalho `estudante,turma,frequencia,desempenho,periodo`. A frequência deve estar entre 0 e 100. Os dados são armazenados em `dadosAcademicosAtitudinais`, separados das observações. A tabela de consulta apresenta frequência, desempenho, período e quantidade de observações atitudinais do mesmo estudante. Não há integração automática, análise estatística ou geração automática de alertas.

## Controle de acesso
A matriz permite habilitar/desabilitar módulos por perfil e guarda a configuração em `permissoesAtitudinais`. O mecanismo apenas oculta elementos da interface. Não constitui autenticação ou autorização segura, pois o projeto não possui backend. Não utilizar dados pessoais reais.

## Testes técnicos executados
- Verificação sintática dos arquivos JavaScript com `node --check`.
- Verificação dos arquivos HTML para IDs duplicados.
- Verificação dos caminhos dos scripts referenciados pelas páginas.

Os testes acima são verificações estáticas. Recomenda-se ainda executar os roteiros funcionais no navegador, especialmente registro de observação, associação de turma, importação CSV, alteração de permissões e consulta do radar.


## Ajustes complementares — cadastro e vínculo de turmas

- O registro do professor não é mais salvo automaticamente ao selecionar o terceiro campo. O professor confirma a operação pelo botão **Salvar observação**, podendo preencher a observação qualitativa opcional antes da gravação.
- A coordenação dispõe de turmas fictícias iniciais (6º Ano A, 6º Ano B, 7º Ano A, 7º Ano B, 8º Ano A e 9º Ano A) e cinco estudantes demonstrativos já vinculados a algumas delas.
- A coordenação pode cadastrar novas turmas, cadastrar estudantes e opcionalmente atribuir uma turma durante o cadastro. Também pode alterar a turma de um estudante existente.
- A turma atribuída aparece junto ao nome do estudante no seletor da área do professor. Os novos estudantes ficam disponíveis também nos seletores demonstrativos de estudante e responsáveis.
- Os cadastros e vínculos são armazenados no `localStorage` do navegador. Portanto, são dados locais de demonstração, não um cadastro central compartilhado entre computadores.
