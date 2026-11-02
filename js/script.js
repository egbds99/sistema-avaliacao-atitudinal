// ==========================================
// DADOS E ELEMENTOS
// ==========================================

const estudantes = [
    "Estudante de demonstração 1",
    "Estudante de demonstração 2",
    "Estudante de demonstração 3",
    "Estudante de demonstração 4",
    "Estudante de demonstração 5"
];

const nomesDimensoes = {
    responsabilidade: "Responsabilidade",
    colaboracao: "Colaboração",
    autonomia: "Autonomia",
    participacao: "Participação",
    respeito: "Respeito e convivência"
};

const nomesTipos = {
    positiva: "Positiva",
    negativa: "Negativa",
    neutra: "Neutra"
};

const campoProfessor = document.getElementById("professor");
const campoEstudante = document.getElementById("estudante");
const campoDimensao = document.getElementById("dimensao");
const campoTipo = document.getElementById("tipo");
const campoObservacao = document.getElementById("observacao");

const formulario = document.getElementById("formulario-registro");
const mensagemSucesso = document.getElementById("mensagem-sucesso");
const listaRegistros = document.getElementById("lista-registros");

const filtroManifestacoes = document.getElementById("filtro-manifestacoes");
const listaManifestacoes = document.getElementById("lista-manifestacoes-professor");

const formularioDevolutiva = document.getElementById("form-devolutiva");
const estudanteDevolutiva = document.getElementById("estudante-devolutiva");
const textoDevolutiva = document.getElementById("texto-devolutiva");
const mensagemDevolutiva = document.getElementById("mensagem-devolutiva");
const listaDevolutivas = document.getElementById("lista-devolutivas-professor");

const formularioSolicitacao = document.getElementById("form-solicitacao-autoavaliacao");
const estudanteSolicitacao = document.getElementById("estudante-solicitacao");
const textoSolicitacao = document.getElementById("texto-solicitacao");
const mensagemSolicitacao = document.getElementById("mensagem-solicitacao");
const listaSolicitacoes = document.getElementById("lista-solicitacoes-autoavaliacao");

// ==========================================
// ARMAZENAMENTO
// ==========================================

function recuperarDados(chave) {
    try {
        const dados = JSON.parse(localStorage.getItem(chave)) || [];
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.error("Erro ao recuperar dados:", erro);
        return [];
    }
}

function salvarDados(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
        return true;
    } catch (erro) {
        console.error("Erro ao salvar dados:", erro);
        return false;
    }
}

let registros = recuperarDados("registrosAtitudinais");
let contestacoes = recuperarDados("contestacoesAtitudinais");
let devolutivas = recuperarDados("devolutivasAtitudinais");
let solicitacoes = recuperarDados("solicitacoesAutoavaliacaoAtitudinais");

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) {
        classe.split(/\s+/).forEach(function(nomeClasse) {
            elemento.classList.add(nomeClasse);
        });
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}

function mostrarMensagem(elemento, mensagem, sucesso) {
    elemento.textContent = mensagem;

    elemento.classList.remove(
        "mensagem-sucesso",
        "mensagem-erro"
    );

    elemento.classList.add(
        sucesso ? "mensagem-sucesso" : "mensagem-erro"
    );
}

function formatarData() {
    return new Date().toLocaleString("pt-BR");
}

function obterDimensao(valor) {
    return nomesDimensoes[valor] || valor || "Não informada";
}

function obterTipo(valor) {
    return nomesTipos[valor] || valor || "Não informado";
}

function obterProfessorAtual() {
    return campoProfessor.value.trim() || "Professor não identificado";
}

// ==========================================
// IDENTIFICAÇÃO DO PROFESSOR
// ==========================================

// O nome fica disponível durante a sessão atual do navegador.
// Isso evita solicitar a identificação repetidamente nos formulários.

function carregarProfessorDaSessao() {
    const professorSalvo = sessionStorage.getItem("professorAtitudinal");

    if (professorSalvo) {
        campoProfessor.value = professorSalvo;
    }
}

campoProfessor.addEventListener("input", function() {
    sessionStorage.setItem(
        "professorAtitudinal",
        campoProfessor.value.trim()
    );
});

// ==========================================
// AUDITORIA DAS AÇÕES
// ==========================================

