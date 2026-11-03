// ==========================================
// CONFIGURAÇÕES DO PAINEL DA COORDENAÇÃO
// ==========================================

const dimensoes = [
    { valor: "responsabilidade", nome: "Responsabilidade" },
    { valor: "colaboracao", nome: "Colaboração" },
    { valor: "autonomia", nome: "Autonomia" },
    { valor: "participacao", nome: "Participação" },
    { valor: "respeito", nome: "Respeito e convivência" }
];

const tipos = {
    positiva: "Positiva",
    negativa: "Negativa",
    neutra: "Neutra"
};

// ==========================================
// ELEMENTOS HTML
// ==========================================

const totalRegistros = document.getElementById("total-registros");
const totalPositivas = document.getElementById("total-positivas");
const totalNegativas = document.getElementById("total-negativas");
const totalNeutras = document.getElementById("total-neutras");

const filtroEstudante = document.getElementById("filtro-estudante");
const filtroDimensao = document.getElementById("filtro-dimensao");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroPeriodo = document.getElementById("filtro-periodo");
const filtroTurma = document.getElementById("filtro-turma");

const listaCoordenacao = document.getElementById("lista-coordenacao");
const quantidadeFiltrada = document.getElementById("quantidade-filtrada");
const resumoDimensoes = document.getElementById("resumo-dimensoes-coordenacao");
const botaoLimparFiltros = document.getElementById("limpar-filtros");

const graficoEvolucao = document.getElementById("grafico-evolucao");
const listaAlertas = document.getElementById("lista-alertas-coordenacao");

// Intervenções

const formularioIntervencao = document.getElementById("form-intervencao");
const seletorEstudanteIntervencao = document.getElementById("intervencao-estudante");
const campoResponsavelIntervencao = document.getElementById("intervencao-responsavel");
const campoDataIntervencao = document.getElementById("intervencao-data");
const campoDescricaoIntervencao = document.getElementById("intervencao-descricao");
const campoResultadoIntervencao = document.getElementById("intervencao-resultado");
const listaIntervencoes = document.getElementById("lista-intervencoes");
const mensagemIntervencao = document.getElementById("mensagem-intervencao");

// Clima escolar

const formularioClima = document.getElementById("form-clima-escolar");
const campoResponsavelClima = document.getElementById("clima-responsavel");
const campoDataClima = document.getElementById("clima-data");
const campoContextoClima = document.getElementById("clima-contexto");
const campoDescricaoClima = document.getElementById("clima-descricao");
const listaClimaEscolar = document.getElementById("lista-clima-escolar");
const mensagemClima = document.getElementById("mensagem-clima");

// Auditoria

const filtroAuditoriaPerfil = document.getElementById("filtro-auditoria-perfil");
const filtroAuditoriaEstudante = document.getElementById("filtro-auditoria-estudante");
const filtroAuditoriaInicio = document.getElementById("filtro-auditoria-inicio");
const filtroAuditoriaFim = document.getElementById("filtro-auditoria-fim");
const botaoLimparAuditoria = document.getElementById("limpar-filtros-auditoria");
const listaAuditoria = document.getElementById("lista-auditoria");
const quantidadeAuditoria = document.getElementById("quantidade-auditoria");

// ==========================================
// ARMAZENAMENTO
// ==========================================

function recuperarDados(chave) {
    try {
        const dados = JSON.parse(localStorage.getItem(chave)) || [];
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.error("Erro ao recuperar " + chave + ":", erro);
        return [];
    }
}

function salvarDados(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
        return true;
    } catch (erro) {
        console.error("Erro ao salvar " + chave + ":", erro);
        return false;
    }
}

let registros = recuperarDados("registrosAtitudinais");
let intervencoes = recuperarDados("intervencoesAtitudinais");
let registrosClima = recuperarDados("climaEscolarAtitudinal");
let auditoria = recuperarDados("auditoriaAtitudinal");
let vinculosTurmas = recuperarDados("vinculosTurmasAtitudinais");
let estudantesCadastrados = recuperarDados("estudantesAtitudinais");
let turmasCadastradas = recuperarDados("turmasAtitudinais");
let dadosAcademicos = recuperarDados("dadosAcademicosAtitudinais");

// ==========================================
// AUDITORIA DA COORDENAÇÃO
// ==========================================

