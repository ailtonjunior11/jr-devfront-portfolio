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
  const skills = document.querySelector("#skills");
  const skillsTitle = skills?.querySelector(".title-section");
  const skillsSubtitle = skills?.querySelector(".sub-title-skills");
  const skillItems = skills?.querySelectorAll(".skill-item");
  const skillIcons = skills?.querySelectorAll(".skill-item img");
  const skillsStatus = skills?.querySelector(".skills-status");
  const projects = document.querySelector("#projects");
  const projectsTitle = projects?.querySelector(".title-section");
  const projectCards = projects?.querySelectorAll(".card");
  const projectImages = projects?.querySelectorAll(".image-card img");
  const contacts = document.querySelector("#contacts");
  const contactsTitle = contacts?.querySelector(".title-section");
  const contactsIntro = contacts?.querySelector(".contacts-intro");
  const contactCards = contacts?.querySelectorAll(".card-contact");
  const contactIcons = contacts?.querySelectorAll(".card-contact img");
  const contactsStatus = contacts?.querySelector(".content-final-text");
  const footer = document.querySelector("footer");
  const footerColumns = footer?.querySelectorAll(".content-footer > *");

  // Isso evita erros caso o script seja carregado em uma página que não tenha esses elementos. Configuração seção hero
  if (!hero || !browserWindow || !window.gsap || !window.ScrollTrigger) return;

  // Registro do plugin GSAP
  gsap.registerPlugin(ScrollTrigger);

  // O código verifica se o usuário prefere menos animações
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Efeito da barra de scroll suave
  if (!motion.matches && window.Lenis) {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (value) => 1 - Math.pow(1 - value, 4),
      smoothWheel: true,
      smoothTouch: false,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 500));
    gsap.ticker.lagSmoothing(0);
  }

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
        skillsTitle,
        skillsSubtitle,
        ...(skillItems ? [...skillItems] : []),
        ...(skillIcons ? [...skillIcons] : []),
        skillsStatus,
        projectsTitle,
        ...(projectCards ? [...projectCards] : []),
        ...(projectImages ? [...projectImages] : []),
        contactsTitle,
        contactsIntro,
        ...(contactCards ? [...contactCards] : []),
        ...(contactIcons ? [...contactIcons] : []),
        contactsStatus,
        ...(footerColumns ? [...footerColumns] : []),
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

  // Configuração seção skills
  if (skills) {
    const skillsTimeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: skills,
        start: "top 72%",
        end: "+=900",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    skillsTimeline
      .from(skillsTitle, { y: 35, opacity: 0, duration: 0.6 })
      .from(skillsSubtitle, { y: 20, opacity: 0, duration: 0.45 }, "<0.15")
      .from(
        skillItems,
        { y: 45, opacity: 0, scale: 0.96, stagger: 0.16, duration: 0.7 },
        "<0.15",
      )
      .from(
        skillIcons,
        { scale: 0, rotate: -25, opacity: 0, stagger: 0.16, duration: 0.5 },
        "<0.15",
      )
      .from(skillsStatus, { y: 20, opacity: 0, duration: 0.5 }, "<0.2");
  }

  // Configuração seção projetos
  if (projects) {
    const projectsTimeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: projects,
        start: "top 72%",
        end: "+=1100",
        scrub: 0.35,
        invalidateOnRefresh: true,
      },
    });

    gsap.set(projectCards, { autoAlpha: 0, y: 28 });

    projectsTimeline
      .from(projectsTitle, {
        y: 40,
        opacity: 0,
        duration: 0.6,
      })
      .to(
        projectCards,
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.45,
        },
        "<0.2",
      );

    projectsTimeline.from(
      projectImages,
      { scale: 1.14, duration: 0.8, stagger: 0.12 },
      "<0.15",
    );
  }

  // Configuração seção contatos
  if (contacts) {
    const contactsTimeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: contacts,
        start: "top 72%",
        end: "+=900",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    contactsTimeline
      .from(contactsTitle, { y: 35, opacity: 0, duration: 0.6 })
      .from(contactsIntro, { y: 20, opacity: 0, duration: 0.45 }, "<0.15")
      .from(
        contactCards,
        { opacity: 0, stagger: 0.14, duration: 0.55 },
        "<0.15",
      )
      .from(
        contactIcons,
        { scale: 0.75, opacity: 0, stagger: 0.14, duration: 0.45 },
        "<0.15",
      )
      .from(contactsStatus, { y: 20, opacity: 0, duration: 0.5 }, "<0.2");

    contactCards?.forEach((card) => {
      const icon = card.querySelector("img");

      card.addEventListener("mouseenter", () => {
        gsap.to(icon, { y: -6, rotate: 4, duration: 0.35, overwrite: true });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(icon, { y: 0, rotate: 0, duration: 0.35, overwrite: true });
      });
    });
  }

  // Configurações seção footer
  if (footer) {
    gsap.from(footerColumns, {
      y: 25,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      scrollTrigger: {
        trigger: footer,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  }

  window.addEventListener("resize", () => ScrollTrigger.refresh());
})();
