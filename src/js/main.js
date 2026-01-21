document.addEventListener("DOMContentLoaded", () => {
  
// const menuBtn = document.querySelector(".menu__btn");
// const menuList = document.querySelector(".menu__list");
// const menuLinks = document.querySelectorAll(".menu__list-a");

// menuBtn.addEventListener("click", () => {
//   menuBtn.classList.toggle("active");
//   menuList.classList.toggle("show");
// });

// menuLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();

//     const targetId = link.getAttribute("href");
//     const targetElement = document.querySelector(targetId);

//     if (targetElement) {
//       menuBtn.classList.remove("active");
//       menuList.classList.remove("show");

//       setTimeout(() => {
//         targetElement.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }, 300); 
//     }
//   });
// });

// window.addEventListener("resize", () => {
//   if (window.innerWidth > 991) {
//     menuBtn.classList.remove("active");
//     menuList.classList.remove("show");
//   }
// });



// const menuBtn = document.querySelector(".menu__btn");
// const menuList = document.querySelector(".menu__list");
// const menuLinks = document.querySelectorAll(".menu__list-a");
// const body = document.body;

// menuBtn.addEventListener("click", () => {
//   menuBtn.classList.toggle("active");
//   menuList.classList.toggle("show");
  
//   // Блокировка/разблокировка скролла
//   if (menuList.classList.contains("show")) {
//     body.classList.add("body-no-scroll");
//   } else {
//     body.classList.remove("body-no-scroll");
//   }
// });

// menuLinks.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();

//     const targetId = link.getAttribute("href");
//     const targetElement = document.querySelector(targetId);

//     if (targetElement) {
//       // Скрываем меню
//       menuBtn.classList.remove("active");
//       menuList.classList.remove("show");
//       body.classList.remove("body-no-scroll"); // Разблокируем скролл

//       setTimeout(() => {
//         targetElement.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }, 300); 
//     }
//   });
// });

// window.addEventListener("resize", () => {
//   if (window.innerWidth > 991) {
//     menuBtn.classList.remove("active");
//     menuList.classList.remove("show");
//     body.classList.remove("body-no-scroll"); // Гарантируем разблокировку
//   }
// });

// // Дополнительно: закрытие меню при клике вне его
// document.addEventListener("click", (e) => {
//   if (menuList.classList.contains("show") && 
//       !e.target.closest(".menu") && 
//       window.innerWidth <= 991) {
//     menuBtn.classList.remove("active");
//     menuList.classList.remove("show");
//     body.classList.remove("body-no-scroll");
//   }
// });



 const menuBtn = document.querySelector(".menu__btn");
  const menuList = document.querySelector(".menu__list");
  const menuLinks = document.querySelectorAll(".menu__list-a");
  const body = document.body;
  const header = document.querySelector('.header__top');
  
  let isScrolling = false;
  let scrollTimeout;

  // Функция для плавного скролла
  function smoothScrollTo(targetPosition, duration = 1200) {
    return new Promise((resolve) => {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      
      // Если расстояние маленькое или мы уже на месте, сразу завершаем
      if (Math.abs(distance) < 1) {
        resolve();
        return;
      }
      
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // easing function для плавности
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

  // Функция для получения позиции элемента с учетом хедера
  function getElementPosition(element) {
    if (!element) return 0;
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight : 86;
    
    // Возвращаем позицию с отступом от хедера
    return rect.top + scrollTop - headerHeight - 20; // +20px дополнительный отступ
  }

  // Блокировка скролла
  function disableScroll() {
    const scrollTop = window.pageYOffset;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollTop}px`;
    body.style.width = '100%';
    
    // Сохраняем позицию скролла для восстановления
    body.dataset.scrollTop = scrollTop;
  }

  function enableScroll() {
    body.style.overflow = '';
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    
    // Восстанавливаем позицию скролла
    const savedScroll = parseInt(body.dataset.scrollTop) || 0;
    window.scrollTo(0, savedScroll);
  }

  // Управление меню
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    menuList.classList.toggle("show");
    
    if (menuList.classList.contains("show")) {
      disableScroll();
    } else {
      enableScroll();
    }
  });

  // Обработка кликов по ссылкам меню
  menuLinks.forEach(link => {
    link.addEventListener('click', async function(e) {
      e.preventDefault();
      
      // Защита от двойных кликов
      if (isScrolling) return;
      
      const targetId = this.getAttribute('href');
      
      // Если клик по ссылке на главную
      if (targetId === '#main' || targetId === '#') {
        await smoothScrollTo(0, 1000);
        
        // Закрываем меню если открыто
        if (menuList.classList.contains('show')) {
          menuBtn.classList.remove('active');
          menuList.classList.remove('show');
          enableScroll();
        }
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Закрываем меню если открыто
      if (menuList.classList.contains('show')) {
        menuBtn.classList.remove('active');
        menuList.classList.remove('show');
        enableScroll();
        
        // Ждем немного перед скроллом, чтобы меню закрылось
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Получаем позицию и скроллим
      const targetPosition = getElementPosition(targetElement);
      await smoothScrollTo(targetPosition);
    });
  });

  // Закрытие меню при ресайзе
  window.addEventListener('resize', () => {
    clearTimeout(scrollTimeout);
    
    if (window.innerWidth > 991) {
      menuBtn.classList.remove('active');
      menuList.classList.remove('show');
      enableScroll();
    }
  });

  // Закрытие меню при клике вне его
  document.addEventListener('click', (e) => {
    if (menuList.classList.contains('show') && 
        !e.target.closest('.menu') && 
        window.innerWidth <= 991) {
      menuBtn.classList.remove('active');
      menuList.classList.remove('show');
      enableScroll();
    }
  });

  // Убираем нативный smooth scroll из html
  document.documentElement.style.scrollBehavior = 'auto';


  //------------------Волны--------------------------
  // const canvas = document.getElementById("waves");
  // const ctx = canvas.getContext("2d");

  // let width, height;
  // const waveCount = 14;
  // const points = 30;
  // let waves = [];

  // let mouseX = 0;
  // let mouseY = 0;
  // let mouseOffsetY = 0;
  // let targetOffsetY = 0;

  // // Обновляем позицию мыши
  // window.addEventListener("mousemove", (e) => {
  //   mouseX = e.clientX;
  //   mouseY = e.clientY;
  //   targetOffsetY = mouseY - height / 2;
  // });

  // function resize() {
  //   width = canvas.width = window.innerWidth;
  //   height = canvas.height = window.innerHeight;
  //   createWaves();
  // }

  // //создаем волны
  // function createWaves() {
  //   waves = [];
  //   const spacing = 12;
  //   const bottomY = height / 2 + 60;

  //   //линии
  //   for (let i = 0; i < waveCount; i++) {
  //     const wavePoints = [];
  //     const baseY = bottomY - i * spacing;

  //     //точки на линии
  //     for (let j = 0; j < points; j++) {
  //       const offset = Math.random() * 1000 + Math.random() * 50;
  //       const amplitude = 10;
  //       const waveMotion = Math.sin(offset + j * 0.1) * amplitude;

  //       wavePoints.push({
  //         x: (width / (points - 1)) * j,
  //         y: baseY + waveMotion,
  //         baseY: baseY,
  //         offset: offset,
  //         amplitude: amplitude,
  //       });
  //     }

  //     //цвет и прозрачность
  //     const alpha = 1 - i * 0.05;
  //     const gray = 255 - i * 15;
  //     const color = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;

  //     waves.push({
  //       points: wavePoints,
  //       color: color,
  //     });
  //   }
  // }

  // //сглаживание движения
  // function lerp(a, b, t) {
  //   return a + (b - a) * t;
  // }

  // //чистим канвас
  // function draw() {
  //   ctx.clearRect(0, 0, width, height);

  //   // плавно подстраиваемся к новой позиции мыши
  //   mouseOffsetY = lerp(mouseOffsetY, targetOffsetY, 0.05);

  //   for (let j = 0; j < points; j++) {
  //     for (let i = 0; i < waveCount; i++) {
  //       const p = waves[i].points[j];
  //       p.offset += 0.008;

  //       const waveMotion = Math.sin(p.offset + j * 0.1) * p.amplitude;

  //       //взаимодействие линий между собой
  //       let neighborDeviation = 0;
  //       let count = 0;
  //       if (i > 0) {
  //         neighborDeviation +=
  //           waves[i - 1].points[j].y - waves[i - 1].points[j].baseY;
  //         count++;
  //       }
  //       if (i < waveCount - 1) {
  //         neighborDeviation +=
  //           (waves[i + 1].points[j].y - waves[i + 1].points[j].baseY) * 0.85;
  //         count++;
  //       }
  //       if (count > 0) neighborDeviation /= count;

  //       const layerOffset = (waveCount - i) * 0.3;

  //       // эффект мышки только для первой линии и ближних точек
  //       let mouseEffect = 0;
  //       if (i === 0) {
  //         const dist = Math.abs(p.x - mouseX);
  //         const influenceRadius = width / 8;
  //         if (dist < influenceRadius) {
  //           mouseEffect = mouseOffsetY * (1 - dist / influenceRadius) * 0.15;
  //         }
  //       }

  //       p.y = lerp(
  //         p.y,
  //         p.baseY +
  //         waveMotion +
  //         neighborDeviation * 0.95 +
  //         layerOffset +
  //         mouseEffect,
  //         0.05
  //       );
  //     }
  //   }

  //   // рисуем линии
  //   for (let i = 0; i < waveCount; i++) {
  //     const wave = waves[i];
  //     const pts = wave.points;
  //     ctx.beginPath();
  //     ctx.moveTo(pts[0].x, pts[0].y);

  //     for (let j = 0; j < pts.length - 1; j++) {
  //       const cpx = (pts[j].x + pts[j + 1].x) / 2;
  //       const cpy = (pts[j].y + pts[j + 1].y) / 2;
  //       ctx.quadraticCurveTo(pts[j].x, pts[j].y, cpx, cpy);
  //     }

  //     const last = pts[pts.length - 1];
  //     ctx.lineTo(last.x, last.y);

  //     ctx.strokeStyle = wave.color;
  //     ctx.lineWidth = 1.5;
  //     ctx.stroke();
  //   }

  //   requestAnimationFrame(draw);
  // }

  // window.addEventListener("resize", resize);
  // resize();
  // draw();

//------------------Волны--------------------------
// const canvas = document.getElementById("waves");
// const ctx = canvas.getContext("2d");

// let width, height;
// const waveCount = 14;
// let points; // Теперь это будет переменная
// let waves = [];

// let mouseX = 0;
// let mouseY = 0;
// let mouseOffsetY = 0;
// let targetOffsetY = 0;

// // Функция для определения количества точек в зависимости от ширины экрана
// function calculatePoints() {
//   if (window.innerWidth <= 480) {
//     return 10; // Для самых маленьких экранов
//   } else if (window.innerWidth <= 767) {
//     return 15; // Для телефонов
//   } else if (window.innerWidth <= 991) {
//     return 20; // Для планшетов
//   } else {
//     return 30; // Для десктопов
//   }
// }

// // Обновляем позицию мыши
// window.addEventListener("mousemove", (e) => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
//   targetOffsetY = mouseY - height / 2;
// });

// // Для мобильных устройств - реакция на тач
// canvas.addEventListener('touchmove', (e) => {
//   e.preventDefault();
//   const touch = e.touches[0];
//   mouseX = touch.clientX;
//   mouseY = touch.clientY;
//   targetOffsetY = mouseY - height / 2;
// }, { passive: false });

// canvas.addEventListener('touchstart', (e) => {
//   e.preventDefault();
//   const touch = e.touches[0];
//   mouseX = touch.clientX;
//   mouseY = touch.clientY;
//   targetOffsetY = mouseY - height / 2;
// }, { passive: false });

// function resize() {
//   width = canvas.width = window.innerWidth;
//   height = canvas.height = window.innerHeight;
  
//   // Пересчитываем количество точек при ресайзе
//   points = calculatePoints();
  
//   createWaves();
// }

// //создаем волны
// function createWaves() {
//   waves = [];
//   const spacing = 12;
//   const bottomY = height / 2 + 60;

//   // Адаптируем расстояние между точками в зависимости от их количества
//   const pointSpacing = width / (points - 1);

//   //линии
//   for (let i = 0; i < waveCount; i++) {
//     const wavePoints = [];
//     const baseY = bottomY - i * spacing;

//     //точки на линии
//     for (let j = 0; j < points; j++) {
//       const offset = Math.random() * 1000 + Math.random() * 50;
      
//       // Адаптируем амплитуду для мобильных устройств
//       const amplitude = window.innerWidth <= 767 ? 8 : 10;
      
//       // Меняем частоту волны для меньшего количества точек
//       const frequency = window.innerWidth <= 767 ? 0.15 : 0.1;
//       const waveMotion = Math.sin(offset + j * frequency) * amplitude;

//       wavePoints.push({
//         x: pointSpacing * j,
//         y: baseY + waveMotion,
//         baseY: baseY,
//         offset: offset,
//         amplitude: amplitude,
//       });
//     }

//     //цвет и прозрачность
//     const alpha = 1 - i * 0.05;
//     const gray = 255 - i * 15;
//     const color = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;

//     waves.push({
//       points: wavePoints,
//       color: color,
//     });
//   }
// }

// //сглаживание движения
// function lerp(a, b, t) {
//   return a + (b - a) * t;
// }

// //чистим канвас
// function draw() {
//   ctx.clearRect(0, 0, width, height);

//   // Плавно подстраиваемся к новой позиции мыши/тача
//   mouseOffsetY = lerp(mouseOffsetY, targetOffsetY, 0.05);

//   // Для мобильных - меньше влияния мыши
//   const mouseInfluence = window.innerWidth <= 767 ? 0.08 : 0.15;
//   const mouseRadius = width / (window.innerWidth <= 767 ? 6 : 8);

//   for (let j = 0; j < points; j++) {
//     for (let i = 0; i < waveCount; i++) {
//       const p = waves[i].points[j];
//       p.offset += 0.008;

//       // Частота волны адаптирована для мобильных
//       const frequency = window.innerWidth <= 767 ? 0.15 : 0.1;
//       const waveMotion = Math.sin(p.offset + j * frequency) * p.amplitude;

//       //взаимодействие линий между собой
//       let neighborDeviation = 0;
//       let count = 0;
//       if (i > 0) {
//         neighborDeviation +=
//           waves[i - 1].points[j].y - waves[i - 1].points[j].baseY;
//         count++;
//       }
//       if (i < waveCount - 1) {
//         neighborDeviation +=
//           (waves[i + 1].points[j].y - waves[i + 1].points[j].baseY) * 0.85;
//         count++;
//       }
//       if (count > 0) neighborDeviation /= count;

//       const layerOffset = (waveCount - i) * 0.3;

//       // эффект мышки только для первой линии и ближних точек
//       let mouseEffect = 0;
//       if (i === 0) {
//         const dist = Math.abs(p.x - mouseX);
//         if (dist < mouseRadius) {
//           mouseEffect = mouseOffsetY * (1 - dist / mouseRadius) * mouseInfluence;
//         }
//       }

//       p.y = lerp(
//         p.y,
//         p.baseY +
//         waveMotion +
//         neighborDeviation * 0.95 +
//         layerOffset +
//         mouseEffect,
//         0.05
//       );
//     }
//   }

//   // рисуем линии
//   for (let i = 0; i < waveCount; i++) {
//     const wave = waves[i];
//     const pts = wave.points;
//     ctx.beginPath();
//     ctx.moveTo(pts[0].x, pts[0].y);

//     // Рисуем кривые Безье
//     for (let j = 0; j < pts.length - 1; j++) {
//       const cpx = (pts[j].x + pts[j + 1].x) / 2;
//       const cpy = (pts[j].y + pts[j + 1].y) / 2;
//       ctx.quadraticCurveTo(pts[j].x, pts[j].y, cpx, cpy);
//     }

//     const last = pts[pts.length - 1];
//     ctx.lineTo(last.x, last.y);

//     ctx.strokeStyle = wave.color;
//     ctx.lineWidth = window.innerWidth <= 767 ? 1 : 1.5; // Тоньше линии на мобильных
//     ctx.stroke();
//   }

//   requestAnimationFrame(draw);
// }

// window.addEventListener("resize", resize);
// resize();
// draw();



const canvas = document.getElementById("waves");
const ctx = canvas.getContext("2d");

let width, height;
const waveCount = 14;
let points; // Теперь это будет переменная
let waves = [];

let mouseX = 0;
let mouseY = 0;
let mouseOffsetY = 0;
let targetOffsetY = 0;

// Определяем, мобильное ли устройство
const isMobile = window.innerWidth <= 767;

// Функция для определения количества точек в зависимости от ширины экрана
function calculatePoints() {
  if (window.innerWidth <= 480) {
    return 10; // Для самых маленьких экранов
  } else if (window.innerWidth <= 767) {
    return 15; // Для телефонов
  } else if (window.innerWidth <= 991) {
    return 20; // Для планшетов
  } else {
    return 30; // Для десктопов
  }
}

// Обновляем позицию мыши ТОЛЬКО для десктопа
if (!isMobile) {
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    targetOffsetY = mouseY - height / 2;
  });

  // Для десктопа - реакция на мышь
  canvas.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    targetOffsetY = mouseY - height / 2;
  });
} else {
  // На мобильных - фиксируем позицию мыши по центру (никакого взаимодействия)
  mouseX = width / 2;
  mouseY = height / 2;
  targetOffsetY = 0;
}

// На мобильных устройствах НЕ добавляем обработчики тача
if (!isMobile) {
  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      mouseX = touch.clientX;
      mouseY = touch.clientY;
      targetOffsetY = mouseY - height / 2;
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
      targetOffsetY = mouseY - height / 2;
    },
    { passive: false },
  );
}

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  // Обновляем состояние isMobile при ресайзе
  const wasMobile = isMobile;
  // isMobile теперь будет определяться при каждом ресайзе
  const currentIsMobile = window.innerWidth <= 767;

  // Если перешли с мобильного на десктоп или наоборот
  if (wasMobile !== currentIsMobile) {
    // Сбрасываем позицию мыши для мобильных
    if (currentIsMobile) {
      mouseX = width / 2;
      mouseY = height / 2;
      targetOffsetY = 0;
    }
  }

  // Пересчитываем количество точек при ресайзе
  points = calculatePoints();

  createWaves();
}

//создаем волны
function createWaves() {
  waves = [];
  const spacing = 12;
  const bottomY = height / 2 + 60;

  // Адаптируем расстояние между точками в зависимости от их количества
  const pointSpacing = width / (points - 1);

  //линии
  for (let i = 0; i < waveCount; i++) {
    const wavePoints = [];
    const baseY = bottomY - i * spacing;

    //точки на линии
    for (let j = 0; j < points; j++) {
      const offset = Math.random() * 1000 + Math.random() * 50;

      // Адаптируем амплитуду для мобильных устройств
      const amplitude = window.innerWidth <= 767 ? 8 : 10;

      // Меняем частоту волны для меньшего количества точек
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

  // Для мобильных - отключаем плавное подстраивание под мышь
  if (window.innerWidth <= 767) {
    // На мобильных просто ставим мышь по центру
    mouseX = width / 2;
    mouseY = height / 2;
    mouseOffsetY = 0;
    targetOffsetY = 0;
  } else {
    // Для десктопа - плавно подстраиваемся к новой позиции мыши/тача
    mouseOffsetY = lerp(mouseOffsetY, targetOffsetY, 0.05);
  }

  // Настройки для влияния мыши (на мобильных отключаем)
  const mouseInfluence = window.innerWidth <= 767 ? 0 : 0.15;
  const mouseRadius = window.innerWidth <= 767 ? 0 : width / 8;

  for (let j = 0; j < points; j++) {
    for (let i = 0; i < waveCount; i++) {
      const p = waves[i].points[j];
      p.offset += 0.008;

      // Частота волны адаптирована для мобильных
      const frequency = window.innerWidth <= 767 ? 0.15 : 0.1;
      const waveMotion = Math.sin(p.offset + j * frequency) * p.amplitude;

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

      // эффект мышки ТОЛЬКО для десктопа и только для первой линии
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

  // рисуем линии
  for (let i = 0; i < waveCount; i++) {
    const wave = waves[i];
    const pts = wave.points;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);

    // Рисуем кривые Безье
    for (let j = 0; j < pts.length - 1; j++) {
      const cpx = (pts[j].x + pts[j + 1].x) / 2;
      const cpy = (pts[j].y + pts[j + 1].y) / 2;
      ctx.quadraticCurveTo(pts[j].x, pts[j].y, cpx, cpy);
    }

    const last = pts[pts.length - 1];
    ctx.lineTo(last.x, last.y);

    ctx.strokeStyle = wave.color;
    ctx.lineWidth = window.innerWidth <= 767 ? 1 : 1.5; // Тоньше линии на мобильных
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);

// При загрузке страницы инициализируем
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