function registrarAuditoria(acao, responsavel, estudante, detalhes, registroRelacionado) {
    auditoria = recuperarDados("auditoriaAtitudinal");

    const agora = new Date();

    const evento = {
        id: agora.getTime().toString() + Math.random().toString(16).slice(2),
        perfil: "coordenacao",
        modulo: "Área da Coordenação",
        acao: acao,
        responsavel: responsavel || "Profissional não identificado",
        estudante: estudante || "Não aplicável",
        detalhes: detalhes || "",
        registroRelacionado: registroRelacionado || null,
        data: agora.toLocaleString("pt-BR"),
        timestamp: agora.getTime()
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
// FUNÇÕES AUXILIARES
// ==========================================

function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) {
        classe.split(/\s+/).forEach(nomeClasse => {
            if (nomeClasse) {
                elemento.classList.add(nomeClasse);
            }
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

function obterNomeDimensao(valor) {
    const dimensao = dimensoes.find(item => item.valor === valor);
    return dimensao ? dimensao.nome : valor || "Não informada";
}

function obterDataRegistro(registro) {
    if (registro.timestamp) {
        const data = new Date(Number(registro.timestamp));

        if (!Number.isNaN(data.getTime())) {
            return data;
        }
    }

    if (registro.data) {
        const texto = String(registro.data);

        const dataISO = texto.match(/^(\d{4})-(\d{2})-(\d{2})/);

        if (dataISO) {
            return new Date(
                Number(dataISO[1]),
                Number(dataISO[2]) - 1,
                Number(dataISO[3])
            );
        }

        const partes = texto.match(/^(\d{2})\/(\d{2})\/(\d{4})/);

        if (partes) {
            return new Date(
                Number(partes[3]),
                Number(partes[2]) - 1,
                Number(partes[1])
            );
        }
    }

    return null;
}

function obterDataLocalISO() {
    const hoje = new Date();

    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

function formatarDataISO(dataISO) {
    if (!dataISO) return "Data não informada";

    const partes = dataISO.split("-");

    if (partes.length !== 3) return dataISO;

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// ==========================================
// CARREGAMENTO DOS ESTUDANTES
// ==========================================

function obterNomesEstudantes() {
    return [...new Set([
        "Estudante de demonstração 1",
        "Estudante de demonstração 2",
        "Estudante de demonstração 3",
        "Estudante de demonstração 4",
        "Estudante de demonstração 5",
        ...estudantesCadastrados.map(item => typeof item === "string" ? item : item.nome),
        ...registros.map(item => item.estudante),
        ...intervencoes.map(item => item.estudante),
        ...vinculosTurmas.map(item => item.estudante)
    ].filter(Boolean))].sort();
}

function carregarEstudantes() {
    const estudanteSelecionado = filtroEstudante.value;
    const estudanteIntervencaoSelecionado = seletorEstudanteIntervencao.value;
    const estudantes = obterNomesEstudantes();

    filtroEstudante.innerHTML = '<option value="">Todos os estudantes</option>';
    seletorEstudanteIntervencao.innerHTML = '<option value="">Selecione um estudante</option>';

    estudantes.forEach(estudante => {
        const opcaoFiltro = document.createElement("option");
        opcaoFiltro.value = estudante;
        opcaoFiltro.textContent = estudante;
        filtroEstudante.appendChild(opcaoFiltro);

        const opcaoIntervencao = document.createElement("option");
        opcaoIntervencao.value = estudante;
        opcaoIntervencao.textContent = estudante;
        seletorEstudanteIntervencao.appendChild(opcaoIntervencao);
    });

    if (estudantes.includes(estudanteSelecionado)) filtroEstudante.value = estudanteSelecionado;
    if (estudantes.includes(estudanteIntervencaoSelecionado)) seletorEstudanteIntervencao.value = estudanteIntervencaoSelecionado;
}

// ==========================================
// INDICADORES
// ==========================================

function atualizarIndicadores() {
    totalRegistros.textContent = registros.length;

    totalPositivas.textContent = registros.filter(
        item => item.tipo === "positiva"
    ).length;

    totalNegativas.textContent = registros.filter(
        item => item.tipo === "negativa"
    ).length;

    totalNeutras.textContent = registros.filter(
        item => item.tipo === "neutra"
    ).length;
}

// ==========================================
// FILTROS
// ==========================================

function filtrarRegistros() {
    const estudante = filtroEstudante.value;
    const dimensao = filtroDimensao.value;
    const tipo = filtroTipo.value;
    const periodo = Number(filtroPeriodo.value);
    const turma = filtroTurma ? filtroTurma.value : "";

    return registros.filter(registro => {
        const correspondeEstudante = !estudante || registro.estudante === estudante;

        const correspondeDimensao = !dimensao || registro.dimensao === dimensao;

        const correspondeTipo = !tipo || registro.tipo === tipo;
        const vinculo = vinculosTurmas.find(v => v.estudante === registro.estudante);
        const turmaRegistro = registro.turma || (vinculo && vinculo.turma) || "";
        const correspondeTurma = !turma || turmaRegistro === turma;

        let correspondePeriodo = true;

        if (periodo) {
            const dataRegistro = obterDataRegistro(registro);

            if (!dataRegistro) {
                correspondePeriodo = false;
            } else {
                const limite = new Date();
                limite.setHours(0, 0, 0, 0);
                limite.setDate(limite.getDate() - (periodo - 1));

                correspondePeriodo = dataRegistro >= limite;
            }
        }

        return correspondeEstudante &&
            correspondeTurma &&
            correspondeDimensao &&
            correspondeTipo &&
            correspondePeriodo;
    });
}

// ==========================================
// DISTRIBUIÇÃO POR DIMENSÃO
// ==========================================

function exibirResumoDimensoes(registrosFiltrados) {
    resumoDimensoes.innerHTML = "";

    dimensoes.forEach(dimensao => {
        const quantidade = registrosFiltrados.filter(
            registro => registro.dimensao === dimensao.valor
        ).length;

        const cartao = criarElemento("article", "dimensao-resumo-card");

        cartao.appendChild(
            criarElemento("h3", "", dimensao.nome)
        );

        cartao.appendChild(
            criarElemento("p", "", quantidade + " registro(s)")
        );

        resumoDimensoes.appendChild(cartao);
    });
}

// ==========================================
// EVOLUÇÃO TEMPORAL
// ==========================================

function formatarDataChave(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

function obterInicioSemana(data) {
    const inicio = new Date(data);
    inicio.setHours(0, 0, 0, 0);

    const diaSemana = inicio.getDay();
    const diferenca = diaSemana === 0 ? 6 : diaSemana - 1;

    inicio.setDate(inicio.getDate() - diferenca);

    return inicio;
}

function obterChavePeriodo(data, periodo) {
    if (periodo === 7 || periodo === 30) {
        return formatarDataChave(data);
    }

    if (periodo === 90) {
        return formatarDataChave(obterInicioSemana(data));
    }

    return `${data.getFullYear()}-${String(
        data.getMonth() + 1
    ).padStart(2, "0")}`;
}

function avancarPeriodo(data, periodo) {
    const proxima = new Date(data);

    if (periodo === 7 || periodo === 30) {
        proxima.setDate(proxima.getDate() + 1);
    } else if (periodo === 90) {
        proxima.setDate(proxima.getDate() + 7);
    } else {
        proxima.setMonth(proxima.getMonth() + 1);
    }

    return proxima;
}

function formatarRotuloPeriodo(data, periodo) {
    if (periodo === 7 || periodo === 30 || periodo === 90) {
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit"
        });
    }

    return data.toLocaleDateString("pt-BR", {
        month: "short",
        year: "2-digit"
    });
}

function exibirEvolucaoTemporal(registrosFiltrados) {
    graficoEvolucao.innerHTML = "";

    const registrosComData = registrosFiltrados
        .map(registro => ({
            ...registro,
            dataRegistro: obterDataRegistro(registro)
        }))
        .filter(registro => registro.dataRegistro !== null);

    if (registrosComData.length === 0) {
        graficoEvolucao.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Não há registros com datas válidas para exibir neste período."
            )
        );
        return;
    }

    const periodo = Number(filtroPeriodo.value);
    const turma = filtroTurma ? filtroTurma.value : "";
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let inicio;

    if (periodo === 7 || periodo === 30 || periodo === 90) {
        inicio = new Date(hoje);
        inicio.setDate(inicio.getDate() - (periodo - 1));

        if (periodo === 90) {
            inicio = obterInicioSemana(inicio);
        }
    } else {
        const datas = registrosComData.map(
            registro => registro.dataRegistro
        );

        const menorData = new Date(
            Math.min(...datas.map(data => data.getTime()))
        );

        inicio = new Date(
            menorData.getFullYear(),
            menorData.getMonth(),
            1
        );
    }

    const agrupamentos = new Map();
    let dataAtual = new Date(inicio);

    while (dataAtual <= hoje) {
        const chave = obterChavePeriodo(dataAtual, periodo);

        agrupamentos.set(chave, {
            data: new Date(dataAtual),
            positiva: 0,
            negativa: 0,
            neutra: 0
        });

        dataAtual = avancarPeriodo(dataAtual, periodo);
    }

    registrosComData.forEach(registro => {
        const chave = obterChavePeriodo(
            registro.dataRegistro,
            periodo
        );

        if (agrupamentos.has(chave)) {
            const grupo = agrupamentos.get(chave);

            if (grupo[registro.tipo] !== undefined) {
                grupo[registro.tipo]++;
            }
        }
    });

    const grupos = [...agrupamentos.values()];

    const maiorTotal = Math.max(
        ...grupos.map(grupo =>
            grupo.positiva + grupo.negativa + grupo.neutra
        ),
        1
    );

    grupos.forEach(grupo => {
        const total =
            grupo.positiva + grupo.negativa + grupo.neutra;

        const coluna = criarElemento("div", "coluna-evolucao");
        const quantidade = criarElemento("small", "", total);
        const barra = criarElemento("div", "barra-evolucao");

        barra.style.height =
            Math.max((total / maiorTotal) * 180, total > 0 ? 4 : 0) + "px";

        [
            { tipo: "positiva", quantidade: grupo.positiva },
            { tipo: "neutra", quantidade: grupo.neutra },
            { tipo: "negativa", quantidade: grupo.negativa }
        ].forEach(segmento => {
            if (segmento.quantidade === 0) return;

            const parte = criarElemento(
                "div",
                "segmento-evolucao " + segmento.tipo
            );

            parte.style.flexGrow = segmento.quantidade;
            parte.title = segmento.tipo + ": " + segmento.quantidade;

            barra.appendChild(parte);
        });

        const rotulo = criarElemento(
            "span",
            "rotulo-evolucao",
            formatarRotuloPeriodo(grupo.data, periodo)
        );

        coluna.append(quantidade, barra, rotulo);
        graficoEvolucao.appendChild(coluna);
    });
}

// ==========================================
// SINAIS DE ATENÇÃO PEDAGÓGICA
// ==========================================

function exibirAlertasAcompanhamento() {
    listaAlertas.innerHTML = "";

    const agora = new Date();
    const limite = new Date(agora);

    limite.setHours(0, 0, 0, 0);
    limite.setDate(limite.getDate() - 6);

    const registrosNegativos = registros.filter(registro => {
        if (registro.tipo !== "negativa") return false;
        if (!registro.estudante || !registro.dimensao) return false;

        const dataRegistro = obterDataRegistro(registro);

        return dataRegistro &&
            dataRegistro >= limite &&
            dataRegistro <= agora;
    });

    const agrupamentos = new Map();

    registrosNegativos.forEach(registro => {
        const chave = JSON.stringify([
            registro.estudante,
            registro.dimensao
        ]);

        if (!agrupamentos.has(chave)) {
            agrupamentos.set(chave, []);
        }

        agrupamentos.get(chave).push(registro);
    });

    const alertas = [...agrupamentos.entries()]
        .filter(([chave, ocorrencias]) => ocorrencias.length >= 2)
        .map(([chave, ocorrencias]) => {
            const identificacao = JSON.parse(chave);

            return {
                estudante: identificacao[0],
                dimensao: identificacao[1],
                ocorrencias: ocorrencias.sort(
                    (a, b) => obterDataRegistro(b) - obterDataRegistro(a)
                )
            };
        })
        .sort((a, b) => b.ocorrencias.length - a.ocorrencias.length);

    if (alertas.length === 0) {
        listaAlertas.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhum sinal de atenção identificado nos últimos sete dias."
            )
        );
        return;
    }

    alertas.forEach(alerta => {
        const cartao = criarElemento("article", "alerta-card");

        cartao.appendChild(
            criarElemento("h3", "", alerta.estudante)
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Dimensão: " + obterNomeDimensao(alerta.dimensao)
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "alerta-quantidade",
                alerta.ocorrencias.length +
                " registros negativos nos últimos sete dias"
            )
        );

        cartao.appendChild(
            criarElemento("h4", "", "Registros que originaram o sinal")
        );

        const listaEvidencias = criarElemento(
            "ul",
            "lista-evidencias-alerta"
        );

        alerta.ocorrencias.forEach(registro => {
            const data = obterDataRegistro(registro);

            const dataFormatada = data ?
                data.toLocaleDateString("pt-BR") :
                "Data não informada";

            const observacao = registro.observacao ||
                "Observação qualitativa não informada.";

            listaEvidencias.appendChild(
                criarElemento(
                    "li",
                    "",
                    dataFormatada + " — " + observacao
                )
            );
        });

        cartao.appendChild(listaEvidencias);

        cartao.appendChild(
            criarElemento(
                "p",
                "orientacao-alerta",
                "Recomenda-se consultar as evidências e avaliar o contexto antes de qualquer encaminhamento."
            )
        );

        listaAlertas.appendChild(cartao);
    });
}

