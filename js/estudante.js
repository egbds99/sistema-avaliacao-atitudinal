// ==========================================
// DADOS DE DEMONSTRAÇÃO
// ==========================================

const estudantes = [
    "Estudante de demonstração 1",
    "Estudante de demonstração 2",
    "Estudante de demonstração 3",
    "Estudante de demonstração 4",
    "Estudante de demonstração 5"
];

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

const tipos = {
    positiva: "Positiva",
    negativa: "Negativa",
    neutra: "Neutra"
};

// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const campoEstudante = document.getElementById("estudante");

const resumoDimensoes = document.getElementById("resumo-dimensoes");
const historicoEstudante = document.getElementById("historico-estudante");

const formularioAutoavaliacao = document.getElementById("form-autoavaliacao");
const dimensaoAutoavaliacao = document.getElementById("dimensao-autoavaliacao");
const textoAutoavaliacao = document.getElementById("texto-autoavaliacao");
const mensagemAutoavaliacao = document.getElementById("mensagem-autoavaliacao");
const listaAutoavaliacoes = document.getElementById("lista-autoavaliacoes");

const formularioContestacao = document.getElementById("form-contestacao");
const registroContestacao = document.getElementById("registro-contestacao");
const textoContestacao = document.getElementById("texto-contestacao");
const mensagemContestacao = document.getElementById("mensagem-contestacao");
const listaContestacoes = document.getElementById("lista-contestacoes");

const listaDevolutivas = document.getElementById("devolutivas-estudante");

// ==========================================
// ARMAZENAMENTO
// ==========================================

function recuperarDados(chave) {
    try {
        const dados = JSON.parse(localStorage.getItem(chave)) || [];
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        return [];
    }
}

function salvarDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

let registros = recuperarDados("registrosAtitudinais");
let autoavaliacoes = recuperarDados("autoavaliacoesAtitudinais");
let contestacoes = recuperarDados("contestacoesAtitudinais");

// ==========================================
// AUDITORIA
// ==========================================

function registrarAuditoriaEstudante(acao, estudante, detalhes, registroRelacionado) {
    const auditoria = recuperarDados("auditoriaAtitudinal");

    const evento = {
        id: "auditoria-" + Date.now(),
        perfil: "estudante",
        modulo: "Área do Estudante",
        acao: acao,
        responsavel: "Estudante (identificação demonstrativa)",
        estudante: estudante,
        detalhes: detalhes,
        registroRelacionado: registroRelacionado || "",
        data: new Date().toLocaleString("pt-BR"),
        timestamp: Date.now()
    };

    auditoria.push(evento);
    salvarDados("auditoriaAtitudinal", auditoria);
}

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function obterNomeDimensao(valor) {
    const dimensao = dimensoes.find(function(item) {
        return item.valor === valor;
    });

    return dimensao ? dimensao.nome : valor;
}

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

function obterEstudanteSelecionado() {
    return campoEstudante.value;
}

function formatarData() {
    return new Date().toLocaleString("pt-BR");
}

function mostrarMensagem(elemento, mensagem, sucesso) {
    elemento.textContent = mensagem;

    elemento.classList.remove("mensagem-sucesso", "mensagem-erro");

    elemento.classList.add(
        sucesso ? "mensagem-sucesso" : "mensagem-erro"
    );
}

// ==========================================
// SELEÇÃO DO ESTUDANTE
// ==========================================

estudantes.forEach(function(estudante) {
    const opcao = document.createElement("option");

    opcao.value = estudante;
    opcao.textContent = estudante;

    campoEstudante.appendChild(opcao);
});

// ==========================================
// RESUMO DAS DIMENSÕES
// ==========================================

function criarCartaoDimensao(dimensao, registrosDimensao) {
    const cartao = criarElemento("div", "dimensao-card");

    const titulo = criarElemento("h3", "", dimensao.nome);

    const total = criarElemento(
        "p",
        "dimensao-total",
        registrosDimensao.length + " observação(ões) registrada(s)"
    );

    const positivas = registrosDimensao.filter(function(registro) {
        return registro.tipo === "positiva";
    }).length;

    const negativas = registrosDimensao.filter(function(registro) {
        return registro.tipo === "negativa";
    }).length;

    const neutras = registrosDimensao.filter(function(registro) {
        return registro.tipo === "neutra";
    }).length;

    const informacoes = criarElemento("div", "dimensao-informacoes");

    informacoes.appendChild(
        criarElemento("p", "", "Positivas: " + positivas)
    );

    informacoes.appendChild(
        criarElemento("p", "", "Negativas: " + negativas)
    );

    informacoes.appendChild(
        criarElemento("p", "", "Neutras: " + neutras)
    );

    cartao.append(titulo, total, informacoes);

    return cartao;
}

