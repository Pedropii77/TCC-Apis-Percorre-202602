// Mensagem WhatsApp

const numero = "5511996759295"; // troque pelo número real
const msg = "Oi, Lupita! Quero começar meu futuro profissional. Pode me ajudar?";
document.querySelector(".whatsapp").href = "https://wa.me/" + numero + "?text=" + encodeURIComponent(msg);

// Carrossel de vagas

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

if (vagasTrack) {
    // Evita injetar HTML vindo de texto
    const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    vagasTrack.innerHTML = vagas.map((v) => `
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
                <li><i class="fa-solid fa-location-dot"></i><span>${esc(v.local)}</span></li>
                <li class="destaque"><i class="fa-regular fa-circle-check"></i><span>${esc(v.requisito)}</span></li>
                <li><i class="fa-regular fa-clock"></i><span>${esc(v.idade)}</span></li>
                <li><i class="fa-regular fa-calendar-check"></i><span>${esc(v.horario)}</span></li>
                <li class="salario"><i class="fa-solid fa-sack-dollar"></i><span>${esc(v.salario)}</span></li>
            </ul>
            <a href="./html/vagas.html" class="vaga-botao">Saiba Mais</a>
        </article>
    `).join("");

    const cards = vagasTrack.querySelectorAll(".vaga-card");

    const passo = () => {
        const gap = parseFloat(getComputedStyle(vagasTrack).columnGap) || 0;
        return cards[0].offsetWidth + gap;
    };

    const totalPosicoes = () => {
        const visiveis = Math.max(1, Math.round(vagasTrack.clientWidth / passo()));
        return Math.max(1, cards.length - visiveis + 1);
    };

    const indiceAtual = () => Math.round(vagasTrack.scrollLeft / passo());

    function montarDots() {
        vagasDots.innerHTML = "";
        for (let i = 0; i < totalPosicoes(); i++) {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "vagas-dot";
            dot.setAttribute("aria-label", "Ir para a vaga " + (i + 1));
            dot.addEventListener("click", () => vagasTrack.scrollTo({ left: i * passo() }));
            vagasDots.appendChild(dot);
        }
        atualizar();
    }

    function atualizar() {
        const atual = Math.min(indiceAtual(), totalPosicoes() - 1);
        vagasDots.querySelectorAll(".vagas-dot").forEach((d, i) => d.classList.toggle("ativo", i === atual));
        vagasPrev.disabled = vagasTrack.scrollLeft <= 2;
        vagasNext.disabled = vagasTrack.scrollLeft >= vagasTrack.scrollWidth - vagasTrack.clientWidth - 2;
    }

    vagasPrev.addEventListener("click", () => vagasTrack.scrollBy({ left: -passo() }));
    vagasNext.addEventListener("click", () => vagasTrack.scrollBy({ left: passo() }));
    vagasTrack.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", montarDots);
    montarDots();
}