// ==========================================
// HISTÓRICO DE INTERVENÇÕES
// ==========================================

function salvarIntervencoes() {
    return salvarDados("intervencoesAtitudinais", intervencoes);
}

function registrarIntervencao(evento) {
    evento.preventDefault();

    const estudante = seletorEstudanteIntervencao.value.trim();
    const responsavel = campoResponsavelIntervencao.value.trim();
    const data = campoDataIntervencao.value;
    const descricao = campoDescricaoIntervencao.value.trim();
    const resultado = campoResultadoIntervencao.value.trim();

    if (!estudante || !responsavel || !data || !descricao) {
        mostrarMensagem(
            mensagemIntervencao,
            "Preencha os campos obrigatórios.",
            false
        );
        return;
    }

    if (data > obterDataLocalISO()) {
        mostrarMensagem(
            mensagemIntervencao,
            "A data da intervenção não pode ser futura.",
            false
        );
        return;
    }

    const novaIntervencao = {
        id: Date.now().toString(),
        estudante,
        responsavel,
        data,
        descricao,
        resultado,
        timestamp: new Date(data + "T12:00:00").getTime()
    };

    intervencoes.push(novaIntervencao);

    if (!salvarIntervencoes()) {
        intervencoes.pop();

        mostrarMensagem(
            mensagemIntervencao,
            "Não foi possível salvar a intervenção.",
            false
        );
        return;
    }

    const auditoriaSalva = registrarAuditoria(
        "Registro de intervenção pedagógica",
        responsavel,
        estudante,
        "Intervenção pedagógica registrada.",
        novaIntervencao.id
    );

    exibirIntervencoes();

    formularioIntervencao.reset();

    carregarEstudantes();

    seletorEstudanteIntervencao.value = estudante;

    campoDataIntervencao.value = obterDataLocalISO();

    if (auditoriaSalva) {
        mostrarMensagem(
            mensagemIntervencao,
            "Intervenção registrada com sucesso!",
            true
        );
    } else {
        mostrarMensagem(
            mensagemIntervencao,
            "Intervenção salva, mas não foi possível registrar sua auditoria.",
            false
        );
    }
}

