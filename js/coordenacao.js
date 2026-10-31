// ==========================================
// 1. RECUPERAÇÃO DOS REGISTROS
// ==========================================

// Recupera os dados armazenados pelo professor
let registros = JSON.parse(
    localStorage.getItem("registrosAtitudinais")
) || [];


// ==========================================
// 2. LOCALIZAÇÃO DOS ELEMENTOS HTML
// ==========================================

// Indicadores
const totalRegistros = document.getElementById("total-registros");
const totalPositivas = document.getElementById("total-positivas");
const totalNegativas = document.getElementById("total-negativas");
const totalNeutras = document.getElementById("total-neutras");

// Filtros
const filtroEstudante = document.getElementById("filtro-estudante");
const filtroDimensao = document.getElementById("filtro-dimensao");
const filtroTipo = document.getElementById("filtro-tipo");

// Outros elementos
const listaCoordenacao = document.getElementById("lista-coordenacao");
const quantidadeFiltrada = document.getElementById("quantidade-filtrada");
const botaoLimparFiltros = document.getElementById("limpar-filtros");


// ==========================================
// 3. TRADUÇÃO DOS VALORES PARA EXIBIÇÃO
// ==========================================

function obterNomeDimensao(dimensao) {

    const dimensoes = {
        responsabilidade: "Responsabilidade",
        colaboracao: "Colaboração",
        autonomia: "Autonomia",
        participacao: "Participação",
        respeito: "Respeito e convivência"
    };

    return dimensoes[dimensao] || dimensao;
}


function obterNomeTipo(tipo) {

    const tipos = {
        positiva: "Positiva",
        negativa: "Negativa",
        neutra: "Neutra"
    };

    return tipos[tipo] || tipo;
}


// ==========================================
// 4. PREENCHIMENTO DO FILTRO DE ESTUDANTES
// ==========================================

function carregarEstudantes() {

    // Obtém os nomes dos estudantes sem repetições
    const estudantes = [
        ...new Set(registros.map(function(registro) {
            return registro.estudante;
        }))
    ];

    // Organiza os nomes em ordem alfabética
    estudantes.sort();

    // Adiciona cada estudante ao filtro
    estudantes.forEach(function(estudante) {

        const opcao = document.createElement("option");

        opcao.value = estudante;
        opcao.textContent = estudante;

        filtroEstudante.appendChild(opcao);

    });

}


// ==========================================
// 5. ATUALIZAÇÃO DOS INDICADORES
// ==========================================

function atualizarIndicadores() {

    // Quantidade total de registros
    totalRegistros.textContent = registros.length;

    // Quantidade de observações positivas
    const positivas = registros.filter(function(registro) {
        return registro.tipo === "positiva";
    });

    totalPositivas.textContent = positivas.length;

    // Quantidade de observações negativas
    const negativas = registros.filter(function(registro) {
        return registro.tipo === "negativa";
    });

    totalNegativas.textContent = negativas.length;

    // Quantidade de observações neutras
    const neutras = registros.filter(function(registro) {
        return registro.tipo === "neutra";
    });

    totalNeutras.textContent = neutras.length;

}


// ==========================================
// 6. FILTRAGEM DOS REGISTROS
// ==========================================

function filtrarRegistros() {

    // Recupera os valores selecionados
    const estudanteSelecionado = filtroEstudante.value;
    const dimensaoSelecionada = filtroDimensao.value;
    const tipoSelecionado = filtroTipo.value;

    // Aplica os filtros aos registros
    const registrosFiltrados = registros.filter(function(registro) {

        const correspondeEstudante =
            estudanteSelecionado === "" ||
            registro.estudante === estudanteSelecionado;

        const correspondeDimensao =
            dimensaoSelecionada === "" ||
            registro.dimensao === dimensaoSelecionada;

        const correspondeTipo =
            tipoSelecionado === "" ||
            registro.tipo === tipoSelecionado;

        // O registro precisa atender a todos os filtros selecionados
        return correspondeEstudante &&
            correspondeDimensao &&
            correspondeTipo;

    });

    return registrosFiltrados;

}


// ==========================================
// 7. EXIBIÇÃO DOS REGISTROS
// ==========================================

function exibirRegistros() {

    // Limpa a lista antes de apresentar os resultados
    listaCoordenacao.innerHTML = "";

    // Obtém os registros filtrados
    const registrosFiltrados = filtrarRegistros();

    // Atualiza o contador de resultados
    quantidadeFiltrada.textContent =
        registrosFiltrados.length +
        (registrosFiltrados.length === 1 ? " registro" : " registros");

    // Verifica se existem registros
    if (registrosFiltrados.length === 0) {

        const mensagem = document.createElement("p");

        mensagem.textContent =
            "Nenhum registro encontrado para os filtros selecionados.";

        mensagem.classList.add("historico-vazio");

        listaCoordenacao.appendChild(mensagem);

        return;
    }

    // Percorre os registros encontrados
    registrosFiltrados.forEach(function(registro) {

        // Cria o cartão
        const cartao = document.createElement("article");

        cartao.classList.add("registro-card");

        // Nome do estudante
        const estudante = document.createElement("h3");

        estudante.textContent = registro.estudante;

        // Dimensão atitudinal
        const dimensao = document.createElement("p");

        dimensao.textContent =
            "Dimensão: " + obterNomeDimensao(registro.dimensao);

        // Tipo de observação
        const tipo = document.createElement("p");

        tipo.textContent =
            "Tipo: " + obterNomeTipo(registro.tipo);

        // Aplica uma identificação visual ao tipo
        tipo.classList.add("tipo-" + registro.tipo);

        // Observação qualitativa
        const observacao = document.createElement("p");

        observacao.textContent =
            "Observação: " +
            (registro.observacao || "Não informada.");

        // Data do registro
        const data = document.createElement("small");

        data.textContent =
            "Data: " + (registro.data || "Não informada");

        // Adiciona os elementos ao cartão
        cartao.appendChild(estudante);
        cartao.appendChild(dimensao);
        cartao.appendChild(tipo);
        cartao.appendChild(observacao);
        cartao.appendChild(data);

        // Adiciona o cartão à página
        listaCoordenacao.appendChild(cartao);

    });

}


// ==========================================
// 8. LIMPEZA DOS FILTROS
// ==========================================

function limparFiltros() {

    filtroEstudante.value = "";
    filtroDimensao.value = "";
    filtroTipo.value = "";

    exibirRegistros();

}


// ==========================================
// 9. EVENTOS DOS FILTROS
// ==========================================

// Atualiza os resultados quando o estudante mudar
filtroEstudante.addEventListener("change", exibirRegistros);

// Atualiza os resultados quando a dimensão mudar
filtroDimensao.addEventListener("change", exibirRegistros);

// Atualiza os resultados quando o tipo mudar
filtroTipo.addEventListener("change", exibirRegistros);

// Limpa todos os filtros
botaoLimparFiltros.addEventListener("click", limparFiltros);


// ==========================================
// 10. INICIALIZAÇÃO DO PAINEL
// ==========================================

// Carrega os estudantes disponíveis
carregarEstudantes();

// Atualiza os indicadores
atualizarIndicadores();

// Apresenta os registros
exibirRegistros();