function registrarAuditoria(
    acao,
    responsavel,
    estudante,
    detalhes,
    registroRelacionado
) {
    const auditoria = recuperarDados("auditoriaAtitudinal");

    const dataHora = new Date();

    const evento = {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        perfil: "professor",
        modulo: "Área do Professor",
        acao: acao,
        responsavel: responsavel || "Professor não identificado",
        estudante: estudante || "Não aplicável",
        detalhes: detalhes || "",
        registroRelacionado: registroRelacionado || null,
        data: dataHora.toLocaleString("pt-BR"),
        timestamp: dataHora.getTime()
    };

    auditoria.push(evento);

    const salvou = salvarDados("auditoriaAtitudinal", auditoria);

    if (!salvou) {
        console.error("Não foi possível registrar a ação na auditoria.");
        return false;
    }

    return true;
}

// ==========================================
// CARREGAMENTO DOS ESTUDANTES
// ==========================================

function carregarEstudantes() {
    const campos = [
        campoEstudante,
        estudanteDevolutiva,
        filtroManifestacoes,
        estudanteSolicitacao
    ];

    campos.forEach(function(campo) {
        const valorAtual = campo.value;

        campo.innerHTML = "";

        const opcaoInicial = document.createElement("option");
        opcaoInicial.value = "";

        opcaoInicial.textContent =
            campo === filtroManifestacoes ?
            "Todos os estudantes" :
            "Selecione um estudante";

        campo.appendChild(opcaoInicial);

        estudantes.forEach(function(estudante) {
            const opcao = document.createElement("option");

            opcao.value = estudante;
            opcao.textContent = estudante;

            campo.appendChild(opcao);
        });

        campo.value = valorAtual;
    });
}

// ==========================================
// REGISTRO RÁPIDO DE OBSERVAÇÕES
// ==========================================

// O registro é salvo automaticamente quando os três campos
// obrigatórios são selecionados: estudante, dimensão e tipo.
// A observação qualitativa é opcional.

let registroEmProcessamento = false;

function registrarObservacao() {
    if (registroEmProcessamento) {
        return;
    }

    const professor = obterProfessorAtual();
    const estudante = campoEstudante.value;
    const dimensao = campoDimensao.value;
    const tipo = campoTipo.value;
    const observacao = campoObservacao.value.trim();

    if (!professor || professor === "Professor não identificado") {
        mostrarMensagem(
            mensagemSucesso,
            "Informe o nome do professor antes de iniciar os registros.",
            false
        );

        campoProfessor.focus();
        return;
    }

    if (!estudante || !dimensao || !tipo) {
        return;
    }

    registroEmProcessamento = true;

    registros = recuperarDados("registrosAtitudinais");

    const timestamp = Date.now();

    const novoRegistro = {
        id: timestamp.toString(),
        professor: professor,
        estudante: estudante,
        dimensao: dimensao,
        tipo: tipo,
        observacao: observacao,
        data: formatarData(),
        timestamp: timestamp
    };

    registros.push(novoRegistro);

    const salvou = salvarDados(
        "registrosAtitudinais",
        registros
    );

    if (!salvou) {
        registros.pop();

        mostrarMensagem(
            mensagemSucesso,
            "Não foi possível salvar a observação. Verifique o armazenamento do navegador.",
            false
        );

        registroEmProcessamento = false;
        return;
    }

    const auditoriaSalva = registrarAuditoria(
        "Registro de observação atitudinal",
        professor,
        estudante,
        "Dimensão: " + obterDimensao(dimensao) +
        ". Tipo: " + obterTipo(tipo) + ".",
        novoRegistro.id
    );

    // Mantém o nome do professor e limpa os campos do próximo registro.
    campoEstudante.value = "";
    campoDimensao.value = "";
    campoTipo.value = "";
    campoObservacao.value = "";

    if (auditoriaSalva) {
        mostrarMensagem(
            mensagemSucesso,
            "Observação registrada com sucesso! Selecione os três campos para o próximo registro.",
            true
        );
    } else {
        mostrarMensagem(
            mensagemSucesso,
            "Observação salva, mas não foi possível registrar sua auditoria.",
            false
        );
    }

    exibirRegistros();

    registroEmProcessamento = false;
}

// ==========================================
// EXIBIÇÃO DO HISTÓRICO DE OBSERVAÇÕES
// ==========================================

function exibirRegistros() {
    registros = recuperarDados("registrosAtitudinais");

    listaRegistros.innerHTML = "";

    if (registros.length === 0) {
        listaRegistros.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhuma observação registrada."
            )
        );

        return;
    }

    registros.slice().reverse().forEach(function(registro) {
        const cartao = criarElemento("article", "registro-card");

        cartao.appendChild(
            criarElemento("h3", "", registro.estudante)
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Professor responsável: " +
                (registro.professor || "Não identificado")
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Dimensão: " + obterDimensao(registro.dimensao)
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Tipo: " + obterTipo(registro.tipo)
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Observação: " +
                (registro.observacao || "Não informada.")
            )
        );

        cartao.appendChild(
            criarElemento(
                "small",
                "",
                "Data: " + (registro.data || "Não informada")
            )
        );

        listaRegistros.appendChild(cartao);
    });
}