function exibirResumo(estudanteSelecionado) {
    resumoDimensoes.innerHTML = "";

    dimensoes.forEach(function(dimensao) {
        const registrosDimensao = registros.filter(function(registro) {
            return registro.estudante === estudanteSelecionado &&
                registro.dimensao === dimensao.valor;
        });

        resumoDimensoes.appendChild(
            criarCartaoDimensao(dimensao, registrosDimensao)
        );
    });
}

// ==========================================
// HISTÓRICO DE OBSERVAÇÕES
// ==========================================

function exibirHistorico(estudanteSelecionado) {
    historicoEstudante.innerHTML = "";

    const registrosEstudante = registros
        .filter(function(registro) {
            return registro.estudante === estudanteSelecionado;
        })
        .slice()
        .reverse();

    if (registrosEstudante.length === 0) {
        historicoEstudante.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhuma observação registrada para este estudante."
            )
        );

        return;
    }

    registrosEstudante.forEach(function(registro) {
        const cartao = criarElemento("article", "registro-card");

        const dimensao = criarElemento(
            "h3",
            "",
            obterNomeDimensao(registro.dimensao)
        );

        const tipo = criarElemento(
            "p",
            "tipo-" + registro.tipo,
            "Tipo de observação: " + (tipos[registro.tipo] || registro.tipo)
        );

        const observacao = criarElemento(
            "p",
            "",
            "Observação: " +
            (registro.observacao || "Não foi informada uma descrição.")
        );

        const professor = criarElemento(
            "p",
            "",
            "Professor responsável: " + (registro.professor || "Não informado")
        );

        const data = criarElemento(
            "small",
            "",
            "Data: " + (registro.data || "Não informada")
        );

        cartao.append(dimensao, tipo, observacao, professor, data);

        historicoEstudante.appendChild(cartao);
    });
}

// ==========================================
// AUTOAVALIAÇÃO
// ==========================================

function salvarAutoavaliacao(evento) {
    evento.preventDefault();

    const estudante = obterEstudanteSelecionado();

    if (!estudante) {
        mostrarMensagem(
            mensagemAutoavaliacao,
            "Selecione seu nome antes de registrar uma autoavaliação.",
            false
        );

        return;
    }

    const dimensao = dimensaoAutoavaliacao.value;
    const reflexao = textoAutoavaliacao.value.trim();

    if (!dimensao || !reflexao) {
        mostrarMensagem(
            mensagemAutoavaliacao,
            "Preencha a dimensão e sua reflexão.",
            false
        );

        return;
    }

    autoavaliacoes = recuperarDados("autoavaliacoesAtitudinais");

    const timestamp = Date.now();

    const novaAutoavaliacao = {
        estudante: estudante,
        dimensao: dimensao,
        reflexao: reflexao,
        data: formatarData(),
        timestamp: timestamp
    };

    autoavaliacoes.push(novaAutoavaliacao);

    salvarDados("autoavaliacoesAtitudinais", autoavaliacoes);

    registrarAuditoriaEstudante(
        "Registro de autoavaliação",
        estudante,
        "Autoavaliação registrada na dimensão " +
        obterNomeDimensao(dimensao) + ".",
        String(timestamp)
    );

    formularioAutoavaliacao.reset();

    mostrarMensagem(
        mensagemAutoavaliacao,
        "Autoavaliação registrada com sucesso!",
        true
    );

    exibirAutoavaliacoes(estudante);
}

