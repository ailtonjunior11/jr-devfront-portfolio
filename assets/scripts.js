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

// Função / Evento de fechamento pela tecla "Escape"
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuMobile.classList.contains("active")) {
    closeMenu();
  }
});

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
btnClose.addEventListener("click", closeMenu);
overlayMenu.addEventListener("click", closeMenu);

// Para interromper o vídeo quando o usuário prefere menos movimento
const videos = document.querySelectorAll(".video-background");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const updateVideoMotion = () => {
  videos.forEach((video) => {
    if (reducedMotion.matches) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  });
};

updateVideoMotion();
reducedMotion.addEventListener("change", updateVideoMotion);