function exibirIntervencoes() {
    listaIntervencoes.innerHTML = "";

    intervencoes = recuperarDados("intervencoesAtitudinais");

    const ordenadas = intervencoes.slice().sort(
        (a, b) => b.data.localeCompare(a.data)
    );

    if (ordenadas.length === 0) {
        listaIntervencoes.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhuma intervenção registrada."
            )
        );
        return;
    }

    ordenadas.forEach(intervencao => {
        const cartao = criarElemento("article", "intervencao-card");

        cartao.appendChild(
            criarElemento("h4", "", intervencao.estudante)
        );

        cartao.appendChild(
            criarElemento(
                "small",
                "",
                "Data: " + formatarDataISO(intervencao.data)
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Profissional responsável: " + intervencao.responsavel
            )
        );

        cartao.appendChild(
            criarElemento("strong", "", "Ação pedagógica realizada")
        );

        cartao.appendChild(
            criarElemento("p", "", intervencao.descricao)
        );

        if (intervencao.resultado) {
            cartao.appendChild(
                criarElemento("strong", "", "Resultados ou encaminhamentos")
            );

            cartao.appendChild(
                criarElemento("p", "", intervencao.resultado)
            );
        }

        listaIntervencoes.appendChild(cartao);
    });
}

// ==========================================
// ACOMPANHAMENTO DO CLIMA ESCOLAR
// ==========================================

function salvarRegistrosClima() {
    return salvarDados("climaEscolarAtitudinal", registrosClima);
}

function registrarClimaEscolar(evento) {
    evento.preventDefault();

    const responsavel = campoResponsavelClima.value.trim();
    const data = campoDataClima.value;
    const contexto = campoContextoClima.value.trim();
    const descricao = campoDescricaoClima.value.trim();

    if (!responsavel || !data || !contexto || !descricao) {
        mostrarMensagem(
            mensagemClima,
            "Preencha todos os campos obrigatórios.",
            false
        );
        return;
    }

    if (data > obterDataLocalISO()) {
        mostrarMensagem(
            mensagemClima,
            "A data do registro não pode ser futura.",
            false
        );
        return;
    }

    const novoRegistro = {
        id: Date.now().toString(),
        responsavel,
        data,
        contexto,
        descricao,
        timestamp: new Date(data + "T12:00:00").getTime()
    };

    registrosClima.push(novoRegistro);

    if (!salvarRegistrosClima()) {
        registrosClima.pop();

        mostrarMensagem(
            mensagemClima,
            "Não foi possível salvar o registro.",
            false
        );
        return;
    }

    const auditoriaSalva = registrarAuditoria(
        "Registro de observação do clima escolar",
        responsavel,
        null,
        "Contexto observado: " + contexto + ".",
        novoRegistro.id
    );

    exibirRegistrosClima();

    formularioClima.reset();

    campoDataClima.value = obterDataLocalISO();

    if (auditoriaSalva) {
        mostrarMensagem(
            mensagemClima,
            "Observação sobre o clima escolar registrada com sucesso.",
            true
        );
    } else {
        mostrarMensagem(
            mensagemClima,
            "Registro salvo, mas não foi possível registrar sua auditoria.",
            false
        );
    }
}

function exibirRegistrosClima() {
    listaClimaEscolar.innerHTML = "";

    registrosClima = recuperarDados("climaEscolarAtitudinal");

    const ordenados = registrosClima.slice().sort(
        (a, b) => b.data.localeCompare(a.data)
    );

    if (ordenados.length === 0) {
        listaClimaEscolar.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhum registro de clima escolar realizado."
            )
        );
        return;
    }

    ordenados.forEach(registro => {
        const cartao = criarElemento("article", "clima-card");

        cartao.appendChild(
            criarElemento("h4", "", registro.contexto)
        );

        cartao.appendChild(
            criarElemento(
                "small",
                "",
                "Data: " + formatarDataISO(registro.data)
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Profissional responsável: " + registro.responsavel
            )
        );

        cartao.appendChild(
            criarElemento("strong", "", "Percepção registrada")
        );

        cartao.appendChild(
            criarElemento("p", "", registro.descricao)
        );

        listaClimaEscolar.appendChild(cartao);
    });
}

// ==========================================
// REGISTROS ENCONTRADOS
// ==========================================

