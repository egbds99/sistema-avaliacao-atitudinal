/* Gráfico radar formativo: apresenta somente a quantidade de registros por dimensão. */
(function () {
  window.renderRadarAtitudinal = function (containerId, registros, dimensoes, estudante) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const dados = dimensoes.map(d => ({
      nome: d.nome,
      valor: registros.filter(r => r.estudante === estudante && r.dimensao === d.valor).length
    }));
    const max = Math.max(1, ...dados.map(d => d.valor));
    const cx = 180, cy = 155, raio = 105;
    const pontos = dados.map((d, i) => {
      const ang = (-Math.PI / 2) + (i * 2 * Math.PI / dados.length);
      return { x: cx + Math.cos(ang) * raio * d.valor / max,
               y: cy + Math.sin(ang) * raio * d.valor / max,
               ax: cx + Math.cos(ang) * raio,
               ay: cy + Math.sin(ang) * raio,
               lx: cx + Math.cos(ang) * (raio + 25),
               ly: cy + Math.sin(ang) * (raio + 25) };
    });
    const anel = [0.25, 0.5, 0.75, 1].map(n =>
      dados.map((d, i) => {
        const a = (-Math.PI / 2) + (i * 2 * Math.PI / dados.length);
        return `${cx + Math.cos(a) * raio * n},${cy + Math.sin(a) * raio * n}`;
      }).join(" ")
    );
    const rotulos = dados.map((d, i) =>
      `<text x="${pontos[i].lx}" y="${pontos[i].ly}" text-anchor="middle" dominant-baseline="middle" class="radar-label">${d.nome}</text>`
    ).join("");
    const linhas = pontos.map(p => `<line x1="${cx}" y1="${cy}" x2="${p.ax}" y2="${p.ay}" class="radar-axis"/>`).join("");
    const poligono = pontos.map(p => `${p.x},${p.y}`).join(" ");
    const lista = dados.map(d => `<li>${d.nome}: <strong>${d.valor}</strong> registro(s)</li>`).join("");
    container.innerHTML = `<div class="radar-layout">
      <svg viewBox="0 0 360 310" role="img" aria-label="Gráfico radar com quantidade de observações por dimensão">
        ${anel.map(p => `<polygon points="${p}" class="radar-grid"/>`).join("")}
        ${linhas}
        <polygon points="${poligono}" class="radar-area"/>
        ${pontos.map(p => `<circle cx="${p.x}" cy="${p.y}" r="4" class="radar-point"/>`).join("")}
        ${rotulos}
      </svg><ul class="radar-legenda">${lista}</ul></div>
      <p class="aviso-prototipo">O radar compara quantidades de registros por dimensão; não representa nota, desempenho, qualidade ou classificação.</p>`;
  };
})();