// ==========================================
// CONSULTA DE MANIFESTAÇÕES
// ==========================================

function exibirManifestacoes() {
    contestacoes = recuperarDados("contestacoesAtitudinais");

    listaManifestacoes.innerHTML = "";

    const estudanteFiltro = filtroManifestacoes.value;

    const encontradas = contestacoes.filter(function(item) {
        return !estudanteFiltro ||
            item.estudante === estudanteFiltro;
    }).slice().reverse();

    if (encontradas.length === 0) {
        listaManifestacoes.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhuma manifestação encontrada."
            )
        );

        return;
    }

    encontradas.forEach(function(item) {
        const cartao = criarElemento("article", "registro-card");

        cartao.appendChild(
            criarElemento("h3", "", item.estudante)
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Manifestação registrada por: " +
                (item.perfil === "responsavel" ?
                    "Responsável" :
                    "Estudante")
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Dimensão: " + obterDimensao(item.dimensao)
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Observação relacionada: " +
                (item.observacaoOriginal || "Sem descrição.")
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Manifestação: " + item.manifestacao
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "status-manifestacao",
                "Situação: " + (item.status || "Registrada")
            )
        );

        cartao.appendChild(
            criarElemento(
                "small",
                "",
                "Data: " + (item.data || "Não informada")
            )
        );

        listaManifestacoes.appendChild(cartao);
    });
}

// ==========================================
// REGISTRO DE DEVOLUTIVAS
// ==========================================

function registrarDevolutiva(evento) {
    evento.preventDefault();

    const professor = obterProfessorAtual();
    const estudante = estudanteDevolutiva.value;
    const texto = textoDevolutiva.value.trim();

    if (!professor ||
        professor === "Professor não identificado" ||
        !estudante ||
        !texto
    ) {
        mostrarMensagem(
            mensagemDevolutiva,
            "Informe o nome do professor, selecione o estudante e escreva a devolutiva.",
            false
        );

        return;
    }

    devolutivas = recuperarDados("devolutivasAtitudinais");

    const timestamp = Date.now();

    const novaDevolutiva = {
        id: timestamp.toString(),
        professor: professor,
        estudante: estudante,
        texto: texto,
        data: formatarData(),
        timestamp: timestamp
    };

    devolutivas.push(novaDevolutiva);

    const salvou = salvarDados(
        "devolutivasAtitudinais",
        devolutivas
    );

    if (!salvou) {
        devolutivas.pop();

        mostrarMensagem(
            mensagemDevolutiva,
            "Não foi possível salvar a devolutiva. Verifique o armazenamento do navegador.",
            false
        );

        return;
    }

    const auditoriaSalva = registrarAuditoria(
        "Registro de devolutiva pedagógica",
        professor,
        estudante,
        "Devolutiva pedagógica registrada.",
        novaDevolutiva.id
    );

    formularioDevolutiva.reset();

    if (auditoriaSalva) {
        mostrarMensagem(
            mensagemDevolutiva,
            "Devolutiva registrada com sucesso!",
            true
        );
    } else {
        mostrarMensagem(
            mensagemDevolutiva,
            "Devolutiva salva, mas não foi possível registrar sua auditoria.",
            false
        );
    }

    exibirDevolutivas();
}

// ==========================================
// EXIBIÇÃO DAS DEVOLUTIVAS
// ==========================================

function exibirDevolutivas() {
    devolutivas = recuperarDados("devolutivasAtitudinais");

    listaDevolutivas.innerHTML = "";

    if (devolutivas.length === 0) {
        listaDevolutivas.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhuma devolutiva registrada."
            )
        );

        return;
    }

    devolutivas.slice().reverse().forEach(function(item) {
        const cartao = criarElemento("article", "registro-card");

        cartao.appendChild(
            criarElemento("h3", "", item.estudante)
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Professor responsável: " + (item.professor || "Não informado")
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Devolutiva: " + (item.texto || "Sem conteúdo informado.")
            )
        );

        cartao.appendChild(
            criarElemento(
                "small",
                "",
                "Data: " + (item.data || "Não informada")
            )
        );

        listaDevolutivas.appendChild(cartao);
    });
}

// ==========================================
// SOLICITAÇÃO DE AUTOAVALIAÇÃO
// ==========================================