function exibirRegistros() {
    registros = recuperarDados("registrosAtitudinais");

    listaCoordenacao.innerHTML = "";

    const encontrados = filtrarRegistros();

    quantidadeFiltrada.textContent =
        encontrados.length +
        (encontrados.length === 1 ? " registro" : " registros");

    exibirResumoDimensoes(encontrados);
    exibirAlertasAcompanhamento();
    exibirEvolucaoTemporal(encontrados);

    if (encontrados.length === 0) {
        listaCoordenacao.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhum registro encontrado para os filtros selecionados."
            )
        );
        return;
    }

    encontrados.slice().reverse().forEach(registro => {
        const cartao = criarElemento("article", "registro-card");

        cartao.appendChild(
            criarElemento(
                "h3",
                "",
                registro.estudante || "Estudante não informado"
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Professor: " + (registro.professor || "Não informado")
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Dimensão: " + obterNomeDimensao(registro.dimensao)
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "tipo-" + registro.tipo,
                "Tipo: " + (tipos[registro.tipo] || registro.tipo)
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Observação: " + (registro.observacao || "Não informada.")
            )
        );

        cartao.appendChild(
            criarElemento(
                "small",
                "",
                "Data: " + (registro.data || "Não informada")
            )
        );

        listaCoordenacao.appendChild(cartao);
    });
}

// ==========================================
// CONSULTA DA AUDITORIA DOS QUATRO PERFIS
// ==========================================

function obterDataAuditoria(evento) {
    if (evento.timestamp) {
        const data = new Date(Number(evento.timestamp));

        if (!Number.isNaN(data.getTime())) {
            return data;
        }
    }

    if (evento.data) {
        const texto = String(evento.data);

        const iso = texto.match(/^(\d{4})-(\d{2})-(\d{2})/);

        if (iso) {
            return new Date(
                Number(iso[1]),
                Number(iso[2]) - 1,
                Number(iso[3])
            );
        }

        const brasileira = texto.match(/^(\d{2})\/(\d{2})\/(\d{4})/);

        if (brasileira) {
            return new Date(
                Number(brasileira[3]),
                Number(brasileira[2]) - 1,
                Number(brasileira[1])
            );
        }
    }

    return null;
}

function atualizarFiltroEstudantesAuditoria() {
    if (!filtroAuditoriaEstudante) return;

    const selecionado = filtroAuditoriaEstudante.value;
    const nomes = new Set();

    recuperarDados("registrosAtitudinais").forEach(item => {
        if (item.estudante) {
            nomes.add(item.estudante);
        }
    });

    recuperarDados("auditoriaAtitudinal").forEach(item => {
        if (
            item.estudante &&
            item.estudante !== "Não aplicável"
        ) {
            nomes.add(item.estudante);
        }
    });

    filtroAuditoriaEstudante.innerHTML =
        '<option value="">Todos os estudantes</option>';

    [...nomes]
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
        .forEach(nome => {
            const opcao = document.createElement("option");
            opcao.value = nome;
            opcao.textContent = nome;
            filtroAuditoriaEstudante.appendChild(opcao);
        });

    if (nomes.has(selecionado)) {
        filtroAuditoriaEstudante.value = selecionado;
    }
}

function formatarDataAuditoria(evento) {
    const data = obterDataAuditoria(evento);

    if (data) {
        return data.toLocaleString("pt-BR");
    }

    return evento.data || "Data não informada";
}

function nomePerfilAuditoria(perfil) {
    const nomes = {
        professor: "Professor",
        coordenacao: "Coordenação",
        estudante: "Estudante",
        responsaveis: "Responsáveis",
        responsavel: "Responsáveis"
    };

    return nomes[perfil] || perfil || "Perfil não informado";
}

function exibirAuditoria() {
    if (!listaAuditoria || !quantidadeAuditoria) return;

    const eventos = recuperarDados("auditoriaAtitudinal");

    const perfil = filtroAuditoriaPerfil ?
        filtroAuditoriaPerfil.value :
        "";

    const estudante = filtroAuditoriaEstudante ?
        filtroAuditoriaEstudante.value :
        "";

    const inicio = filtroAuditoriaInicio && filtroAuditoriaInicio.value ?
        new Date(filtroAuditoriaInicio.value + "T00:00:00") :
        null;

    const fim = filtroAuditoriaFim && filtroAuditoriaFim.value ?
        new Date(filtroAuditoriaFim.value + "T23:59:59") :
        null;

    const encontrados = eventos.filter(evento => {
        if (
            perfil &&
            evento.perfil !== perfil &&
            !(perfil === "responsaveis" && evento.perfil === "responsavel")
        ) {
            return false;
        }

        if (estudante && evento.estudante !== estudante) {
            return false;
        }

        const data = obterDataAuditoria(evento);

        if (inicio && (!data || data < inicio)) {
            return false;
        }

        if (fim && (!data || data > fim)) {
            return false;
        }

        return true;
    }).sort((a, b) => {
        const dataA = obterDataAuditoria(a);
        const dataB = obterDataAuditoria(b);

        return (dataB ? dataB.getTime() : 0) -
            (dataA ? dataA.getTime() : 0);
    });

    listaAuditoria.innerHTML = "";

    quantidadeAuditoria.textContent =
        encontrados.length +
        (encontrados.length === 1 ? " evento" : " eventos");

    if (encontrados.length === 0) {
        listaAuditoria.appendChild(
            criarElemento(
                "p",
                "historico-vazio",
                "Nenhum evento de auditoria encontrado para os filtros selecionados."
            )
        );
        return;
    }

    encontrados.forEach(evento => {
        const cartao = criarElemento(
            "article",
            "registro-card auditoria-card"
        );

        cartao.appendChild(
            criarElemento(
                "h3",
                "",
                evento.acao || "Ação não informada"
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Perfil: " + nomePerfilAuditoria(evento.perfil)
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Responsável: " + (evento.responsavel || "Não identificado")
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Estudante: " + (evento.estudante || "Não aplicável")
            )
        );

        cartao.appendChild(
            criarElemento(
                "p",
                "",
                "Módulo: " + (evento.modulo || "Não informado")
            )
        );

        if (evento.detalhes) {
            cartao.appendChild(
                criarElemento(
                    "p",
                    "",
                    "Detalhes: " + evento.detalhes
                )
            );
        }

        cartao.appendChild(
            criarElemento(
                "small",
                "",
                "Data e horário: " + formatarDataAuditoria(evento)
            )
        );

        listaAuditoria.appendChild(cartao);
    });
}

