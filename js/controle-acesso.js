/* Controle demonstrativo de permissões por perfil. Não substitui autenticação/autorização no servidor. */
(function () {
  const padrao = {
    professor: { registrarObservacoes: true, devolutivas: true, solicitarAutoavaliacao: true },
    coordenacao: { consultarIndicadores: true, consultarAuditoria: true, gerirTurmas: true, importarAcademicos: true, registrarIntervencoes: true },
    estudante: { consultarDesenvolvimento: true, responderAutoavaliacao: true, contestarRegistros: true },
    responsaveis: { consultarDesenvolvimento: true, contestarRegistros: true }
  };
  function obter() {
    try { return Object.assign({}, padrao, JSON.parse(localStorage.getItem("permissoesAtitudinais") || "{}")); }
    catch (_) { return padrao; }
  }
  window.aplicarPermissoesAtitudinais = function (perfil) {
    const permissoes = obter()[perfil] || {};
    document.querySelectorAll("[data-permission]").forEach(el => {
      const chave = el.dataset.permission;
      const permitido = permissoes[chave] !== false;
      el.hidden = !permitido;
      el.setAttribute("aria-hidden", String(!permitido));
    });
  };
  window.addEventListener("storage", function (evento) { if (evento.key === "permissoesAtitudinais") { const perfil = document.body.dataset.perfil; if (perfil) window.aplicarPermissoesAtitudinais(perfil); } });
  window.salvarPermissoesAtitudinais = function (permissoes) {
    localStorage.setItem("permissoesAtitudinais", JSON.stringify(permissoes));
    window.dispatchEvent(new Event("permissoes-atitudinais-atualizadas"));
  };
  window.obterPermissoesAtitudinais = obter;
})();