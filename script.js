// =========================================================
// CONFIGURAÇÕES — mude aqui as suas informações!
// =========================================================

// Seu número de WhatsApp: código do país + DDD + número, só números, sem espaços.
// Exemplo Brasil: 5511999998888 | Exemplo Portugal: 351912345678
// 351 = código de Portugal. Com ele, o link funciona para quem está em qualquer país.
const numeroWhatsapp = "351912232530";

// Endereço do site do mostruário (o mesmo do QR code). Usado no botão "Abrir o site".
const siteDoProjeto = "https://ludnice11-lang.github.io/site-bebe-livre/";


// =========================================================
// 1) FORMULÁRIO DE ORÇAMENTO → WHATSAPP
// =========================================================

const formulario = document.getElementById("formulario");

// "submit" acontece quando a pessoa clica no botão "Enviar" do formulário
formulario.addEventListener("submit", function (evento) {
  // Normalmente o formulário recarrega a página ao enviar.
  // "preventDefault" impede isso, para nós decidirmos o que fazer.
  evento.preventDefault();

  // ".value" pega o que a pessoa escreveu/escolheu em cada campo
  const nome = document.getElementById("campo-nome").value;
  const tipo = document.getElementById("campo-tipo").value;
  const ideia = document.getElementById("campo-ideia").value;

  // Monta a mensagem juntando os textos. "\n" = pular linha
  let mensagem = "Olá, Ludnice! Meu nome é " + nome + ".\n";
  mensagem = mensagem + "Gostaria de um orçamento para: " + tipo + ".";

  // Só acrescenta a ideia se a pessoa escreveu alguma coisa
  if (ideia !== "") {
    mensagem = mensagem + "\n\nMinha ideia: " + ideia;
  }

  // Monta o link do WhatsApp. "encodeURIComponent" transforma espaços, acentos
  // e quebras de linha num formato que pode ir dentro de um link.
  const link = "https://wa.me/" + numeroWhatsapp + "?text=" + encodeURIComponent(mensagem);

  // Abre o WhatsApp numa nova aba, com a mensagem pronta
  window.open(link, "_blank", "noopener"); // "noopener": a aba nova não consegue mexer no nosso site
});


// =========================================================
// 2) BOTÃO "ABRIR O SITE" DO MOSTRUÁRIO
// =========================================================

// O QR code agora é uma imagem (qrcode-projeto.png) no HTML.
// Aqui só colocamos o endereço do projeto no botão "Abrir o site".
document.getElementById("link-projeto").href = siteDoProjeto;


// =========================================================
// 3) CARTÕES DE SERVIÇO QUE ABREM E FECHAM
// =========================================================

const cartoes = document.querySelectorAll(".cartao");

cartoes.forEach(function (cartao) {
  // "addEventListener('click', ...)" = "quando clicarem aqui, faça isso:"
  cartao.addEventListener("click", function () {
    // "toggle" liga/desliga a classe: se não tem, coloca; se tem, tira.
    // O CSS mostra o texto escondido quando a classe "aberto" está presente.
    cartao.classList.toggle("aberto");
  });
});


// =========================================================
// 4) MENU "HAMBÚRGUER" DO CELULAR
// =========================================================

const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");

// Ao tocar no ☰, o menu abre; ao tocar de novo, fecha
botaoMenu.addEventListener("click", function () {
  menu.classList.toggle("aberto");

  // Troca o ícone: ✕ quando está aberto (para fechar), ☰ quando está fechado
  if (menu.classList.contains("aberto")) {
    botaoMenu.textContent = "✕";
  } else {
    botaoMenu.textContent = "☰";
  }
});

// Quando a pessoa toca em um link do menu, o menu fecha sozinho
const linksDoMenu = document.querySelectorAll(".menu a");

linksDoMenu.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("aberto"); // "remove" tira a classe (fecha o menu)
    botaoMenu.textContent = "☰";
  });
});


// =========================================================
// 5) BOTÃO "VOLTAR AO INÍCIO" SÓ APARECE DEPOIS DE ROLAR
// =========================================================

const botaoTopo = document.getElementById("botao-topo");

// "scroll" acontece toda vez que a pessoa rola a página
window.addEventListener("scroll", function () {
  // "window.scrollY" diz quantos pixels a página já desceu
  if (window.scrollY > 400) {
    botaoTopo.classList.add("visivel");    // desceu bastante: mostra o botão
  } else {
    botaoTopo.classList.remove("visivel"); // está perto do topo: esconde
  }
});


// =========================================================
// 6) SEÇÕES QUE APARECEM SUAVEMENTE AO ROLAR
// =========================================================

// "IntersectionObserver" é um "vigia": ele avisa quando um elemento entra na tela
const vigia = new IntersectionObserver(function (itens) {
  itens.forEach(function (item) {
    // "isIntersecting" = o elemento apareceu na tela
    if (item.isIntersecting) {
      item.target.classList.add("visivel"); // o CSS faz a seção aparecer
      vigia.unobserve(item.target);         // já apareceu: pode parar de vigiar essa
    }
  });
}, { threshold: 0.15 }); // avisa quando 15% da seção já estiver visível

// Manda o vigia observar todas as seções com a classe "revelar"
document.querySelectorAll(".revelar").forEach(function (secao) {
  vigia.observe(secao);
});


// =========================================================
// 7) PREÇOS POR PAÍS (Portugal / Brasil)
// =========================================================

const botoesPais = document.querySelectorAll(".botao-pais");

// Função = um "bloco de instruções" com nome, que podemos usar várias vezes.
// "pais" recebe "pt" ou "br".
function mostrarPrecos(pais) {
  // 1. Troca os textos: cada elemento com "data-pt" também tem "data-br".
  //    "elemento.dataset.pt" lê o data-pt; "elemento.dataset.br" lê o data-br.
  document.querySelectorAll("[data-pt]").forEach(function (elemento) {
    elemento.textContent = elemento.dataset[pais];
  });

  // 2. Pinta de verde só o botão do país escolhido
  botoesPais.forEach(function (botao) {
    if (botao.dataset.pais === pais) {
      botao.classList.add("ativo");
    } else {
      botao.classList.remove("ativo");
    }
  });
}

// Quando clicam num botão de país, mostra os preços daquele país
botoesPais.forEach(function (botao) {
  botao.addEventListener("click", function () {
    mostrarPrecos(botao.dataset.pais);
  });
});

// Ao abrir o site: se o navegador da pessoa está em português do Brasil ("pt-BR"),
// já mostra os preços em reais. Senão, fica Portugal (o padrão).
if (navigator.language === "pt-BR") {
  mostrarPrecos("br");
}


// =========================================================
// 8) ANO AUTOMÁTICO NO RODAPÉ
// =========================================================

// "new Date().getFullYear()" pega o ano atual (ex.: 2026)
document.getElementById("ano").textContent = new Date().getFullYear();