function limparFiltrosAuditoria() {
    if (filtroAuditoriaPerfil) {
        filtroAuditoriaPerfil.value = "";
    }

    if (filtroAuditoriaEstudante) {
        filtroAuditoriaEstudante.value = "";
    }

    if (filtroAuditoriaInicio) {
        filtroAuditoriaInicio.value = "";
    }

    if (filtroAuditoriaFim) {
        filtroAuditoriaFim.value = "";
    }

    exibirAuditoria();
}

// ==========================================
// LIMPAR FILTROS DOS REGISTROS
// ==========================================

function limparFiltros() {
    filtroEstudante.value = "";
    filtroDimensao.value = "";
    filtroTipo.value = "";
    filtroPeriodo.value = "";
    if (filtroTurma) filtroTurma.value = "";

    exibirRegistros();
}

// Módulo demonstrativo de cadastro de turmas, estudantes e integração CSV
function atualizarModuloTurmas() {
    const seletor = document.getElementById("vinculo-estudante");
    const filtro = document.getElementById("filtro-turma");
    const seletorTurma = document.getElementById("vinculo-turma");
    const seletorTurmaNovo = document.getElementById("turma-novo-estudante");
    const lista = document.getElementById("lista-vinculos-turma");
    const resumo = document.getElementById("resumo-dados-academicos");
    if (!seletor || !filtro || !seletorTurma || !lista || !resumo) return;

    const estudantes = obterNomesEstudantes();
    const turmas = [...new Set([
        "6º Ano A", "6º Ano B", "7º Ano A", "7º Ano B", "8º Ano A", "9º Ano A",
        ...turmasCadastradas.map(item => typeof item === "string" ? item : item.nome),
        ...vinculosTurmas.map(item => item.turma)
    ].filter(Boolean))].sort();

    const estudanteAtual = seletor.value;
    seletor.innerHTML = '<option value="">Selecione um estudante</option>';
    estudantes.forEach(nome => {
        const opcao = document.createElement("option");
        opcao.value = nome;
        opcao.textContent = nome;
        seletor.appendChild(opcao);
    });
    if (estudantes.includes(estudanteAtual)) seletor.value = estudanteAtual;

    const turmaAtual = filtro.value;
    filtro.innerHTML = '<option value="">Todas as turmas</option>';
    turmas.forEach(turma => {
        const opcao = document.createElement("option");
        opcao.value = turma;
        opcao.textContent = turma;
        filtro.appendChild(opcao);
    });
    if (turmas.includes(turmaAtual)) filtro.value = turmaAtual;

    const turmaVinculoAtual = seletorTurma.value;
    seletorTurma.innerHTML = '<option value="">Selecione uma turma</option>';
    turmas.forEach(turma => {
        const opcao = document.createElement("option");
        opcao.value = turma;
        opcao.textContent = turma;
        seletorTurma.appendChild(opcao);
    });
    if (turmas.includes(turmaVinculoAtual)) seletorTurma.value = turmaVinculoAtual;

    if (seletorTurmaNovo) {
        const turmaNovoAtual = seletorTurmaNovo.value;
        seletorTurmaNovo.innerHTML = '<option value="">Sem turma definida</option>';
        turmas.forEach(turma => {
            const opcao = document.createElement("option");
            opcao.value = turma;
            opcao.textContent = turma;
            seletorTurmaNovo.appendChild(opcao);
        });
        if (turmas.includes(turmaNovoAtual)) seletorTurmaNovo.value = turmaNovoAtual;
    }

    lista.innerHTML = "<h3>Turmas e vínculos cadastrados</h3>";
    const tabela = document.createElement("table");
    tabela.className = "tabela-dados";
    tabela.innerHTML = "<thead><tr><th>Estudante</th><th>Turma atribuída</th></tr></thead>";
    const corpo = document.createElement("tbody");
    estudantes.forEach(estudante => {
        const vinculo = vinculosTurmas.find(item => item.estudante === estudante);
        const linha = document.createElement("tr");
        [estudante, vinculo ? vinculo.turma : "Não atribuída"].forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });
        corpo.appendChild(linha);
    });
    tabela.appendChild(corpo);
    lista.appendChild(tabela);

    resumo.innerHTML = "<h3>Dados acadêmicos importados</h3>";
    if (!dadosAcademicos.length) {
        resumo.appendChild(criarElemento("p", "historico-vazio", "Nenhum dado de frequência ou desempenho importado."));
    } else {
        const tabelaAcademica = document.createElement("table");
        tabelaAcademica.className = "tabela-dados";
        tabelaAcademica.innerHTML = "<thead><tr><th>Estudante</th><th>Turma</th><th>Frequência</th><th>Desempenho</th><th>Período</th><th>Observações atitudinais</th></tr></thead>";
        const corpoAcademico = document.createElement("tbody");
        dadosAcademicos.forEach(dado => {
            const linha = document.createElement("tr");
            [dado.estudante, dado.turma, dado.frequencia + "%", dado.desempenho, dado.periodo, registros.filter(registro => registro.estudante === dado.estudante).length].forEach(valor => {
                const celula = document.createElement("td");
                celula.textContent = valor;
                linha.appendChild(celula);
            });
            corpoAcademico.appendChild(linha);
        });
        tabelaAcademica.appendChild(corpoAcademico);
        resumo.appendChild(tabelaAcademica);
    }
}

function salvarVinculoTurma() {
    const estudante = document.getElementById("vinculo-estudante").value;
    const turma = document.getElementById("vinculo-turma").value;
    if (!estudante || !turma) {
        alert("Selecione o estudante e a turma.");
        return;
    }
    const vinculo = vinculosTurmas.find(item => item.estudante === estudante);
    if (vinculo) vinculo.turma = turma;
    else vinculosTurmas.push({ estudante, turma, atualizadoEm: new Date().toISOString() });
    if (!salvarDados("vinculosTurmasAtitudinais", vinculosTurmas)) {
        alert("Não foi possível salvar o vínculo no navegador.");
        return;
    }
    registrarAuditoria("Atribuição de estudante à turma", "Coordenação", estudante, "Turma: " + turma, null);
    document.getElementById("vinculo-turma").value = "";
    atualizarModuloTurmas();
    exibirRegistros();
}

