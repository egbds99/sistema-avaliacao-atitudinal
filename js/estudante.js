// Lista de estudantes de demonstração
// Deve ser igual à utilizada na área do professor
const estudantes = [
    "Estudante de demonstração 1",
    "Estudante de demonstração 2",
    "Estudante de demonstração 3",
    "Estudante de demonstração 4",
    "Estudante de demonstração 5"
];

// Lista das dimensões atitudinais
const dimensoes = [{
        valor: "responsabilidade",
        nome: "Responsabilidade"
    },
    {
        valor: "colaboracao",
        nome: "Colaboração"
    },
    {
        valor: "autonomia",
        nome: "Autonomia"
    },
    {
        valor: "participacao",
        nome: "Participação"
    },
    {
        valor: "respeito",
        nome: "Respeito e convivência"
    }
];

// Localiza os elementos da página
const campoEstudante = document.getElementById("estudante");
const resumoDimensoes = document.getElementById("resumo-dimensoes");
const historicoEstudante = document.getElementById("historico-estudante");

// Recupera os registros armazenados pelo professor
let registros = JSON.parse(
    localStorage.getItem("registrosAtitudinais")
) || [];

// Adiciona os estudantes ao campo de seleção
estudantes.forEach(function(estudante) {
    const opcao = document.createElement("option");

    opcao.value = estudante;
    opcao.textContent = estudante;

    campoEstudante.appendChild(opcao);
});

// Converte o valor da dimensão para seu nome de exibição
function obterNomeDimensao(valor) {
    const dimensao = dimensoes.find(function(item) {
        return item.valor === valor;
    });

    return dimensao ? dimensao.nome : valor;
}

// Cria um cartão com o resumo de uma dimensão
function criarCartaoDimensao(dimensao, registrosDimensao) {
    const cartao = document.createElement("div");
    cartao.classList.add("dimensao-card");

    const titulo = document.createElement("h3");
    titulo.textContent = dimensao.nome;

    const total = document.createElement("p");
    total.classList.add("dimensao-total");
    total.textContent =
        registrosDimensao.length + " observação(ões) registrada(s)";

    const positivas = registrosDimensao.filter(function(registro) {
        return registro.tipo === "positiva";
    }).length;

    const negativas = registrosDimensao.filter(function(registro) {
        return registro.tipo === "negativa";
    }).length;

    const neutras = registrosDimensao.filter(function(registro) {
        return registro.tipo === "neutra";
    }).length;

    const informacoes = document.createElement("div");
    informacoes.classList.add("dimensao-informacoes");

    const textoPositivas = document.createElement("p");
    textoPositivas.textContent = "Positivas: " + positivas;

    const textoNegativas = document.createElement("p");
    textoNegativas.textContent = "Negativas: " + negativas;

    const textoNeutras = document.createElement("p");
    textoNeutras.textContent = "Neutras: " + neutras;

    informacoes.appendChild(textoPositivas);
    informacoes.appendChild(textoNegativas);
    informacoes.appendChild(textoNeutras);

    cartao.appendChild(titulo);
    cartao.appendChild(total);
    cartao.appendChild(informacoes);

    return cartao;
}

// Exibe o resumo das observações por dimensão
function exibirResumo(estudanteSelecionado) {
    resumoDimensoes.innerHTML = "";

    dimensoes.forEach(function(dimensao) {
        const registrosDimensao = registros.filter(function(registro) {
            return registro.estudante === estudanteSelecionado &&
                registro.dimensao === dimensao.valor;
        });

        const cartao = criarCartaoDimensao(
            dimensao,
            registrosDimensao
        );

        resumoDimensoes.appendChild(cartao);
    });
}

// Exibe o histórico individual do estudante
function exibirHistorico(estudanteSelecionado) {
    historicoEstudante.innerHTML = "";

    const registrosEstudante = registros.filter(function(registro) {
        return registro.estudante === estudanteSelecionado;
    });

    // Organiza os registros do mais recente para o mais antigo
    registrosEstudante.reverse();

    if (registrosEstudante.length === 0) {
        const mensagem = document.createElement("p");

        mensagem.textContent =
            "Nenhuma observação registrada para este estudante.";

        mensagem.classList.add("historico-vazio");

        historicoEstudante.appendChild(mensagem);
        return;
    }

    registrosEstudante.forEach(function(registro) {
        const cartao = document.createElement("div");
        cartao.classList.add("registro-card");

        const dimensao = document.createElement("h3");
        dimensao.textContent = obterNomeDimensao(registro.dimensao);

        const tipo = document.createElement("p");
        tipo.textContent = "Tipo de observação: " + registro.tipo;

        const observacao = document.createElement("p");
        observacao.textContent =
            "Observação: " +
            (registro.observacao || "Não foi informada uma descrição.");

        const data = document.createElement("small");
        data.textContent = "Data: " + registro.data;

        cartao.appendChild(dimensao);
        cartao.appendChild(tipo);
        cartao.appendChild(observacao);
        cartao.appendChild(data);

        historicoEstudante.appendChild(cartao);
    });
}

// Atualiza as informações apresentadas na página
function atualizarPagina() {
    const estudanteSelecionado = campoEstudante.value;

    if (!estudanteSelecionado) {
        resumoDimensoes.innerHTML =
            "<p>Selecione seu nome para visualizar suas observações.</p>";

        historicoEstudante.innerHTML =
            '<p class="historico-vazio">Nenhuma observação para exibir.</p>';

        return;
    }

    // Atualiza os registros armazenados
    registros = JSON.parse(
        localStorage.getItem("registrosAtitudinais")
    ) || [];

    exibirResumo(estudanteSelecionado);
    exibirHistorico(estudanteSelecionado);
}

// Atualiza a página quando o estudante é selecionado
campoEstudante.addEventListener("change", atualizarPagina);