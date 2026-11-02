// ==========================================
// DIMENSÕES ATITUDINAIS
// ==========================================

const dimensoesResponsavel = [{
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

const tiposResponsavel = {
    positiva: "Positiva",
    negativa: "Negativa",
    neutra: "Neutra"
};

// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const campoEstudanteResponsavel =
    document.getElementById("estudante-responsavel");

const conteudoAcompanhamento =
    document.getElementById("conteudo-acompanhamento");

const resumoResponsavel =
    document.getElementById("resumo-responsavel");

const historicoResponsavel =
    document.getElementById("historico-responsavel");

const autoavaliacoesResponsavel =
    document.getElementById("autoavaliacoes-responsavel");

const devolutivasResponsavel =
    document.getElementById("devolutivas-responsavel");

const registroResponsavel =
    document.getElementById("registro-responsavel");

const formularioContestacaoResponsavel =
    document.getElementById("form-contestacao-responsavel");

const manifestacaoResponsavel =
    document.getElementById("manifestacao-responsavel");

const mensagemResponsavel =
    document.getElementById("mensagem-responsavel");

const listaManifestacoesResponsavel =
    document.getElementById("lista-manifestacoes-responsavel");

// ==========================================
// RECUPERAÇÃO DOS DADOS
// ==========================================

function recuperarDadosResponsavel(chave) {
    try {
        const dados = JSON.parse(localStorage.getItem(chave)) || [];

        return Array.isArray(dados) ? dados : [];

    } catch (erro) {
        return [];
    }
}

let registrosResponsavel =
    recuperarDadosResponsavel("registrosAtitudinais");

let autoavaliacoesResponsavelDados =
    recuperarDadosResponsavel("autoavaliacoesAtitudinais");

let contestacoesResponsavelDados =
    recuperarDadosResponsavel("contestacoesAtitudinais");

// ==========================================
// AUDITORIA
// ==========================================

function registrarAuditoriaResponsavel(acao, estudante, detalhes, registroRelacionado) {
    const auditoria = recuperarDadosResponsavel("auditoriaAtitudinal");

    const evento = {
        id: "auditoria-" + Date.now(),
        perfil: "responsavel",
        modulo: "Área dos Responsáveis",
        acao: acao,
        responsavel: "Responsável (identificação demonstrativa)",
        estudante: estudante,
        detalhes: detalhes,
        registroRelacionado: registroRelacionado || "",
        data: new Date().toLocaleString("pt-BR"),
        timestamp: Date.now()
    };

    auditoria.push(evento);

    localStorage.setItem(
        "auditoriaAtitudinal",
        JSON.stringify(auditoria)
    );
}

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function criarElementoResponsavel(tag, classe, texto) {

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

function obterNomeDimensaoResponsavel(valor) {

    const dimensao = dimensoesResponsavel.find(function(item) {
        return item.valor === valor;
    });

    return dimensao ? dimensao.nome : valor;
}

function estudanteSelecionadoResponsavel() {
    return campoEstudanteResponsavel.value;
}

function exibirMensagemResponsavel(mensagem, sucesso) {

    mensagemResponsavel.textContent = mensagem;

    mensagemResponsavel.classList.remove(
        "mensagem-sucesso",
        "mensagem-erro"
    );

    mensagemResponsavel.classList.add(
        sucesso ? "mensagem-sucesso" : "mensagem-erro"
    );
}

// ==========================================
// CARREGAMENTO DOS ESTUDANTES
// ==========================================

function carregarEstudantesResponsavel() {

    // Seleção demonstrativa.
    // Em uma aplicação real, os estudantes seriam
    // recuperados a partir do vínculo autenticado.

    const estudantes = [
        "Estudante de demonstração 1",
        "Estudante de demonstração 2",
        "Estudante de demonstração 3",
        "Estudante de demonstração 4",
        "Estudante de demonstração 5"
    ];

    estudantes.forEach(function(estudante) {

        const opcao = document.createElement("option");

        opcao.value = estudante;
        opcao.textContent = estudante;

        campoEstudanteResponsavel.appendChild(opcao);

    });
}

// ==========================================
// RESUMO DAS DIMENSÕES
// ==========================================

function exibirResumoResponsavel(estudante) {

    resumoResponsavel.innerHTML = "";

    dimensoesResponsavel.forEach(function(dimensao) {

        const registrosDimensao = registrosResponsavel.filter(
            function(registro) {
                return registro.estudante === estudante &&
                    registro.dimensao === dimensao.valor;
            }
        );

        const positivas = registrosDimensao.filter(
            registro => registro.tipo === "positiva"
        ).length;

        const negativas = registrosDimensao.filter(
            registro => registro.tipo === "negativa"
        ).length;

        const neutras = registrosDimensao.filter(
            registro => registro.tipo === "neutra"
        ).length;

        const cartao = criarElementoResponsavel(
            "article",
            "dimensao-card"
        );

        const titulo = criarElementoResponsavel(
            "h3",
            "",
            dimensao.nome
        );

        const total = criarElementoResponsavel(
            "p",
            "dimensao-total",
            registrosDimensao.length + " observação(ões)"
        );

        const informacoes = criarElementoResponsavel(
            "div",
            "dimensao-informacoes"
        );

        informacoes.append(
            criarElementoResponsavel("p", "", "Positivas: " + positivas),
            criarElementoResponsavel("p", "", "Negativas: " + negativas),
            criarElementoResponsavel("p", "", "Neutras: " + neutras)
        );

        cartao.append(titulo, total, informacoes);

        resumoResponsavel.appendChild(cartao);

    });

}

// ==========================================
// HISTÓRICO DE OBSERVAÇÕES
// ==========================================

function exibirHistoricoResponsavel(estudante) {

    historicoResponsavel.innerHTML = "";

    const registros = registrosResponsavel
        .filter(function(registro) {
            return registro.estudante === estudante;
        })
        .slice()
        .reverse();

    if (registros.length === 0) {

        historicoResponsavel.appendChild(
            criarElementoResponsavel(
                "p",
                "historico-vazio",
                "Nenhuma observação registrada para este estudante."
            )
        );

        return;
    }

    registros.forEach(function(registro) {

        const cartao = criarElementoResponsavel(
            "article",
            "registro-card"
        );

        const titulo = criarElementoResponsavel(
            "h3",
            "",
            obterNomeDimensaoResponsavel(registro.dimensao)
        );

        const tipo = criarElementoResponsavel(
            "p",
            "tipo-" + registro.tipo,
            "Tipo: " +
            (tiposResponsavel[registro.tipo] || registro.tipo)
        );

        const observacao = criarElementoResponsavel(
            "p",
            "",
            "Observação: " +
            (registro.observacao || "Não informada.")
        );

        const data = criarElementoResponsavel(
            "small",
            "",
            "Data: " + (registro.data || "Não informada")
        );

        cartao.append(titulo, tipo, observacao, data);

        historicoResponsavel.appendChild(cartao);

    });

}

// ==========================================
// AUTOAVALIAÇÕES DO ESTUDANTE
// ==========================================

function exibirAutoavaliacoesResponsavel(estudante) {

    autoavaliacoesResponsavel.innerHTML = "";

    autoavaliacoesResponsavelDados =
        recuperarDadosResponsavel("autoavaliacoesAtitudinais");

    const autoavaliacoes = autoavaliacoesResponsavelDados
        .filter(function(item) {
            return item.estudante === estudante;
        })
        .slice()
        .reverse();

    if (autoavaliacoes.length === 0) {

        autoavaliacoesResponsavel.appendChild(
            criarElementoResponsavel(
                "p",
                "historico-vazio",
                "Nenhuma autoavaliação disponível."
            )
        );

        return;
    }

    autoavaliacoes.forEach(function(item) {

        const cartao = criarElementoResponsavel(
            "article",
            "registro-card"
        );

        const titulo = criarElementoResponsavel(
            "h3",
            "",
            obterNomeDimensaoResponsavel(item.dimensao)
        );

        const reflexao = criarElementoResponsavel(
            "p",
            "",
            "Reflexão do estudante: " + item.reflexao
        );

        const data = criarElementoResponsavel(
            "small",
            "",
            "Data: " + item.data
        );

        cartao.append(titulo, reflexao, data);

        autoavaliacoesResponsavel.appendChild(cartao);

    });

}

// ==========================================
// DEVOLUTIVAS PEDAGÓGICAS
// ==========================================

function exibirDevolutivasResponsavel(estudante) {

    devolutivasResponsavel.innerHTML = "";

    const devolutivas = recuperarDadosResponsavel(
        "devolutivasAtitudinais"
    );

    const devolutivasEstudante = devolutivas
        .filter(function(item) {
            return item.estudante === estudante;
        })
        .slice()
        .reverse();

    if (devolutivasEstudante.length === 0) {

        devolutivasResponsavel.appendChild(
            criarElementoResponsavel(
                "p",
                "historico-vazio",
                "Ainda não existem devolutivas pedagógicas registradas para este estudante."
            )
        );

        return;
    }

    devolutivasEstudante.forEach(function(item) {

        const cartao = criarElementoResponsavel(
            "article",
            "registro-card"
        );

        const professor = criarElementoResponsavel(
            "h3",
            "",
            "Professor responsável: " +
            (item.professor || "Não informado")
        );

        const texto = criarElementoResponsavel(
            "p",
            "",
            "Devolutiva: " + (item.texto || "Sem conteúdo informado.")
        );

        const data = criarElementoResponsavel(
            "small",
            "",
            "Data: " + (item.data || "Não informada")
        );

        cartao.append(professor, texto, data);

        devolutivasResponsavel.appendChild(cartao);

    });

}

// ==========================================
// SELEÇÃO DE OBSERVAÇÕES PARA CONTESTAÇÃO
// ==========================================

function carregarObservacoesContestacaoResponsavel(estudante) {

    registroResponsavel.innerHTML = "";

    const opcaoInicial = document.createElement("option");

    opcaoInicial.value = "";
    opcaoInicial.textContent = "Selecione uma observação";

    registroResponsavel.appendChild(opcaoInicial);

    registrosResponsavel.forEach(function(registro, indice) {

        if (registro.estudante !== estudante) {
            return;
        }

        const opcao = document.createElement("option");

        opcao.value = indice;

        opcao.textContent =
            obterNomeDimensaoResponsavel(registro.dimensao) +
            " - " +
            (tiposResponsavel[registro.tipo] || registro.tipo) +
            " - " +
            (registro.observacao || "Sem descrição").substring(0, 60);

        registroResponsavel.appendChild(opcao);

    });

}

// ==========================================
// REGISTRO DE MANIFESTAÇÕES
// ==========================================

function registrarContestacaoResponsavel(evento) {

    evento.preventDefault();

    const estudante = estudanteSelecionadoResponsavel();

    const indice = registroResponsavel.value;

    const manifestacao = manifestacaoResponsavel.value.trim();

    if (!estudante) {

        exibirMensagemResponsavel(
            "Selecione um estudante.",
            false
        );

        return;
    }

    if (indice === "" || !manifestacao) {

        exibirMensagemResponsavel(
            "Selecione uma observação e escreva sua manifestação.",
            false
        );

        return;
    }

    const registroOriginal = registrosResponsavel[Number(indice)];

    if (!registroOriginal || registroOriginal.estudante !== estudante) {

        exibirMensagemResponsavel(
            "Não foi possível localizar a observação selecionada.",
            false
        );

        return;
    }

    contestacoesResponsavelDados =
        recuperarDadosResponsavel("contestacoesAtitudinais");

    const timestamp = Date.now();

    const novaContestacao = {

        estudante: estudante,

        perfil: "responsavel",

        indiceRegistro: Number(indice),

        dimensao: registroOriginal.dimensao,

        tipo: registroOriginal.tipo,

        observacaoOriginal: registroOriginal.observacao || "",

        manifestacao: manifestacao,

        data: new Date().toLocaleString("pt-BR"),

        timestamp: timestamp,

        status: "Registrada"

    };

    contestacoesResponsavelDados.push(novaContestacao);

    localStorage.setItem(
        "contestacoesAtitudinais",
        JSON.stringify(contestacoesResponsavelDados)
    );

    registrarAuditoriaResponsavel(
        "Registro de manifestação/contestação",
        estudante,
        "Responsável registrou uma manifestação em relação a uma observação da dimensão " +
        obterNomeDimensaoResponsavel(registroOriginal.dimensao) + ".",
        String(timestamp)
    );

    formularioContestacaoResponsavel.reset();

    exibirMensagemResponsavel(
        "Manifestação registrada com sucesso. A observação original foi preservada.",
        true
    );

    exibirManifestacoesResponsavel(estudante);

}

// ==========================================
// HISTÓRICO DE MANIFESTAÇÕES
// ==========================================

function exibirManifestacoesResponsavel(estudante) {

    listaManifestacoesResponsavel.innerHTML = "";

    contestacoesResponsavelDados =
        recuperarDadosResponsavel("contestacoesAtitudinais");

    const manifestacoes = contestacoesResponsavelDados
        .filter(function(item) {

            return item.estudante === estudante &&
                item.perfil === "responsavel";

        })
        .slice()
        .reverse();

    if (manifestacoes.length === 0) {

        listaManifestacoesResponsavel.appendChild(
            criarElementoResponsavel(
                "p",
                "historico-vazio",
                "Nenhuma manifestação registrada."
            )
        );

        return;
    }

    manifestacoes.forEach(function(item) {

        const cartao = criarElementoResponsavel(
            "article",
            "registro-card"
        );

        const titulo = criarElementoResponsavel(
            "h3",
            "",
            obterNomeDimensaoResponsavel(item.dimensao)
        );

        const autor = criarElementoResponsavel(
            "p",
            "",
            "Manifestação registrada por: Responsável"
        );

        const original = criarElementoResponsavel(
            "p",
            "",
            "Observação relacionada: " +
            (item.observacaoOriginal || "Sem descrição.")
        );

        const manifestacao = criarElementoResponsavel(
            "p",
            "",
            "Manifestação: " + item.manifestacao
        );

        const status = criarElementoResponsavel(
            "p",
            "status-manifestacao",
            "Situação: " + item.status
        );

        const data = criarElementoResponsavel(
            "small",
            "",
            "Data: " + item.data
        );

        cartao.append(
            titulo,
            autor,
            original,
            manifestacao,
            status,
            data
        );

        listaManifestacoesResponsavel.appendChild(cartao);

    });

}

// ==========================================
// ATUALIZAÇÃO DO ACOMPANHAMENTO
// ==========================================

function atualizarAcompanhamentoResponsavel() {

    const estudante = estudanteSelecionadoResponsavel();

    registrosResponsavel =
        recuperarDadosResponsavel("registrosAtitudinais");

    if (!estudante) {

        conteudoAcompanhamento.hidden = true;

        return;
    }

    conteudoAcompanhamento.hidden = false;

    mensagemResponsavel.textContent = "";

    exibirResumoResponsavel(estudante);

    exibirHistoricoResponsavel(estudante);

    exibirAutoavaliacoesResponsavel(estudante);

    exibirDevolutivasResponsavel(estudante);

    carregarObservacoesContestacaoResponsavel(estudante);

    exibirManifestacoesResponsavel(estudante);

}

// ==========================================
// EVENTOS
// ==========================================

campoEstudanteResponsavel.addEventListener(
    "change",
    atualizarAcompanhamentoResponsavel
);

formularioContestacaoResponsavel.addEventListener(
    "submit",
    registrarContestacaoResponsavel
);

window.addEventListener("storage", function() {

    registrosResponsavel =
        recuperarDadosResponsavel("registrosAtitudinais");

    atualizarAcompanhamentoResponsavel();

});

// ==========================================
// INICIALIZAÇÃO
// ==========================================

carregarEstudantesResponsavel();

atualizarAcompanhamentoResponsavel();