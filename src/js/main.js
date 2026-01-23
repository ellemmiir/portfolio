
document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    ru: {
      meta: {
        title: "Портфолио",
        lang: "ru",
      },
      header: {
        logoAlt: "Логотип",
        menu: {
          about: "ОБО МНЕ",
          skills: "НАВЫКИ",
          works: "РАБОТЫ",
          contact: "КОНТАКТЫ",
        },
        welcome: "ДОБРО ПОЖАЛОВАТЬ В ПОРТФОЛИО",
      },
      about: {
        title: "Обо мне",
        greeting: "Привет!",
        p1: "Я не из тех, кто много говорит о себе и предпочитаю, чтобы моя работа говорила за меня. Навыкам можно обучить, личность же дана раз и навсегда. Я бегу от пустых споров и предпочитаю тихую работу, где нет места чужому тщеславию. Достаточно уверена в себе, обладаю неиссякаемым любопытством и стремлением становиться лучше.",
        p2: "Я ценю порядок, придерживаюсь минимализма, ищу изящные решения и верю, что дьявол кроется в деталях. Мне нравится хорошая литература, компьютерные игры и стрельба из лука. И, конечно, писать код, оживлять идеи и постоянно учиться чему-то новому. Меня манит мир фронтенда, и я хочу воплощать амбициозные замыслы вместе с позитивными людьми. Больше обо мне в резюме.",
        p3: "«Твои возможности безграничны. Единственный предел - твой разум.»",
        date: "Апрель 2025",
        langBtn: "ENG",
      },
      skills: {
        title: "Навыки",
        html: "HTML",
        css: "CSS/SCSS",
        js: "JS",
        react: "React (*грустный вздох*)",
        eating: "Поедание яблок",
        note: "*Все оценки субъективны, но я реалист",
      },
      works: {
        title: "Работы",
        corporate: "Корпоративный сайт",
        landing: "Лендинг",
        game: "Игра",
        store: "Интернет-магазин",
        webpage: "Веб-страница",
        spa: "SPA",
        view: "Посмотреть проект",
      },
      resume: {
        click: "Нажми на меня",
        title: "РЕЗЮМЕ",
      },
      footer: {
        telephone: "Телефон:",
        vk: "ВК:",
        telegram: "Телеграм:",
        github: "GitHub:",
        copyright: "© Портфолио 2026 - Разработано Анастасией Пановой",
      },
    },
    en: {
      meta: {
        title: "Portfolio",
        lang: "en",
      },
      header: {
        logoAlt: "Logo",
        menu: {
          about: "ABOUT",
          skills: "SKILLS",
          works: "WORKS",
          contact: "CONTACT",
        },
        welcome: "WELCOME TO PORTFOLIO",
      },
      about: {
        title: "About",
        greeting: "Hello!",
        p1: "I don't like to talk a lot about myself. I want to be defined by the work I've done. Skills can be taught, personality is inherent. I'm quietly confident, naturally curious, and perpetually working on improving my skills. I like to code things from scratch, enjoy bringing ideas to life in the browser and constantly learn something new.",
        p2: "Well-organised person, minimalist, perfectionist, problem solver with high attention to detail. Fan of literature, computer games, archery and apples. Interested in the entire frontend spectrum and working on ambitious projects with positive people. I want to avoid subjective pissing-matches, and enjoy quiet work where egos are out of the equation. More about me in my resume.",
        p3: '"Your possibilities are infinite. Your mind is your only limit."',
        date: "April 2025",
        langBtn: "RU",
      },
      skills: {
        title: "Skills",
        html: "HTML",
        css: "CSS/SCSS",
        js: "JS",
        react: "React (*sad sigh*)",
        eating: "Eating the apples",
        note: "*All assessments are subjective, but I'm a realist",
      },
      works: {
        title: "Works",
        corporate: "Corporate website",
        landing: "Landing page",
        game: "Game",
        store: "Online store",
        webpage: "Webpage",
        spa: "SPA",
        view: "View project",
      },
      resume: {
        click: "Click me",
        title: "RESUME",
      },
      footer: {
        telephone: "Telephone:",
        vk: "VK:",
        telegram: "Telegram:",
        github: "GitHub:",
        copyright: "© Portfolio 2026 - Developed by Anastasia Panova",
      },
    },
  };

  // Темы
  class ThemeManager {
    constructor() {
      this.themes = ["dark", "light"];
      this.currentTheme = "dark";
      this.init();
    }

    init() {
      this.detectTheme();
      this.applyTheme(this.currentTheme);
      this.initThemeButton();
    }

    detectTheme() {
      const savedTheme = localStorage.getItem("preferredTheme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)",
      ).matches;

      if (savedTheme && this.themes.includes(savedTheme)) {
        this.currentTheme = savedTheme;
      } else if (prefersLight) {
        this.currentTheme = "light";
      } else {
        this.currentTheme = "dark";
      }
    }

    applyTheme(theme) {
      if (!this.themes.includes(theme)) return;

      this.currentTheme = theme;
      localStorage.setItem("preferredTheme", theme);
      document.documentElement.setAttribute("data-theme", theme);

      this.updateThemeButton();
    }

    updateThemeButton() {
      const btn = document.getElementById("theme-toggle");
      if (btn) {
        const label =
          this.currentTheme === "dark"
            ? "Switch to light theme"
            : "Switch to dark theme";
        btn.setAttribute("aria-label", label);
      }
    }

    toggleTheme() {
      const newTheme = this.currentTheme === "dark" ? "light" : "dark";
      this.applyTheme(newTheme);
      this.animateTransition();
    }

    animateTransition() {
      const content = document.querySelector("main") || document.body;
      content.style.opacity = "0.8";
      content.style.transition = "opacity 0.3s ease";

      setTimeout(() => {
        content.style.opacity = "1";
      }, 300);
    }

    initThemeButton() {
      const themeBtn = document.getElementById("theme-toggle");
      if (themeBtn) {
        themeBtn.addEventListener("click", () => this.toggleTheme());
      }
    }
  }

  const themeManager = new ThemeManager();

  // ПЕРЕВОД 
  class I18n {
    constructor() {
      this.translations = translations;
      this.currentLang = "en";
      this.init();
    }

    init() {
      this.detectLanguage();
      this.applyLanguage(this.currentLang);
      this.initListeners();
    }

    detectLanguage() {
      const savedLang = localStorage.getItem("preferredLanguage");
      const browserLang = navigator.language.split("-")[0];

      if (savedLang && (savedLang === "ru" || savedLang === "en")) {
        this.currentLang = savedLang;
      } else if (browserLang === "ru") {
        this.currentLang = "ru";
      } else {
        this.currentLang = "en";
      }
    }

    applyLanguage(lang) {
      if (!this.translations || !this.translations[lang]) return;

      this.currentLang = lang;
      localStorage.setItem("preferredLanguage", lang);
      document.documentElement.lang = lang;
      document.title = this.translations[lang].meta.title;

      this.updateAllTranslations();
      this.updateLanguageButton();
      this.updateRussianTextClasses();
    }

    updateAllTranslations() {
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const value = this.getTranslation(key);
        if (value !== undefined) element.textContent = value;
      });

      document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
        const key = element.dataset.i18nAlt;
        const value = this.getTranslation(key);
        if (value !== undefined) element.alt = value;
      });
    }

    getTranslation(key) {
      if (!this.translations || !this.translations[this.currentLang])
        return undefined;

      const keys = key.split(".");
      let value = this.translations[this.currentLang];

      for (const k of keys) {
        if (value && value[k] !== undefined) {
          value = value[k];
        } else {
          return undefined;
        }
      }
      return value;
    }

    updateLanguageButton() {
      const btn = document.getElementById("lang-toggle");
      if (btn) {
        const text = this.getTranslation("about.langBtn");
        if (text) btn.textContent = text;
      }
    }

    updateRussianTextClasses() {
      if (this.currentLang === "ru") {
        document.body.classList.add("lang-ru");
      } else {
        document.body.classList.remove("lang-ru");
      }

      const selectors = [
        ".about__info-text",
        ".skills__text",
        ".footer__text",
        ".menu__list-a",
        ".header__bottom-title",
        ".about__title",
        ".skills__title",
        ".works__title",
        ".works__item-subtitle",
        ".works__item-text",
        ".resume__text",
        ".resume__title",
        ".footer__list-a",
        ".footer__list-li span",
        ".skills__item",
      ];

      const textElements = document.querySelectorAll(selectors.join(", "));
      textElements.forEach((element) => {
        if (this.currentLang === "ru") {
          element.classList.add("ru-text");
        } else {
          element.classList.remove("ru-text");
        }
      });
    }

    toggleLanguage() {
      const newLang = this.currentLang === "en" ? "ru" : "en";
      this.applyLanguage(newLang);
      this.animateTransition();
    }

    animateTransition() {
      const content = document.querySelector("main") || document.body;
      content.style.opacity = "0.7";
      content.style.transition = "opacity 0.3s ease";

      setTimeout(() => {
        content.style.opacity = "1";
      }, 300);
    }

    initListeners() {
      const langBtn = document.getElementById("lang-toggle");
      if (langBtn) {
        langBtn.addEventListener("click", () => this.toggleLanguage());
      }

      const menuBtn = document.querySelector(".menu__btn");
      if (menuBtn) {
        menuBtn.addEventListener("click", () => {
          setTimeout(() => {
            this.updateAllTranslations();
            this.updateRussianTextClasses();
          }, 100);
        });
      }
    }
  }

  const i18n = new I18n();

  const menuBtn = document.querySelector(".menu__btn");
  const menuList = document.querySelector(".menu__list");
  const menuLinks = document.querySelectorAll(".menu__list-a");
  const body = document.body;
  const header = document.querySelector(".header__top");

  let isScrolling = false;
  let scrollTimeout;

  function smoothScrollTo(targetPosition, duration = 1200) {
    return new Promise((resolve) => {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;

      if (Math.abs(distance) < 1) {
        resolve();
        return;
      }

      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const easeInOutCubic = (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          isScrolling = false;
          resolve();
        }
      }

      isScrolling = true;
      requestAnimationFrame(animation);
    });
  }

  function getElementPosition(element) {
    if (!element) return 0;

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight : 86;

    return rect.top + scrollTop - headerHeight - 20;
  }

  function disableScroll() {
    const scrollTop = window.pageYOffset;
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollTop}px`;
    body.style.width = "100%";

    body.dataset.scrollTop = scrollTop;
  }

  function enableScroll() {
    body.style.overflow = "";
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";

    const savedScroll = parseInt(body.dataset.scrollTop) || 0;
    window.scrollTo(0, savedScroll);
  }

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    menuList.classList.toggle("show");

    if (menuList.classList.contains("show")) {
      disableScroll();
    } else {
      enableScroll();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", async function (e) {
      e.preventDefault();

      if (isScrolling) return;

      const targetId = this.getAttribute("href");

      if (targetId === "#main" || targetId === "#") {
        await smoothScrollTo(0, 1000);

        if (menuList.classList.contains("show")) {
          menuBtn.classList.remove("active");
          menuList.classList.remove("show");
          enableScroll();
        }
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      if (menuList.classList.contains("show")) {
        menuBtn.classList.remove("active");
        menuList.classList.remove("show");
        enableScroll();

        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      const targetPosition = getElementPosition(targetElement);
      await smoothScrollTo(targetPosition);
    });
  });

  window.addEventListener("resize", () => {
    clearTimeout(scrollTimeout);

    if (window.innerWidth > 991) {
      menuBtn.classList.remove("active");
      menuList.classList.remove("show");
      enableScroll();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      menuList.classList.contains("show") &&
      !e.target.closest(".menu") &&
      window.innerWidth <= 991
    ) {
      menuBtn.classList.remove("active");
      menuList.classList.remove("show");
      enableScroll();
    }
  });

  document.documentElement.style.scrollBehavior = "auto";

  // === CANVAS WAVES ===

  const canvas = document.getElementById("waves");
  if (canvas) {
    const ctx = canvas.getContext("2d");

    let width, height;
    let waveCount;
    let points;
    let waves = [];

    let mouseX = 0;
    let mouseY = 0;
    let mouseOffsetY = 0;
    let targetOffsetY = 0;

    let pixelRatio = window.devicePixelRatio || 1;

    function calculatePoints() {
      if (window.innerWidth <= 480) {
        return 10;
      } else if (window.innerWidth <= 767) {
        return 15;
      } else if (window.innerWidth <= 991) {
        return 20;
      } else {
        return 30;
      }
    }

    function calculateWaveCount() {
      if (window.innerWidth <= 767) {
        return 12;
      } else if (window.innerWidth <= 991) {
        return 14;
      } else {
        return 16;
      }
    }

    const isMobile = window.innerWidth <= 767;

    if (!isMobile) {
      window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        targetOffsetY = mouseY - height / 2 / pixelRatio;
      });

      canvas.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        targetOffsetY = mouseY - height / 2 / pixelRatio;
      });
    } else {
      mouseX = width / 2 / pixelRatio;
      mouseY = height / 2 / pixelRatio;
      targetOffsetY = 0;
    }

    if (!isMobile) {
      canvas.addEventListener(
        "touchmove",
        (e) => {
          e.preventDefault();
          const touch = e.touches[0];
          mouseX = touch.clientX;
          mouseY = touch.clientY;
          targetOffsetY = mouseY - height / 2 / pixelRatio;
        },
        { passive: false },
      );

      canvas.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
          const touch = e.touches[0];
          mouseX = touch.clientX;
          mouseY = touch.clientY;
          targetOffsetY = mouseY - height / 2 / pixelRatio;
        },
        { passive: false },
      );
    }

    function resize() {
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      canvas.style.width = displayWidth + "px";
      canvas.style.height = displayHeight + "px";

      width = canvas.width = Math.floor(displayWidth * pixelRatio);
      height = canvas.height = Math.floor(displayHeight * pixelRatio);

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      if (pixelRatio !== 1) {
        ctx.scale(pixelRatio, pixelRatio);
      }

      waveCount = calculateWaveCount();

      const wasMobile = isMobile;
      const currentIsMobile = window.innerWidth <= 767;

      if (wasMobile !== currentIsMobile) {
        if (currentIsMobile) {
          mouseX = width / 2 / pixelRatio;
          mouseY = height / 2 / pixelRatio;
          targetOffsetY = 0;
        }
      }

      points = calculatePoints();
      createWaves();
    }

    function getWaveColor(i) {
      const theme =
        document.documentElement.getAttribute("data-theme") || "dark";
      const isMobile = window.innerWidth <= 767;

      if (theme === "dark") {
        const alpha = isMobile ? 0.8 - i * 0.09 : 1 - i * 0.05;
        const gray = isMobile ? 255 - i * 18 : 255 - i * 15;
        return `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;
      } else {
        const alpha = isMobile ? 0.8 - i * 0.09 : 1 - i * 0.05;
        const gray = isMobile ? 100 + i * 10 : 80 + i * 12;
        return `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;
      }
    }

    function createWaves() {
      waves = [];

      const spacing = window.innerWidth <= 767 ? 14 : 12;
      const bottomY = height / 2 / pixelRatio + 60;

      const pointSpacing = width / pixelRatio / (points - 1);

      for (let i = 0; i < waveCount; i++) {
        const wavePoints = [];
        const baseY = bottomY - i * spacing;

        for (let j = 0; j < points; j++) {
          const offset = Math.random() * 1000 + Math.random() * 50;
          const amplitude = window.innerWidth <= 767 ? 6 : 10;
          const frequency = window.innerWidth <= 767 ? 0.15 : 0.1;
          const waveMotion = Math.sin(offset + j * frequency) * amplitude;

          wavePoints.push({
            x: pointSpacing * j,
            y: baseY + waveMotion,
            baseY: baseY,
            offset: offset,
            amplitude: amplitude,
          });
        }

        waves.push({
          points: wavePoints,
          color: getWaveColor(i),
        });
      }
    }

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (pixelRatio !== 1) {
        ctx.scale(pixelRatio, pixelRatio);
      }

      if (window.innerWidth <= 767) {
        mouseX = width / 2 / pixelRatio;
        mouseY = height / 2 / pixelRatio;
        mouseOffsetY = 0;
        targetOffsetY = 0;
      } else {
        mouseOffsetY = lerp(mouseOffsetY, targetOffsetY, 0.05);
      }

      const mouseInfluence = window.innerWidth <= 767 ? 0 : 0.15;
      const mouseRadius = window.innerWidth <= 767 ? 0 : width / pixelRatio / 8;

      for (let j = 0; j < points; j++) {
        for (let i = 0; i < waveCount; i++) {
          const p = waves[i].points[j];
          p.offset += 0.008;

          const frequency = window.innerWidth <= 767 ? 0.15 : 0.1;
          const waveMotion = Math.sin(p.offset + j * frequency) * p.amplitude;

          let neighborDeviation = 0;
          let count = 0;
          if (i > 0) {
            neighborDeviation +=
              waves[i - 1].points[j].y - waves[i - 1].points[j].baseY;
            count++;
          }
          if (i < waveCount - 1) {
            neighborDeviation +=
              (waves[i + 1].points[j].y - waves[i + 1].points[j].baseY) * 0.85;
            count++;
          }
          if (count > 0) neighborDeviation /= count;

          const layerOffset = (waveCount - i) * 0.3;

          let mouseEffect = 0;
          if (i === 0 && window.innerWidth > 767) {
            const dist = Math.abs(p.x - mouseX);
            if (dist < mouseRadius) {
              mouseEffect =
                mouseOffsetY * (1 - dist / mouseRadius) * mouseInfluence;
            }
          }

          p.y = lerp(
            p.y,
            p.baseY +
              waveMotion +
              neighborDeviation * 0.95 +
              layerOffset +
              mouseEffect,
            0.05,
          );
        }
      }

      for (let i = 0; i < waveCount; i++) {
        const wave = waves[i];
        const pts = wave.points;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);

        for (let j = 0; j < pts.length - 1; j++) {
          const cpx = (pts[j].x + pts[j + 1].x) / 2;
          const cpy = (pts[j].y + pts[j + 1].y) / 2;
          ctx.quadraticCurveTo(pts[j].x, pts[j].y, cpx, cpy);
        }

        const last = pts[pts.length - 1];
        ctx.lineTo(last.x, last.y);

        wave.color = getWaveColor(i);
        ctx.strokeStyle = wave.color;

        if (window.innerWidth <= 767) {
          ctx.lineWidth = 0.9;
        } else {
          ctx.lineWidth = 1;
        }

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
      pixelRatio = window.devicePixelRatio || 1;
      resize();
    });

    resize();
    draw();
  }
});
