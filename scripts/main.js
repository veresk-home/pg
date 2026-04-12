/**
 * ВЕРЕСК | Мастерская авторских открыток
 * scripts/main.js
 */

const cardsData = [
  {
    title: "Физика смысла",
    desc: "Слово, оставленное в цифре, не имеет веса. Слово, отпечатанное на архивном хлопке 300 г/м² — становится документом. Глубокий оттиск и безупречная белизна. Для тех, чей интеллект требует достойного носителя.",
    format: "A6",
    price: "Цена: 800₽",
    image: "assets/cards/открытка.jpg",
    inStock: true,
    isHorizontal: false,
  },
  {
    title: "Персональный код",
    desc: "Единственный экземпляр. Ваш сюжет, препарированный и зафиксированный моими руками. Это не открытка, это материализация вашего внутреннего монолога. Право на эксклюзивную тишину в мире, который слишком много говорит.",
    format: "A6",
    price: "Цена: 1500₽",
    image: "assets/cards/Открытка память.jpg",
    inStock: true,
    isHorizontal: false,
  },
  {
    title: "Ритуал заземления",
    desc: "Апрель требует дисциплины ума.<br><br><b>В шкатулке:</b><br><br>➤ Ветка хлопка: Тактильный якорь. Прикосновение к природной фактуре возвращает внимание из виртуальных симуляций в реальное тело.<br>➤ Керамическая свеча: Точка сборки. Живое пламя как фокус для глубокой концентрации и рефлексии.<br>➤ Архивная открытка: Пространство для декомпрессии. Фактурный хлопок впитывает ваши смыслы, освобождая сознание для новых задач.<br>➤ Магнитный архив: Шкатулка для хранения ваших выгруженных мыслей. Место, где ваша история обретает покой и структуру",
    format: "BOX",
    price: "Цена: 5000₽",
    image: "assets/cards/бокс.jpg",
    inStock: true,
    isHorizontal: true,
  },
];

const quotes = [
  "«Тишина есть новая роскошь»",
  "«Только то, что имеет вес. Только то, что стоит сохранить».",
  "«Вещи, которые переживут уведомления в смартфоне».",
];

const heroImages = ["Шахматы пустой.jpg"];

/**
 * Корректировка высоты для мобильных браузеров (фикс 100vh)
 */
function updateViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

function createCardHTML(card) {
  const layoutClass = card.isHorizontal ? "horizontal" : "";

  return `
      <div class="product-card ${layoutClass}">
          <div class="product-image-wrapper">
              <img src="${card.image}" alt="${card.title}">
              </div>
          <div class="product-info">
              <h3>${card.title}</h3>
              <p>${card.desc}</p>
              <div class="product-price">${card.price}</div>
          </div>
      </div>
    `;
}

function renderGallery() {
  const stockContainer = document.getElementById("stock-container");
  if (stockContainer) {
    stockContainer.innerHTML = cardsData
      .filter((card) => card.inStock)
      .map(createCardHTML)
      .join("");
  }
}

function initSlider() {
  const track = document.querySelector(".slider-track");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const nextBtn = document.querySelector(".slider-btn.next");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const dotsContainer = document.querySelector(".slider-dots");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;

  dotsContainer.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => updateSlider(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateSlider(index) {
    currentIndex = index;
    const width = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * width}px)`;

    dots.forEach((d) => d.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider(currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider(currentIndex);
    });
  }

  window.addEventListener("resize", () => {
    setTimeout(() => {
      updateSlider(currentIndex);
      updateViewportHeight(); // Обновляем высоту при повороте экрана
    }, 100);
  });
}

/**
 * Главная инициализация
 */
function init() {
  // Сразу считаем высоту экрана
  updateViewportHeight();

  const hero = document.getElementById("hero");
  const quoteEl = document.getElementById("dynamic-quote");

  if (hero) {
    const randomImg = heroImages[Math.floor(Math.random() * heroImages.length)];
    hero.style.backgroundImage = `url('assets/hero-bg/${randomImg}')`;
  }

  if (quoteEl) {
    quoteEl.innerText = quotes[Math.floor(Math.random() * quotes.length)];
  }

  renderGallery();
  initSlider();
}

window.addEventListener("DOMContentLoaded", init);
