(() => {
  const hero = document.querySelector("#hero");
  const browserWindow = document.querySelector(".browser-window");
  const browserLayout = document.querySelector(".browser-layout");
  const browserCards = document.querySelectorAll(".browser-card");
  const sceneTags = document.querySelectorAll(".scene-tag");
  const codeFragment = document.querySelector(".code-fragment");
  const sceneOrbit = document.querySelector(".scene-orbit");
  const about = document.querySelector("#about");
  const aboutTitle = about?.querySelector(".title-section");
  const aboutSubtitle = about?.querySelector(".sub-title");
  const aboutImage = about?.querySelector(".my-img");
  const aboutLine = about?.querySelector(".about-line");
  const aboutDescriptions = about?.querySelectorAll(".description");
  const aboutIcons = about?.querySelectorAll(".description img");

  // Isso evita erros caso o script seja carregado em uma página que não tenha esses elementos. Configuração seção hero
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
        aboutTitle,
        aboutSubtitle,
        aboutImage,
        aboutLine,
        ...(aboutDescriptions ? [...aboutDescriptions] : []),
        ...(aboutIcons ? [...aboutIcons] : []),
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

  // Configuração seção sobre
  if (about) {
    const aboutTimeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: about,
        start: "top 72%",
        end: "+=1000",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    aboutTimeline
      .from(aboutTitle, { y: 35, opacity: 0, duration: 0.6 })
      .from(aboutSubtitle, { y: 25, opacity: 0, duration: 0.5 }, "<0.15")
      .from(
        aboutImage,
        {
          scale: 0.72,
          opacity: 0,
          rotate: -10,
          boxShadow: "0 0 0 rgba(32, 246, 253, 0)",
          duration: 1,
        },
        "<0.1",
      )
      .from(aboutLine, { scaleX: 0, opacity: 0, duration: 0.5 }, "<0.25")
      .from(
        aboutDescriptions,
        { x: 70, opacity: 0, stagger: 0.16, duration: 0.65 },
        "<0.15",
      )
      .from(
        aboutIcons,
        { scale: 0, rotate: -90, opacity: 0, stagger: 0.16, duration: 0.45 },
        "<0.15",
      )
      .to(
        aboutImage,
        {
          y: -25,
          rotate: 2,
          boxShadow: "0 0 38px rgba(32, 246, 253, 0.35)",
          duration: 1,
        },
        "<0.2",
      );
  }

  window.addEventListener("resize", () => ScrollTrigger.refresh());
})();