function cadastrarNovaTurma() {
    const campo = document.getElementById("nova-turma");
    const nome = campo.value.trim();
    if (!nome) { alert("Informe o nome da turma."); return; }
    const existe = [...turmasCadastradas.map(item => typeof item === "string" ? item : item.nome), "6º Ano A", "6º Ano B", "7º Ano A", "7º Ano B", "8º Ano A", "9º Ano A"].some(t => t.toLocaleLowerCase("pt-BR") === nome.toLocaleLowerCase("pt-BR"));
    if (existe) { alert("Essa turma já está cadastrada."); return; }
    turmasCadastradas.push({ nome, criadaEm: new Date().toISOString() });
    if (!salvarDados("turmasAtitudinais", turmasCadastradas)) { alert("Não foi possível salvar a turma."); return; }
    registrarAuditoria("Cadastro de nova turma", "Coordenação", "Não aplicável", "Turma criada: " + nome, null);
    campo.value = "";
    atualizarModuloTurmas();
}

function cadastrarNovoEstudante() {
    const campo = document.getElementById("novo-estudante");
    const nome = campo.value.trim();
    const turma = document.getElementById("turma-novo-estudante").value;
    if (!nome) { alert("Informe o nome do estudante."); return; }
    if (obterNomesEstudantes().some(estudante => estudante.toLocaleLowerCase("pt-BR") === nome.toLocaleLowerCase("pt-BR"))) {
        alert("Já existe um estudante com esse nome.");
        return;
    }
    estudantesCadastrados.push({ nome, criadoEm: new Date().toISOString() });
    if (!salvarDados("estudantesAtitudinais", estudantesCadastrados)) { alert("Não foi possível salvar o estudante."); return; }
    if (turma) {
        vinculosTurmas.push({ estudante: nome, turma, atualizadoEm: new Date().toISOString() });
        salvarDados("vinculosTurmasAtitudinais", vinculosTurmas);
    }
    registrarAuditoria("Cadastro de novo estudante", "Coordenação", nome, turma ? "Turma inicial: " + turma : "Estudante cadastrado sem turma.", null);
    campo.value = "";
    carregarEstudantes();
    atualizarModuloTurmas();
}

function parseLinhaCSV(linha) {
    const out=[];let v="",q=false;
    for(let i=0;i<linha.length;i++){const c=linha[i];if(c==='"'){if(q&&linha[i+1]==='"'){v+='"';i++;}else q=!q;}else if((c===","||c===";")&&!q){out.push(v.trim());v="";}else v+=c;}
    out.push(v.trim());return out;
}
async function importarDadosAcademicos() {
    const arquivo=document.getElementById("arquivo-dados-academicos").files[0];
    const msg=document.getElementById("mensagem-importacao");
    if(!arquivo){msg.textContent="Selecione um CSV.";return;}
    try {
      const linhas=(await arquivo.text()).replace(/^\uFEFF/,"").split(/\r?\n/).filter(x=>x.trim());
      const cab=parseLinhaCSV(linhas.shift()).map(x=>x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""));
      const idx=n=>cab.indexOf(n);
      const campos=["estudante","turma","frequencia","desempenho","periodo"];
      if(linhas.length===0||campos.some(c=>idx(c)<0))throw Error("Cabeçalho esperado: estudante,turma,frequencia,desempenho,periodo.");
      const novos=linhas.map((l,i)=>{const c=parseLinhaCSV(l);const freq=Number(String(c[idx("frequencia")]).replace("%","").replace(",","."));const d={estudante:c[idx("estudante")],turma:c[idx("turma")],frequencia:freq,desempenho:c[idx("desempenho")],periodo:c[idx("periodo")],importadoEm:new Date().toISOString()};if(!d.estudante||!d.turma||!Number.isFinite(freq)||freq<0||freq>100||!d.desempenho||!d.periodo)throw Error("Dados inválidos na linha "+(i+2)+".");return d;});
      dadosAcademicos=dadosAcademicos.concat(novos);
      novos.forEach(d=>{const v=vinculosTurmas.find(x=>x.estudante===d.estudante);if(v)v.turma=d.turma;else vinculosTurmas.push({estudante:d.estudante,turma:d.turma});});
      if(!salvarDados("dadosAcademicosAtitudinais",dadosAcademicos)||!salvarDados("vinculosTurmasAtitudinais",vinculosTurmas))throw Error("Não foi possível salvar no navegador.");
      registrarAuditoria("Importação de frequência e desempenho","Coordenação","Não aplicável",novos.length+" linha(s) importada(s).",null);
      msg.textContent=novos.length+" registro(s) importado(s).";atualizarModuloTurmas();carregarEstudantes();exibirRegistros();
    } catch(e){msg.textContent="Importação não realizada: "+e.message;}
}
function montarEditorPermissoes() {
 const c=document.getElementById("editor-permissoes");if(!c||!window.obterPermissoesAtitudinais)return;
 const m={professor:{registrarObservacoes:"Registrar observações",devolutivas:"Registrar devolutivas",solicitarAutoavaliacao:"Solicitar autoavaliações"},coordenacao:{consultarIndicadores:"Consultar indicadores",consultarAuditoria:"Consultar auditoria",gerirTurmas:"Gerir turmas",importarAcademicos:"Importar dados acadêmicos",registrarIntervencoes:"Registrar intervenções"},estudante:{consultarDesenvolvimento:"Consultar desenvolvimento",responderAutoavaliacao:"Responder autoavaliações",contestarRegistros:"Contestar registros"},responsaveis:{consultarDesenvolvimento:"Consultar desenvolvimento",contestarRegistros:"Registrar manifestações"}};
 const p=window.obterPermissoesAtitudinais();c.innerHTML="";
 Object.entries(m).forEach(([perfil,itens])=>{const grupo=criarElemento("div","campo");grupo.appendChild(criarElemento("h3","",perfil));Object.entries(itens).forEach(([k,n])=>{const label=document.createElement("label");label.style.display="block";const cb=document.createElement("input");cb.type="checkbox";cb.dataset.perfil=perfil;cb.dataset.modulo=k;cb.checked=p[perfil]?.[k]!==false;label.append(cb,document.createTextNode(" "+n));grupo.appendChild(label);});c.appendChild(grupo);});
}
function salvarEditorPermissoes() {
 const p=window.obterPermissoesAtitudinais();
 document.querySelectorAll("#editor-permissoes input").forEach(cb=>{p[cb.dataset.perfil][cb.dataset.modulo]=cb.checked;});
 window.salvarPermissoesAtitudinais(p);
 document.getElementById("mensagem-permissoes").textContent="Permissões demonstrativas salvas.";
 registrarAuditoria("Atualização das permissões demonstrativas","Coordenação","Não aplicável","Matriz de permissões atualizada.",null);
}

