// Página de vagas: usa o array "vagas" definido em JS/main.js
(function () {
    const grade = document.getElementById("vagasGrade");
    if (!grade || typeof vagas === "undefined") return;

    const vazio = document.getElementById("vagasVazio");
    const contagem = document.getElementById("vagasContagem");
    const busca = document.getElementById("filtroBusca");
    const selEstado = document.getElementById("filtroEstado");
    const selArea = document.getElementById("filtroArea");
    const selModalidade = document.getElementById("filtroModalidade");
    const selOrdem = document.getElementById("filtroOrdem");

    const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ESCAPES[c]);

    // "R$1.142,33" -> 1142.33
    const valor = (v) => parseFloat(String(v.salario).replace(/[^\d,]/g, "").replace(",", ".")) || 0;
    // Remove acentos para a busca
    const norm = (t) => String(t).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    // As fotos são relativas ao index.html; aqui estamos em /html/
    const caminhoFoto = (f) => f.replace(/^\.\//, "../");

    const card = (v) => `
        <article class="vaga-card">
            <h3 class="vaga-titulo">${esc(v.titulo)}</h3>
            <div class="vaga-foto" role="img" aria-label="Foto de ${esc(v.local)}" style="--foto: url('${esc(caminhoFoto(v.foto))}')">
                <span class="vaga-estado">${esc(v.estado)}</span>
                <div class="vaga-tags">
                    <span class="vaga-tag area">${esc(v.area)}</span>
                    <span class="vaga-tag">${esc(v.modalidade)}</span>
                </div>
            </div>
            <ul class="vaga-info">
                <li><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>${esc(v.local)}</span></li>
                <li class="destaque"><i class="fa-regular fa-circle-check" aria-hidden="true"></i><span>${esc(v.requisito)}</span></li>
                <li><i class="fa-regular fa-clock" aria-hidden="true"></i><span>${esc(v.idade)}</span></li>
                <li><i class="fa-regular fa-calendar-check" aria-hidden="true"></i><span>${esc(v.horario)}</span></li>
                <li class="salario"><i class="fa-solid fa-sack-dollar" aria-hidden="true"></i><span>${esc(v.salario)}</span></li>
            </ul>
            <a href="#" class="vaga-botao">Saiba Mais</a>
        </article>`;

    // Preenche os selects com os valores que existem no array
    function opcoes(select, campo) {
        [...new Set(vagas.map((v) => v[campo]))].sort().forEach((valorOpcao) => {
            const o = document.createElement("option");
            o.value = valorOpcao;
            o.textContent = valorOpcao;
            select.appendChild(o);
        });
    }
    opcoes(selEstado, "estado");
    opcoes(selArea, "area");
    opcoes(selModalidade, "modalidade");

    function render() {
        const termo = norm(busca.value.trim());
        let lista = vagas.filter((v) =>
            (!selEstado.value || v.estado === selEstado.value) &&
            (!selArea.value || v.area === selArea.value) &&
            (!selModalidade.value || v.modalidade === selModalidade.value) &&
            (!termo || norm(`${v.titulo} ${v.local} ${v.area}`).includes(termo))
        );

        if (selOrdem.value === "menor") lista = [...lista].sort((a, b) => valor(a) - valor(b));
        if (selOrdem.value === "maior") lista = [...lista].sort((a, b) => valor(b) - valor(a));

        grade.innerHTML = lista.map(card).join("");
        vazio.hidden = lista.length > 0;
        contagem.textContent = lista.length === 1 ? "1 vaga encontrada" : `${lista.length} vagas encontradas`;
    }

    [busca, selEstado, selArea, selModalidade, selOrdem].forEach((el) => {
        el.addEventListener(el === busca ? "input" : "change", render);
    });

    render();
})();