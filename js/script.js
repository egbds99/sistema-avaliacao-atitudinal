// Lista de estudantes de demonstração
const estudantes = [
    "Estudante de demonstração 1",
    "Estudante de demonstração 2",
    "Estudante de demonstração 3",
    "Estudante de demonstração 4",
    "Estudante de demonstração 5"
];

// Localiza o campo de seleção de estudantes
const campoEstudante = document.getElementById("estudante");

// Adiciona os estudantes ao campo de seleção
estudantes.forEach(function(estudante) {

    const opcao = document.createElement("option");

    opcao.value = estudante;
    opcao.textContent = estudante;

    campoEstudante.appendChild(opcao);

});

// Localiza os elementos do formulário
const formulario = document.getElementById("formulario-registro");

const mensagemSucesso = document.getElementById("mensagem-sucesso");

const listaRegistros = document.getElementById("lista-registros");

// Recupera os registros armazenados no navegador
let registros = JSON.parse(
    localStorage.getItem("registrosAtitudinais")
) || [];

// Função responsável por apresentar o histórico
function exibirRegistros() {

    // Limpa o conteúdo atual da lista
    listaRegistros.innerHTML = "";

    // Verifica se existem registros
    if (registros.length === 0) {

        const mensagem = document.createElement("p");

        mensagem.textContent =
            "Nenhuma observação registrada até o momento.";

        mensagem.classList.add("historico-vazio");

        listaRegistros.appendChild(mensagem);

        return;
    }

    // Percorre todos os registros armazenados
    registros.forEach(function(registro) {

        // Cria um cartão para cada registro
        const cartao = document.createElement("div");

        cartao.classList.add("registro-card");

        // Cria os elementos de informação
        const estudante = document.createElement("h3");

        estudante.textContent = registro.estudante;

        const dimensao = document.createElement("p");

        dimensao.textContent =
            "Dimensão: " + registro.dimensao;

        const tipo = document.createElement("p");

        tipo.textContent =
            "Tipo: " + registro.tipo;

        const observacao = document.createElement("p");

        observacao.textContent =
            "Observação: " +
            (registro.observacao || "Não informada.");

        const data = document.createElement("small");

        data.textContent = "Data: " + registro.data;

        // Adiciona as informações ao cartão
        cartao.appendChild(estudante);
        cartao.appendChild(dimensao);
        cartao.appendChild(tipo);
        cartao.appendChild(observacao);
        cartao.appendChild(data);

        // Adiciona o cartão ao histórico
        listaRegistros.appendChild(cartao);

    });

}

// Apresenta os registros existentes ao abrir a página
exibirRegistros();

// Captura o envio do formulário
formulario.addEventListener("submit", function(event) {

    // Impede o recarregamento da página
    event.preventDefault();

    // Captura os valores preenchidos
    const estudante = campoEstudante.value;

    const dimensao = document.getElementById("dimensao").value;

    const tipo = document.getElementById("tipo").value;

    const observacao =
        document.getElementById("observacao").value.trim();

    // Organiza os dados em um objeto
    const registro = {
        estudante: estudante,
        dimensao: dimensao,
        tipo: tipo,
        observacao: observacao,
        data: new Date().toLocaleString("pt-BR")
    };

    // Adiciona o novo registro à lista
    registros.push(registro);

    // Salva a lista atualizada no navegador
    localStorage.setItem(
        "registrosAtitudinais",
        JSON.stringify(registros)
    );

    // Apresenta a mensagem de confirmação
    mensagemSucesso.textContent =
        "Observação registrada e armazenada com sucesso!";

    mensagemSucesso.hidden = false;

    // Atualiza o histórico na tela
    exibirRegistros();

    // Limpa os campos do formulário
    formulario.reset();

});