// ==========================================
// EVENTOS
// ==========================================

document.getElementById("salvar-permissoes")?.addEventListener("click", salvarEditorPermissoes);
montarEditorPermissoes();
document.getElementById("salvar-vinculo-turma")?.addEventListener("click", salvarVinculoTurma);
document.getElementById("cadastrar-turma")?.addEventListener("click", cadastrarNovaTurma);
document.getElementById("cadastrar-estudante")?.addEventListener("click", cadastrarNovoEstudante);
document.getElementById("importar-dados-academicos")?.addEventListener("click", importarDadosAcademicos);

[
    filtroEstudante,
    filtroDimensao,
    filtroTipo,
    filtroPeriodo,
    ...(filtroTurma ? [filtroTurma] : [])
].forEach(campo => {
    campo.addEventListener("change", exibirRegistros);
});

botaoLimparFiltros.addEventListener("click", limparFiltros);

formularioIntervencao.addEventListener(
    "submit",
    registrarIntervencao
);

formularioClima.addEventListener(
    "submit",
    registrarClimaEscolar
);

// Eventos dos filtros da auditoria

if (filtroAuditoriaPerfil) {
    filtroAuditoriaPerfil.addEventListener("change", exibirAuditoria);
}

if (filtroAuditoriaEstudante) {
    filtroAuditoriaEstudante.addEventListener("change", exibirAuditoria);
}

if (filtroAuditoriaInicio) {
    filtroAuditoriaInicio.addEventListener("change", exibirAuditoria);
}

if (filtroAuditoriaFim) {
    filtroAuditoriaFim.addEventListener("change", exibirAuditoria);
}

if (botaoLimparAuditoria) {
    botaoLimparAuditoria.addEventListener(
        "click",
        limparFiltrosAuditoria
    );
}

// ==========================================
// ATUALIZAÇÃO ENTRE ABAS
// ==========================================

window.addEventListener("storage", evento => {
    if (
        evento.key === "registrosAtitudinais" ||
        evento.key === "intervencoesAtitudinais" ||
        evento.key === "climaEscolarAtitudinal" ||
        evento.key === "auditoriaAtitudinal" ||
        evento.key === "vinculosTurmasAtitudinais" ||
        evento.key === "estudantesAtitudinais" ||
        evento.key === "turmasAtitudinais" ||
        evento.key === "dadosAcademicosAtitudinais"
    ) {
        registros = recuperarDados("registrosAtitudinais");
        intervencoes = recuperarDados("intervencoesAtitudinais");
        registrosClima = recuperarDados("climaEscolarAtitudinal");
        auditoria = recuperarDados("auditoriaAtitudinal");
        vinculosTurmas = recuperarDados("vinculosTurmasAtitudinais");
        estudantesCadastrados = recuperarDados("estudantesAtitudinais");
        turmasCadastradas = recuperarDados("turmasAtitudinais");
        dadosAcademicos = recuperarDados("dadosAcademicosAtitudinais");

        carregarEstudantes();
        atualizarIndicadores();
        exibirRegistros();
        exibirIntervencoes();
        exibirRegistrosClima();

        atualizarFiltroEstudantesAuditoria();
        exibirAuditoria();
        atualizarModuloTurmas();
    }
});

// Dados fictícios iniciais para que a atribuição por turma já possa ser testada.
if (!estudantesCadastrados.length) {
    estudantesCadastrados = [
        { nome: "Estudante de demonstração 1", demonstrativo: true },
        { nome: "Estudante de demonstração 2", demonstrativo: true },
        { nome: "Estudante de demonstração 3", demonstrativo: true },
        { nome: "Estudante de demonstração 4", demonstrativo: true },
        { nome: "Estudante de demonstração 5", demonstrativo: true }
    ];
    salvarDados("estudantesAtitudinais", estudantesCadastrados);
}
if (!turmasCadastradas.length) {
    turmasCadastradas = ["6º Ano A", "6º Ano B", "7º Ano A", "7º Ano B", "8º Ano A", "9º Ano A"];
    salvarDados("turmasAtitudinais", turmasCadastradas);
}
if (!vinculosTurmas.length) {
    vinculosTurmas = [
        { estudante: "Estudante de demonstração 1", turma: "6º Ano A", demonstrativo: true },
        { estudante: "Estudante de demonstração 2", turma: "6º Ano A", demonstrativo: true },
        { estudante: "Estudante de demonstração 3", turma: "7º Ano A", demonstrativo: true },
        { estudante: "Estudante de demonstração 4", turma: "8º Ano A", demonstrativo: true },
        { estudante: "Estudante de demonstração 5", turma: "9º Ano A", demonstrativo: true }
    ];
    salvarDados("vinculosTurmasAtitudinais", vinculosTurmas);
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

carregarEstudantes();
montarEditorPermissoes();
atualizarModuloTurmas();

atualizarIndicadores();

exibirRegistros();

exibirIntervencoes();

exibirRegistrosClima();

atualizarFiltroEstudantesAuditoria();

exibirAuditoria();

campoDataIntervencao.value = obterDataLocalISO();

campoDataClima.value = obterDataLocalISO();

// Aplica permissões demonstrativas configuradas pela coordenação.
if (window.aplicarPermissoesAtitudinais) window.aplicarPermissoesAtitudinais("coordenacao");
window.addEventListener("permissoes-atitudinais-atualizadas", () => window.aplicarPermissoesAtitudinais && window.aplicarPermissoesAtitudinais("coordenacao"));
