document.addEventListener("DOMContentLoaded", () => {
  
 const menuBtn = document.querySelector(".menu__btn");
  const menuList = document.querySelector(".menu__list");
  const menuLinks = document.querySelectorAll(".menu__list-a");
  const body = document.body;
  const header = document.querySelector('.header__top');
  
  let isScrolling = false;
  let scrollTimeout;


  function smoothScrollTo(targetPosition, duration = 1200) {
    return new Promise((resolve) => {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
   м
      if (Math.abs(distance) < 1) {
        resolve();
        return;
      }
      
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        

        const easeInOutCubic = t => t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + (distance * easeInOutCubic(progress)));
        
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
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollTop}px`;
    body.style.width = '100%';
    

    body.dataset.scrollTop = scrollTop;
  }

  function enableScroll() {
    body.style.overflow = '';
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    

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

  menuLinks.forEach(link => {
    link.addEventListener('click', async function(e) {
      e.preventDefault();
      

      if (isScrolling) return;
      
      const targetId = this.getAttribute('href');

      if (targetId === '#main' || targetId === '#') {
        await smoothScrollTo(0, 1000);
        
        if (menuList.classList.contains('show')) {
          menuBtn.classList.remove('active');
          menuList.classList.remove('show');
          enableScroll();
        }
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      if (menuList.classList.contains('show')) {
        menuBtn.classList.remove('active');
        menuList.classList.remove('show');
        enableScroll();
        
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      const targetPosition = getElementPosition(targetElement);
      await smoothScrollTo(targetPosition);
    });
  });

  window.addEventListener('resize', () => {
    clearTimeout(scrollTimeout);
    
    if (window.innerWidth > 991) {
      menuBtn.classList.remove('active');
      menuList.classList.remove('show');
      enableScroll();
    }
  });

  document.addEventListener('click', (e) => {
    if (menuList.classList.contains('show') && 
        !e.target.closest('.menu') && 
        window.innerWidth <= 991) {
      menuBtn.classList.remove('active');
      menuList.classList.remove('show');
      enableScroll();
    }
  });

  document.documentElement.style.scrollBehavior = 'auto';



const canvas = document.getElementById("waves");
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
    { passive: false }
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
    { passive: false }
  );
}

function resize() {
  const displayWidth = window.innerWidth;
  const displayHeight = window.innerHeight;
  
  canvas.style.width = displayWidth + 'px';
  canvas.style.height = displayHeight + 'px';
  
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


function createWaves() {
  waves = [];

  const spacing = window.innerWidth <= 767 ? 14 : 12;
  const bottomY = height / 2 / pixelRatio + 60;

  const pointSpacing = (width / pixelRatio) / (points - 1);

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

    const alpha = window.innerWidth <= 767 
      ? 0.8 - i * 0.09 
      : 1 - i * 0.05;
    const gray = window.innerWidth <= 767
      ? 255 - i * 18    
      : 255 - i * 15;
    const color = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;

    waves.push({
      points: wavePoints,
      color: color,
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
  const mouseRadius = window.innerWidth <= 767 ? 0 : (width / pixelRatio) / 8;

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
        0.05
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

    ctx.strokeStyle = wave.color;
    
    if (window.innerWidth <= 767) {
      ctx.lineWidth = 0.9; 
    } else {
      ctx.lineWidth = 1;
    }
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
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




   const langBtn = document.getElementById("lang-toggle");
   const aboutInfo = document.querySelector(".about__info");
   let isEnglish = true;

   const texts = {
     en: {
       title: "Hello!",
       p1: `I don't like to talk a lot about myself. I want to be defined by the work I've done. Skills can be taught, personality is inherent. I'm quietly confident, naturally curious, and perpetually working on improving my skills. I like to code things from scratch, enjoy bringing ideas to life in the browser and constantly learn something new.`,
       p2: `Well-organised person, minimalist, perfectionist, problem solver with high attention to detail. Fan of literature, computer games, archery and apples. Interested in the entire frontend spectrum and working on ambitious projects with positive people. I want to avoid subjective pissing-matches, and enjoy quiet work where egos are out of the equation. More about me in my resume.`,
       p3: `"Your possibilities are infinite. Your mind is your only limit."`,
       date: "April 2025",
       button: "RU",
     },
     ru: {
       title: "Привет!",
       p1: `Я не из тех, кто много говорит о себе и предпочитаю, чтобы моя работа говорила за меня. Навыкам можно обучить, личность же дана раз и навсегда. Я бегу от пустых споров и предпочитаю тихую работу, где нет места чужому тщеславию. Достаточно уверена в себе, обладаю неиссякаемым любопытством и стремлением становиться лучше.`,
       p2: ` Я ценю порядок, придерживаюсь минимализма, ищу изящные решения и верю, что дьявол кроется в деталях. Мне нравится хорошая литература, компьютерные игры и стрельба из лука. И, конечно, писать код, оживлять  идеи и постоянно учиться чему-то новому. Меня манит мир фронтенда, и я хочу воплощать амбициозные замыслы вместе с позитивными людьми. Больше обо мне в резюме.`,
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