function exibirAutoavaliacoes(estudanteSelecionado) {
    listaAutoavaliacoes.innerHTML = "";

    autoavaliacoes = recuperarDados("autoavaliacoesAtitudinais");

    const registrosEstudante = autoavaliacoes
        .filter(function(item) {
            return item.estudante === estudanteSelecionado;
        })
        .slice()
        .reverse();

    if (registrosEstudante.length === 0) {
        listaAutoavaliacoes.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhuma autoavaliação registrada."
            )
        );

        return;
    }

    registrosEstudante.forEach(function(item) {
        const cartao = criarElemento("article", "registro-card");

        const titulo = criarElemento(
            "h3",
            "",
            obterNomeDimensao(item.dimensao)
        );

        const reflexao = criarElemento(
            "p",
            "",
            "Minha reflexão: " + item.reflexao
        );

        const data = criarElemento(
            "small",
            "",
            "Data: " + item.data
        );

        cartao.append(titulo, reflexao, data);

        listaAutoavaliacoes.appendChild(cartao);
    });
}

// ==========================================
// DEVOLUTIVAS PEDAGÓGICAS
// ==========================================

function exibirDevolutivas(estudanteSelecionado) {
    listaDevolutivas.innerHTML = "";

    const devolutivas = recuperarDados("devolutivasAtitudinais");

    const devolutivasEstudante = devolutivas
        .filter(function(item) {
            return item.estudante === estudanteSelecionado;
        })
        .slice()
        .reverse();

    if (devolutivasEstudante.length === 0) {
        listaDevolutivas.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhuma devolutiva pedagógica disponível para este estudante."
            )
        );

        return;
    }

    devolutivasEstudante.forEach(function(item) {
        const cartao = criarElemento("article", "registro-card");

        const professor = criarElemento(
            "h3",
            "",
            "Professor responsável: " + (item.professor || "Não informado")
        );

        const texto = criarElemento(
            "p",
            "",
            "Devolutiva: " + (item.texto || "Sem conteúdo informado.")
        );

        const data = criarElemento(
            "small",
            "",
            "Data: " + (item.data || "Não informada")
        );

        cartao.append(professor, texto, data);

        listaDevolutivas.appendChild(cartao);
    });
}

// ==========================================
// DIÁLOGO E CONTESTAÇÃO
// ==========================================

function carregarRegistrosParaContestacao(estudanteSelecionado) {
    registroContestacao.innerHTML = "";

    const opcaoInicial = document.createElement("option");

    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione uma observação";

    registroContestacao.appendChild(opcaoInicial);

    registros.forEach(function(registro, indice) {
        if (registro.estudante !== estudanteSelecionado) {
            return;
        }

        const opcao = document.createElement("option");

        opcao.value = indice;

        const descricao = registro.observacao ?
            registro.observacao :
            "Sem descrição";

        opcao.textContent =
            obterNomeDimensao(registro.dimensao) +
            " - " +
            (tipos[registro.tipo] || registro.tipo) +
            " - " +
            descricao.substring(0, 60);

        registroContestacao.appendChild(opcao);
    });
}

function salvarContestacao(evento) {
    evento.preventDefault();

    const estudante = obterEstudanteSelecionado();

    if (!estudante) {
        mostrarMensagem(
            mensagemContestacao,
            "Selecione seu nome antes de registrar uma manifestação.",
            false
        );

        return;
    }

    const indiceRegistro = registroContestacao.value;
    const manifestacao = textoContestacao.value.trim();

    if (indiceRegistro === "" || !manifestacao) {
        mostrarMensagem(
            mensagemContestacao,
            "Selecione uma observação e escreva sua manifestação.",
            false
        );

        return;
    }

    const registroOriginal = registros[Number(indiceRegistro)];

    if (!registroOriginal || registroOriginal.estudante !== estudante) {
        mostrarMensagem(
            mensagemContestacao,
            "Não foi possível localizar a observação selecionada.",
            false
        );

        return;
    }

    contestacoes = recuperarDados("contestacoesAtitudinais");

    const timestamp = Date.now();

    const novaContestacao = {
        estudante: estudante,
        perfil: "estudante",
        indiceRegistro: Number(indiceRegistro),
        dimensao: registroOriginal.dimensao,
        tipo: registroOriginal.tipo,
        observacaoOriginal: registroOriginal.observacao || "",
        manifestacao: manifestacao,
        data: formatarData(),
        timestamp: timestamp,
        status: "Registrada"
    };

    contestacoes.push(novaContestacao);

    salvarDados("contestacoesAtitudinais", contestacoes);

    registrarAuditoriaEstudante(
        "Registro de manifestação/contestação",
        estudante,
        "Manifestação registrada em relação a uma observação da dimensão " +
        obterNomeDimensao(registroOriginal.dimensao) + ".",
        String(timestamp)
    );

    formularioContestacao.reset();

    mostrarMensagem(
        mensagemContestacao,
        "Manifestação registrada. O registro original foi preservado.",
        true
    );

    exibirContestacoes(estudante);
}

