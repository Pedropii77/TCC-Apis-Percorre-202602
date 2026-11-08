// Mensagem WhatsApp

const numero = "5511996759295"; // troque pelo número real
const msg = "Oi, Lupita! Quero começar meu futuro profissional. Pode me ajudar?";
document.querySelector(".whatsapp").href = "https://wa.me/" + numero + "?text=" + encodeURIComponent(msg);