function solicitarAutoavaliacao(evento) {
    evento.preventDefault();

    const professor = obterProfessorAtual();
    const estudante = estudanteSolicitacao.value;
    const orientacao = textoSolicitacao.value.trim();

    if (!professor ||
        professor === "Professor não identificado" ||
        !estudante
    ) {
        mostrarMensagem(
            mensagemSolicitacao,
            "Informe o professor e selecione o estudante.",
            false
        );

        return;
    }

    solicitacoes = recuperarDados("solicitacoesAutoavaliacaoAtitudinais");

    const timestamp = Date.now();

    const novaSolicitacao = {
        id: timestamp.toString(),
        estudante: estudante,
        professor: professor,
        orientacao: orientacao ||
            "Reflita sobre sua participação e seu desenvolvimento nas dimensões atitudinais.",
        status: "Pendente",
        data: formatarData(),
        timestamp: timestamp
    };

    solicitacoes.push(novaSolicitacao);

    const salvou = salvarDados(
        "solicitacoesAutoavaliacaoAtitudinais",
        solicitacoes
    );

    if (!salvou) {
        solicitacoes.pop();

        mostrarMensagem(
            mensagemSolicitacao,
            "Não foi possível registrar a solicitação.",
            false
        );

        return;
    }

    registrarAuditoria(
        "Solicitação de autoavaliação",
        professor,
        estudante,
        "Professor solicitou uma autoavaliação ao estudante.",
        novaSolicitacao.id
    );

    formularioSolicitacao.reset();

    mostrarMensagem(
        mensagemSolicitacao,
        "Solicitação registrada. Ela ficará disponível na área do estudante.",
        true
    );

    exibirSolicitacoes();
}

function exibirSolicitacoes() {
    solicitacoes = recuperarDados("solicitacoesAutoavaliacaoAtitudinais");

    listaSolicitacoes.innerHTML = "";

    if (solicitacoes.length === 0) {
        listaSolicitacoes.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhuma solicitação de autoavaliação registrada."
            )
        );

        return;
    }

    solicitacoes.slice().reverse().forEach(function(item) {
        const cartao = criarElemento("article", "registro-card");

        cartao.appendChild(
            criarElemento("h3", "", item.estudante)
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Professor responsável: " + (item.professor || "Não informado")
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Orientação: " + (item.orientacao || "Não informada.")
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "status-manifestacao",
                "Situação: " + (item.status || "Pendente")
            )
        );

        cartao.appendChild(
            criarElemento(
                "small",
                "",
                "Data: " + (item.data || "Não informada")
            )
        );

        listaSolicitacoes.appendChild(cartao);
    });
}

// ==========================================
// EVENTOS
// ==========================================

// O registro rápido é concluído ao selecionar o terceiro campo obrigatório.
campoEstudante.addEventListener("change", registrarObservacao);
campoDimensao.addEventListener("change", registrarObservacao);
campoTipo.addEventListener("change", registrarObservacao);

// Permite que o formulário também seja enviado pelo teclado.
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    registrarObservacao();
});

filtroManifestacoes.addEventListener("change", function() {
    exibirManifestacoes();

    registrarAuditoria(
        "Consulta de manifestações",
        obterProfessorAtual(),
        filtroManifestacoes.value || "Todos os estudantes",
        "Consulta ao histórico de manifestações e contestações.",
        null
    );
});

formularioDevolutiva.addEventListener(
    "submit",
    registrarDevolutiva
);

formularioSolicitacao.addEventListener(
    "submit",
    solicitarAutoavaliacao
);

// ==========================================
// ATUALIZAÇÃO ENTRE ABAS
// ==========================================

window.addEventListener("storage", function(evento) {
    if (
        evento.key === "registrosAtitudinais" ||
        evento.key === "contestacoesAtitudinais" ||
        evento.key === "devolutivasAtitudinais" ||
        evento.key === "solicitacoesAutoavaliacaoAtitudinais"
    ) {
        registros = recuperarDados("registrosAtitudinais");
        contestacoes = recuperarDados("contestacoesAtitudinais");
        devolutivas = recuperarDados("devolutivasAtitudinais");
        solicitacoes = recuperarDados("solicitacoesAutoavaliacaoAtitudinais");

        exibirRegistros();
        exibirManifestacoes();
        exibirDevolutivas();
        exibirSolicitacoes();
    }
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================

carregarProfessorDaSessao();
carregarEstudantes();

exibirRegistros();
exibirManifestacoes();
exibirDevolutivas();
exibirSolicitacoes();