function exibirContestacoes(estudanteSelecionado) {
    listaContestacoes.innerHTML = "";

    contestacoes = recuperarDados("contestacoesAtitudinais");

    const registrosEstudante = contestacoes
        .filter(function(item) {
            return item.estudante === estudanteSelecionado &&
                item.perfil === "estudante";
        })
        .slice()
        .reverse();

    if (registrosEstudante.length === 0) {
        listaContestacoes.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhuma manifestação registrada."
            )
        );

        return;
    }

    registrosEstudante.forEach(function(item) {
        const cartao = criarElemento("article", "registro-card");

        const titulo = criarElemento(
            "h3",
            "",
            obterNomeDimensao(item.dimensao)
        );

        const autor = criarElemento(
            "p",
            "",
            "Manifestação registrada por: Estudante"
        );

        const original = criarElemento(
            "p",
            "",
            "Observação relacionada: " +
            (item.observacaoOriginal || "Sem descrição.")
        );

        const manifestacao = criarElemento(
            "p",
            "",
            "Sua manifestação: " + item.manifestacao
        );

        const status = criarElemento(
            "p",
            "status-manifestacao",
            "Situação: " + item.status
        );

        const data = criarElemento(
            "small",
            "",
            "Data: " + item.data
        );

        cartao.append(titulo, autor, original, manifestacao, status, data);

        listaContestacoes.appendChild(cartao);
    });
}

// ==========================================
// ATUALIZAÇÃO DA PÁGINA
// ==========================================

function atualizarPagina() {
    const estudanteSelecionado = obterEstudanteSelecionado();

    registros = recuperarDados("registrosAtitudinais");
    autoavaliacoes = recuperarDados("autoavaliacoesAtitudinais");
    contestacoes = recuperarDados("contestacoesAtitudinais");

    mensagemAutoavaliacao.textContent = "";
    mensagemContestacao.textContent = "";

    if (!estudanteSelecionado) {
        resumoDimensoes.innerHTML =
            "<p>Selecione seu nome para visualizar suas observações.</p>";

        historicoEstudante.innerHTML =
            '<p class="historico-vazio">Nenhuma observação para exibir.</p>';

        listaAutoavaliacoes.innerHTML =
            '<p class="historico-vazio">Selecione seu nome para consultar suas reflexões.</p>';

        listaContestacoes.innerHTML =
            '<p class="historico-vazio">Selecione seu nome para consultar suas manifestações.</p>';

        listaDevolutivas.innerHTML =
            '<p class="historico-vazio">Selecione seu nome para consultar suas devolutivas.</p>';

        registroContestacao.innerHTML =
            '<option value="">Selecione uma observação</option>';

        return;
    }

    exibirResumo(estudanteSelecionado);
    exibirHistorico(estudanteSelecionado);
    exibirAutoavaliacoes(estudanteSelecionado);
    exibirDevolutivas(estudanteSelecionado);
    carregarRegistrosParaContestacao(estudanteSelecionado);
    exibirContestacoes(estudanteSelecionado);
}

// ==========================================
// EVENTOS
// ==========================================

campoEstudante.addEventListener("change", atualizarPagina);

formularioAutoavaliacao.addEventListener(
    "submit",
    salvarAutoavaliacao
);

formularioContestacao.addEventListener(
    "submit",
    salvarContestacao
);

// Atualiza os dados quando outra página do sistema os modifica.
window.addEventListener("storage", function(evento) {
    if (
        evento.key === "registrosAtitudinais" ||
        evento.key === "autoavaliacoesAtitudinais" ||
        evento.key === "contestacoesAtitudinais" ||
        evento.key === "devolutivasAtitudinais"
    ) {
        atualizarPagina();
    }
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarPagina();