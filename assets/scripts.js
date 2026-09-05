// Scripts menu mobile
const menuMobile = document.querySelector(".nav-mobile");
const btnOpen = document.querySelector(".btn-open");
const btnClose = document.querySelector(".btn-close");
const overlayMenu = document.querySelector(".overlay-menu");
const mobileLinks = document.querySelectorAll(".link-menu-mobile");

// Função para abrir e fechar o menu
const toggleMenu = () => {
  menuMobile.classList.toggle("active");
};

// Função para garantir que o menu feche ao clicar em algum link
const closeMenu = () => {
  menuMobile.classList.remove("active");
  btnOpen.style.display = "block";
  btnClose.style.display = "none";
};

// Evento de click no botão abrir o menu
btnOpen.addEventListener("click", () => {
  btnOpen.style.display = "none";
  btnClose.style.display = "block";
});

// Evento de click no botão fechar o menu
btnClose.addEventListener("click", () => {
  btnOpen.style.display = "block";
  btnClose.style.display = "none";
});

// Evento de click no overlay quando abrir o menu
overlayMenu.addEventListener("click", () => {
  btnOpen.style.display = "block";
  btnClose.style.display = "none";
});

// O forEach vai iterar item por item e adicionar o evento de clique em cada link do menu, quando o usuario clicar em qualquer link o menu fecha e os icones de abrir e fechar alteram dinâmicamente
mobileLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Evento de click para abrir e fechar o menu
btnOpen.addEventListener("click", toggleMenu);
btnClose.addEventListener("click", toggleMenu);
overlayMenu.addEventListener("click", toggleMenu);
