(() => {
  const hero = document.querySelector("#hero");
  const browserWindow = document.querySelector(".browser-window");
  const browserLayout = document.querySelector(".browser-layout");
  const browserCards = document.querySelectorAll(".browser-card");
  const sceneTags = document.querySelectorAll(".scene-tag");
  const codeFragment = document.querySelector(".code-fragment");
  const sceneOrbit = document.querySelector(".scene-orbit");

  // Isso evita erros caso o script seja carregado em uma página que não tenha esses elementos.
  if (!hero || !browserWindow || !window.gsap || !window.ScrollTrigger) return;

  // Registro do plugin GSAP
  gsap.registerPlugin(ScrollTrigger);

  // O código verifica se o usuário prefere menos animações
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Se essa preferência estiver ativa, o GSAP remove transformações e opacidades animadas
  if (motion.matches) {
    gsap.set(
      [
        browserWindow,
        browserLayout,
        ...browserCards,
        ...sceneTags,
        codeFragment,
      ],
      {
        clearProps: "transform,opacity",
      },
    );
    return;
  } // Assim, a hero continua visível, mas sem movimento intenso

  // Timeline do ScrollTrigger. A timeline é criada assim:
  const heroTimeline = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "+=1500",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  heroTimeline
    .to(browserWindow, {
      rotateY: 0,
      rotateX: 0,
      rotateZ: 0,
      x: -30,
      scale: 1.04,
      duration: 1,
    })
    .from(
      browserLayout.children,
      { y: 28, opacity: 0, stagger: 0.12, duration: 0.7 },
      "<0.15",
    )
    .from(
      sceneTags,
      { scale: 0, opacity: 0, stagger: 0.1, duration: 0.4 },
      "<0.2",
    )
    .from(codeFragment, { y: 30, opacity: 0, duration: 0.5 }, "<0.1")
    .to(sceneOrbit, { x: 430, y: 150, scale: 0.6, duration: 1.3 }, "<")
    .to(browserLayout, { rotate: -2, scale: 0.94, duration: 1 })
    .to(
      hero.querySelector(".hero-content"),
      { x: -80, opacity: 0, duration: 0.8 },
      "<",
    )
    .to(browserWindow, { y: -70, scale: 1.12, duration: 1 });

  window.addEventListener("resize", () => ScrollTrigger.refresh());
})();
