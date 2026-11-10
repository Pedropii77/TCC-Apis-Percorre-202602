// Mensagem WhatsApp

const numero = "5511996759295"; // troque pelo número real
const msg = "Oi, Lupita! Quero começar meu futuro profissional. Pode me ajudar?";
document.querySelector(".whatsapp").href = "https://wa.me/" + numero + "?text=" + encodeURIComponent(msg);

// ===== Carrossel de vagas =====

// Para adicionar/editar uma vaga, basta mexer neste array.
// Fotos: coloque em img/vagas/ (se a foto não existir, aparece um degradê roxo).
const vagas = [
    {
        titulo: "Jovem Aprendiz - Marketing",
        estado: "SP",
        area: "Marketing",
        modalidade: "Presencial",
        foto: "./img/vagas/sao-paulo.jpg",
        local: "São Paulo - Centro Histórico",
        requisito: "Necessário ter sido ex-aluno Percorre",
        idade: "16 a 22 anos",
        horario: "Segunda a sexta das 10h às 17h | 1 ou 2 dias de capacitação teórica",
        salario: "R$1.142,33"
    },
    {
        titulo: "Jovem Aprendiz - Administrativo",
        estado: "RS",
        area: "Administrativo",
        modalidade: "Presencial",
        foto: "./img/vagas/porto-alegre.jpg",
        local: "Porto Alegre - Cidade Baixa",
        requisito: "Necessário ter sido ex-aluno Percorre",
        idade: "16 a 22 anos",
        horario: "Segunda a sexta, sendo 4 horas por dia a combinar com a empresa (manhã ou tarde)",
        salario: "R$810,50"
    },
    {
        titulo: "Jovem Aprendiz",
        estado: "SC",
        area: "Administrativo",
        modalidade: "Presencial",
        foto: "./img/vagas/joinville.jpg",
        local: "Santo Antônio - Joinville",
        requisito: "Necessário ter sido ex-aluno Percorre",
        idade: "17 a 22 anos",
        horario: "Segunda a sexta, das 08h00 às 15h15",
        salario: "R$1.621,00"
    },
    {
        titulo: "Jovem Aprendiz - Atendimento",
        estado: "SP",
        area: "Atendimento",
        modalidade: "Presencial",
        foto: "./img/vagas/sao-paulo.jpg",
        local: "São Paulo - Paulista",
        requisito: "Necessário ter sido ex-aluno Percorre",
        idade: "16 a 22 anos",
        horario: "Segunda a sexta das 09h às 15h",
        salario: "R$1.142,33"
    },
    {
        titulo: "Jovem Aprendiz - Tecnologia",
        estado: "RS",
        area: "Tecnologia",
        modalidade: "Híbrido",
        foto: "./img/vagas/porto-alegre.jpg",
        local: "Porto Alegre - Centro",
        requisito: "Necessário ter sido ex-aluno Percorre",
        idade: "16 a 22 anos",
        horario: "Segunda a sexta, 4 horas por dia a combinar com a empresa",
        salario: "R$900,00"
    },
    {
        titulo: "Jovem Aprendiz - Logística",
        estado: "SC",
        area: "Logística",
        modalidade: "Presencial",
        foto: "./img/vagas/joinville.jpg",
        local: "Joinville - Centro",
        requisito: "Necessário ter sido ex-aluno Percorre",
        idade: "17 a 22 anos",
        horario: "Segunda a sexta, das 08h00 às 15h15",
        salario: "R$1.621,00"
    }
];

const vagasTrack = document.getElementById("vagasTrack");
const vagasDots = document.getElementById("vagasDots");
const vagasPrev = document.getElementById("vagasPrev");
const vagasNext = document.getElementById("vagasNext");

if (vagasTrack && vagasDots && vagasPrev && vagasNext && vagas.length) {
    // Evita injetar HTML vindo de texto
    const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ESCAPES[c]);

    const cardVaga = (v) => `
        <article class="vaga-card">
            <h3 class="vaga-titulo">${esc(v.titulo)}</h3>
            <div class="vaga-foto" role="img" aria-label="Foto de ${esc(v.local)}" style="--foto: url('${esc(v.foto)}')">
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
            <a href="./html/vagas.html" class="vaga-botao">Saiba Mais</a>
        </article>`;

    vagasTrack.innerHTML = vagas.map(cardVaga).join("");

    const cards = vagasTrack.querySelectorAll(".vaga-card");

    // Largura de um card + espaço entre eles
    const passo = () => {
        const gap = parseFloat(getComputedStyle(vagasTrack).columnGap) || 0;
        return cards[0].offsetWidth + gap;
    };

    const totalPosicoes = () => {
        const visiveis = Math.max(1, Math.round(vagasTrack.clientWidth / passo()));
        return Math.max(1, cards.length - visiveis + 1);
    };

    const indiceAtual = () => Math.round(vagasTrack.scrollLeft / passo());

    function atualizar() {
        const atual = Math.min(indiceAtual(), totalPosicoes() - 1);
        vagasDots.querySelectorAll(".vagas-dot").forEach((dot, i) => {
            const ativo = i === atual;
            dot.classList.toggle("ativo", ativo);
            if (ativo) dot.setAttribute("aria-current", "true");
            else dot.removeAttribute("aria-current");
        });
        vagasPrev.disabled = vagasTrack.scrollLeft <= 2;
        vagasNext.disabled = vagasTrack.scrollLeft >= vagasTrack.scrollWidth - vagasTrack.clientWidth - 2;
    }

    function montarDots() {
        vagasDots.innerHTML = "";
        for (let i = 0; i < totalPosicoes(); i++) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "vagas-dot";
            dot.setAttribute("aria-label", `Ir para a vaga ${i + 1}`);
            dot.addEventListener("click", () => vagasTrack.scrollTo({ left: i * passo(), behavior: "smooth" }));
            vagasDots.appendChild(dot);
        }
        atualizar();
    }

    // Recalcula os dots só quando o usuário para de redimensionar a janela
    let timerResize;
    const aoRedimensionar = () => {
        clearTimeout(timerResize);
        timerResize = setTimeout(montarDots, 150);
    };

    vagasPrev.addEventListener("click", () => vagasTrack.scrollBy({ left: -passo(), behavior: "smooth" }));
    vagasNext.addEventListener("click", () => vagasTrack.scrollBy({ left: passo(), behavior: "smooth" }));
    vagasTrack.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", aoRedimensionar);

    montarDots();
}
