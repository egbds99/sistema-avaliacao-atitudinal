// ==========================================
// DIMENSÕES ATITUDINAIS
// ==========================================

const dimensoesResponsavel = [
    { valor: "responsabilidade", nome: "Responsabilidade" },
    { valor: "colaboracao", nome: "Colaboração" },
    { valor: "autonomia", nome: "Autonomia" },
    { valor: "participacao", nome: "Participação" },
    { valor: "respeito", nome: "Respeito e convivência" }
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

const graficoResponsavel =
    document.getElementById("grafico-evolucao-responsavel");

const historicoResponsavel =
    document.getElementById("historico-responsavel");

const solicitacoesResponsavel =
    document.getElementById("solicitacoes-responsavel");

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

let solicitacoesResponsavelDados =
    recuperarDadosResponsavel("solicitacoesAutoavaliacaoAtitudinais");

// ==========================================
// AUDITORIA
// ==========================================

function registrarAuditoriaResponsavel(
    acao,
    estudante,
    detalhes,
    registroRelacionado
) {
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

function obterTimestampResponsavel(item) {
    if (
        Number.isFinite(Number(item.timestamp)) &&
        Number(item.timestamp) > 0
    ) {
        return Number(item.timestamp);
    }

    if (item.data) {
        const dataInterpretada = new Date(item.data).getTime();

        if (Number.isFinite(dataInterpretada)) {
            return dataInterpretada;
        }
    }

    return null;
}

function obterTextoSolicitacaoResponsavel(item) {
    return item.texto ||
        item.solicitacao ||
        item.mensagem ||
        item.descricao ||
        "O professor solicitou uma reflexão sobre o desenvolvimento do estudante.";
}

function solicitacaoFoiRespondidaResponsavel(item) {
    return item.status === "Respondida" ||
        item.status === "respondida" ||
        Boolean(item.respostaTimestamp);
}

function obterIdentificadorSolicitacaoResponsavel(item, indice) {
    return item.id || item.timestamp || item.data || "solicitacao-" + indice;
}

// ==========================================
// CARREGAMENTO DOS ESTUDANTES
// ==========================================

function carregarEstudantesResponsavel() {
    // Seleção demonstrativa.
    // Em uma aplicação real, os estudantes seriam recuperados
    // a partir do vínculo autenticado do responsável.

    const padrao = [
        "Estudante de demonstração 1",
        "Estudante de demonstração 2",
        "Estudante de demonstração 3",
        "Estudante de demonstração 4",
        "Estudante de demonstração 5"
    ];
    let cadastrados = [];
    try { cadastrados = JSON.parse(localStorage.getItem("estudantesAtitudinais")) || []; } catch (erro) { cadastrados = []; }
    const estudantes = [...new Set([...padrao, ...cadastrados.map(item => typeof item === "string" ? item : item.nome).filter(Boolean)])];
    const selecionado = campoEstudanteResponsavel.value;
    campoEstudanteResponsavel.innerHTML = '<option value="">Selecione o estudante</option>';

    estudantes.forEach(function(estudante) {
        const opcao = document.createElement("option");

        opcao.value = estudante;
        opcao.textContent = estudante;

        campoEstudanteResponsavel.appendChild(opcao);
    });
    if (estudantes.includes(selecionado)) campoEstudanteResponsavel.value = selecionado;
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
// GRÁFICO DE EVOLUÇÃO TEMPORAL
// ==========================================

function exibirGraficoResponsavel(estudante) {
    graficoResponsavel.innerHTML = "";

    const registrosDoEstudante = registrosResponsavel.filter(
        function(registro) {
            return registro.estudante === estudante &&
                obterTimestampResponsavel(registro) !== null;
        }
    );

    if (registrosDoEstudante.length === 0) {
        graficoResponsavel.appendChild(
            criarElementoResponsavel(
                "p",
                "historico-vazio",
                "Ainda não existem observações com data disponível para apresentar a evolução temporal."
            )
        );

        return;
    }

    const agrupamento = {};

    registrosDoEstudante.forEach(function(registro) {
        const data = new Date(obterTimestampResponsavel(registro));

        const chave = data.getFullYear() + "-" +
            String(data.getMonth() + 1).padStart(2, "0");

        if (!agrupamento[chave]) {
            agrupamento[chave] = {
                positivas: 0,
                negativas: 0,
                neutras: 0,
                data: data
            };
        }

        if (registro.tipo === "positiva") {
            agrupamento[chave].positivas++;
        } else if (registro.tipo === "negativa") {
            agrupamento[chave].negativas++;
        } else if (registro.tipo === "neutra") {
            agrupamento[chave].neutras++;
        }
    });

    const meses = Object.keys(agrupamento)
        .sort()
        .slice(-6);

    const legenda = criarElementoResponsavel(
        "div",
        "grafico-legenda"
    );

    [{
            classe: "legenda-positiva",
            texto: "Positivas"
        },
        {
            classe: "legenda-negativa",
            texto: "Negativas"
        },
        {
            classe: "legenda-neutra",
            texto: "Neutras"
        }
    ].forEach(function(item) {
        legenda.appendChild(
            criarElementoResponsavel(
                "span",
                item.classe,
                item.texto
            )
        );
    });

    graficoResponsavel.appendChild(legenda);

    const areaGrafico = criarElementoResponsavel(
        "div",
        "grafico-barras"
    );

    meses.forEach(function(chave) {
        const dados = agrupamento[chave];

        const coluna = criarElementoResponsavel(
            "div",
            "grafico-coluna"
        );

        const barras = criarElementoResponsavel(
            "div",
            "grafico-grupo-barras"
        );

        const total =
            dados.positivas +
            dados.negativas +
            dados.neutras;

        const alturaMaxima = 150;
        const escala = total > 0 ? alturaMaxima / total : 0;

        [{
                valor: dados.positivas,
                classe: "barra-positiva",
                nome: "Positivas"
            },
            {
                valor: dados.negativas,
                classe: "barra-negativa",
                nome: "Negativas"
            },
            {
                valor: dados.neutras,
                classe: "barra-neutra",
                nome: "Neutras"
            }
        ].forEach(function(item) {
            const barra = criarElementoResponsavel(
                "div",
                "grafico-barra " + item.classe
            );

            const altura = item.valor > 0 ?
                Math.max(item.valor * escala, 4) :
                0;

            barra.style.height = altura + "px";
            barra.title = item.nome + ": " + item.valor;

            barra.setAttribute(
                "aria-label",
                item.nome + ": " + item.valor + " observações"
            );

            barras.appendChild(barra);
        });

        const rotulo = criarElementoResponsavel(
            "small",
            "grafico-rotulo",
            dados.data.toLocaleDateString("pt-BR", {
                month: "short",
                year: "numeric"
            })
        );

        const totais = criarElementoResponsavel(
            "small",
            "grafico-totais",
            total + (total === 1 ? " registro" : " registros")
        );

        coluna.append(barras, totais, rotulo);
        areaGrafico.appendChild(coluna);
    });

    graficoResponsavel.appendChild(areaGrafico);

    graficoResponsavel.appendChild(
        criarElementoResponsavel(
            "p",
            "descricao-secao",
            "O gráfico apresenta a quantidade de observações registradas em cada mês. Ele não representa nota, pontuação ou classificação do estudante."
        )
    );
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
        .sort(function(a, b) {
            return (obterTimestampResponsavel(b) || 0) -
                (obterTimestampResponsavel(a) || 0);
        });

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

        const professor = criarElementoResponsavel(
            "p",
            "",
            "Professor responsável: " +
            (registro.professor || "Não informado")
        );

        const data = criarElementoResponsavel(
            "small",
            "",
            "Data: " + (registro.data || "Não informada")
        );

        cartao.append(titulo, tipo, observacao, professor, data);
        historicoResponsavel.appendChild(cartao);
    });
}

// ==========================================
// SOLICITAÇÕES DE AUTOAVALIAÇÃO
// ==========================================

function exibirSolicitacoesResponsavel(estudante) {
    solicitacoesResponsavel.innerHTML = "";

    solicitacoesResponsavelDados =
        recuperarDadosResponsavel("solicitacoesAutoavaliacaoAtitudinais");

    const solicitacoes = solicitacoesResponsavelDados
        .map(function(item, indice) {
            return {
                item: item,
                indice: indice
            };
        })
        .filter(function(registro) {
            return registro.item.estudante === estudante;
        })
        .reverse();

    if (solicitacoes.length === 0) {
        solicitacoesResponsavel.appendChild(
            criarElementoResponsavel(
                "p",
                "historico-vazio",
                "Nenhuma solicitação de autoavaliação foi registrada para este estudante."
            )
        );

        return;
    }

    solicitacoes.forEach(function(registroSolicitacao) {
        const item = registroSolicitacao.item;
        const indice = registroSolicitacao.indice;

        const cartao = criarElementoResponsavel(
            "article",
            "registro-card"
        );

        const titulo = criarElementoResponsavel(
            "h3",
            "",
            "Solicitação de autoavaliação"
        );

        const professor = criarElementoResponsavel(
            "p",
            "",
            "Professor responsável: " +
            (item.professor || "Não informado")
        );

        const orientacao = criarElementoResponsavel(
            "p",
            "",
            "Orientação: " + obterTextoSolicitacaoResponsavel(item)
        );

        const data = criarElementoResponsavel(
            "small",
            "",
            "Data: " + (item.data || "Não informada")
        );

        const respondida = solicitacaoFoiRespondidaResponsavel(item);

        const status = criarElementoResponsavel(
            "p",
            "status-manifestacao",
            respondida ?
            "Situação: Respondida pelo estudante" :
            "Situação: Aguardando resposta do estudante"
        );

        cartao.append(titulo, professor, orientacao, data, status);

        // Identifica a reflexão vinculada à solicitação.
        const identificador = obterIdentificadorSolicitacaoResponsavel(
            item,
            indice
        );

        const resposta = autoavaliacoesResponsavelDados.find(
            function(autoavaliacao) {
                return autoavaliacao.estudante === estudante &&
                    autoavaliacao.solicitacaoId === identificador;
            }
        );

        if (resposta) {
            cartao.appendChild(
                criarElementoResponsavel(
                    "h4",
                    "",
                    "Resposta do estudante"
                )
            );

            cartao.appendChild(
                criarElementoResponsavel(
                    "p",
                    "",
                    "Dimensão: " +
                    obterNomeDimensaoResponsavel(resposta.dimensao)
                )
            );

            cartao.appendChild(
                criarElementoResponsavel(
                    "p",
                    "",
                    "Reflexão: " + resposta.reflexao
                )
            );

            cartao.appendChild(
                criarElementoResponsavel(
                    "small",
                    "",
                    "Data da resposta: " +
                    (resposta.data || "Não informada")
                )
            );
        } else if (respondida) {
            cartao.appendChild(
                criarElementoResponsavel(
                    "p",
                    "descricao-secao",
                    "A solicitação consta como respondida, mas não foi localizada uma reflexão vinculada a ela."
                )
            );
        }

        solicitacoesResponsavel.appendChild(cartao);
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
        .sort(function(a, b) {
            return (obterTimestampResponsavel(b) || 0) -
                (obterTimestampResponsavel(a) || 0);
        });

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
            "Data: " + (item.data || "Não informada")
        );

        cartao.append(titulo, reflexao, data);

        if (item.solicitacaoId) {
            cartao.appendChild(
                criarElementoResponsavel(
                    "p",
                    "status-manifestacao",
                    "Resposta vinculada a uma solicitação do professor."
                )
            );
        }

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

    autoavaliacoesResponsavelDados =
        recuperarDadosResponsavel("autoavaliacoesAtitudinais");

    contestacoesResponsavelDados =
        recuperarDadosResponsavel("contestacoesAtitudinais");

    solicitacoesResponsavelDados =
        recuperarDadosResponsavel("solicitacoesAutoavaliacaoAtitudinais");

    if (!estudante) {
        conteudoAcompanhamento.hidden = true;
        return;
    }

    conteudoAcompanhamento.hidden = false;
    mensagemResponsavel.textContent = "";

    exibirResumoResponsavel(estudante);
    if (window.renderRadarAtitudinal) renderRadarAtitudinal("grafico-radar-responsavel", registrosResponsavel, dimensoesResponsavel, estudante);
    exibirGraficoResponsavel(estudante);
    exibirHistoricoResponsavel(estudante);
    exibirSolicitacoesResponsavel(estudante);
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

window.addEventListener("storage", function(evento) {
    const chavesMonitoradas = [
        "registrosAtitudinais",
        "autoavaliacoesAtitudinais",
        "contestacoesAtitudinais",
        "devolutivasAtitudinais",
        "solicitacoesAutoavaliacaoAtitudinais",
        "estudantesAtitudinais"
    ];

    if (chavesMonitoradas.includes(evento.key)) {
        if (evento.key === "estudantesAtitudinais") carregarEstudantesResponsavel();
        atualizarAcompanhamentoResponsavel();
    }
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================

carregarEstudantesResponsavel();
atualizarAcompanhamentoResponsavel();

// Aplica permissões demonstrativas configuradas pela coordenação.
if (window.aplicarPermissoesAtitudinais) window.aplicarPermissoesAtitudinais("responsaveis");
window.addEventListener("permissoes-atitudinais-atualizadas", () => window.aplicarPermissoesAtitudinais && window.aplicarPermissoesAtitudinais("responsaveis"));
