document.addEventListener("DOMContentLoaded", () => {
  
  const menuBtn = document.querySelector(".menu__btn");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
  });

  //------------------Волны--------------------------
  const canvas = document.getElementById("waves");
  const ctx = canvas.getContext("2d");

  let width, height;
  const waveCount = 14;
  const points = 30;
  let waves = [];

  let mouseX = 0;
  let mouseY = 0;
  let mouseOffsetY = 0;
  let targetOffsetY = 0;

  // Обновляем позицию мыши
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    targetOffsetY = mouseY - height / 2;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createWaves();
  }

  //создаем волны
  function createWaves() {
    waves = [];
    const spacing = 12;
    const bottomY = height / 2 + 60;

    //линии
    for (let i = 0; i < waveCount; i++) {
      const wavePoints = [];
      const baseY = bottomY - i * spacing;

      //точки на линии
      for (let j = 0; j < points; j++) {
        const offset = Math.random() * 1000 + Math.random() * 50;
        const amplitude = 10;
        const waveMotion = Math.sin(offset + j * 0.1) * amplitude;

        wavePoints.push({
          x: (width / (points - 1)) * j,
          y: baseY + waveMotion,
          baseY: baseY,
          offset: offset,
          amplitude: amplitude,
        });
      }

      //цвет и прозрачность
      const alpha = 1 - i * 0.05;
      const gray = 255 - i * 15;
      const color = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;

      waves.push({
        points: wavePoints,
        color: color,
      });
    }
  }

  //сглаживание движения
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  //чистим канвас
  function draw() {
    ctx.clearRect(0, 0, width, height);

    // плавно подстраиваемся к новой позиции мыши
    mouseOffsetY = lerp(mouseOffsetY, targetOffsetY, 0.05);

    for (let j = 0; j < points; j++) {
      for (let i = 0; i < waveCount; i++) {
        const p = waves[i].points[j];
        p.offset += 0.008;

        const waveMotion = Math.sin(p.offset + j * 0.1) * p.amplitude;

        //взаимодействие линий между собой
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

        // эффект мышки только для первой линии и ближних точек
        let mouseEffect = 0;
        if (i === 0) {
          const dist = Math.abs(p.x - mouseX);
          const influenceRadius = width / 8;
          if (dist < influenceRadius) {
            mouseEffect = mouseOffsetY * (1 - dist / influenceRadius) * 0.15;
          }
        }

        p.y = lerp(
          p.y,
          p.baseY +
          waveMotion +
          neighborDeviation * 0.95 +
          layerOffset +
          mouseEffect,
          0.05
        );
      }
    }

    // рисуем линии
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

      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();






   const langBtn = document.getElementById("lang-toggle");
   const aboutInfo = document.querySelector(".about__info");
   let isEnglish = true;

   const texts = {
     en: {
       title: "Hello!",
       p1: `I don't like to talk a lot about myself. I want to be defined by the work I've done. Skills can be taught, personality is inherent. I'm quietly confident, naturally curious, and perpetually working on improving my skills. I like to code things from scratch, enjoy bringing ideas to life in the browser and constantly learn something new.`,
       p2: `Well-organised person, minimalist, perfectionist, problem solver with high attention to detail. Fan of literature, computer games, rain, apples and cats. Interested in the entire frontend spectrum and working on ambitious projects with positive people. I want to avoid subjective pissing-matches, and enjoy quiet work where egos are out of the equation. More about me in my resume.`,
       p3: `"Your possibilities are infinite. Your mind is your only limit."`,
       date: "April 2025",
       button: "RU",
     },
     ru: {
       title: "Привет!",
       p1: `Я не из тех, кто много говорит о себе. Я предпочитаю, чтобы моя работа говорила за меня. Навыкам можно обучить, личность же дана раз и навсегда. Я достаточно уверена в себе, обладаю неиссякаемым любопытством и стремлением становиться лучше. 
   Люблю писать код с нуля, оживлять свои идеи и постоянно учиться чему-то новому.`,
       p2: `Я ценю порядок, придерживаюсь минимализма, ищу изящные решения и верю, что дьявол кроется в деталях. Мне нравится хорошая литература, компьютерные игры, дождь, яблоки и коты.

Меня манит мир фронтенда, и я хочу воплощать амбициозные замыслы вместе с позитивными людьми. Я бегу от пустых споров и предпочитаю тихую работу, где нет места чужому тщеславию. Больше обо мне в резюме.`,
       p3: `«Твои возможности безграничны. Единственный предел - твой разум.»`,
       date: "Апрель 2025",
       button: "ENG",
     },
   };

   const setLanguage = (lang) => {
     document.querySelector(".about__info-title").textContent =
       texts[lang].title;
     document.getElementById("p1").innerHTML = texts[lang].p1;
     document.getElementById("p2").innerHTML = texts[lang].p2;
     document.getElementById("p3").innerHTML = texts[lang].p3;
     document.querySelector(".about__info-subtitle").textContent =
       texts[lang].date;
     langBtn.textContent = texts[lang].button;

     // добавляем или убираем класс ru-text для всех параграфов
     document.querySelectorAll(".about__info-text").forEach((p) => {
       if (lang === "ru") {
         p.classList.add("ru-text");
       } else {
         p.classList.remove("ru-text");
       }
     });
   };

   langBtn.addEventListener("click", () => {
     aboutInfo.classList.add("fade-out");
     setTimeout(() => {
       isEnglish = !isEnglish;
       setLanguage(isEnglish ? "en" : "ru");
       aboutInfo.classList.remove("fade-out");
       aboutInfo.classList.add("fade-in");
       setTimeout(() => aboutInfo.classList.remove("fade-in"), 400);
     }, 300);
   });


});


