const cardsData = [
  {
    title: "Лесная тишина",
    desc: "Глубокий оттиск на хлопке. Для длинных писем и самых важных признаний.",
    format: "A5",
    image: "assets/cards/forest.jpg",
  },
  {
    title: "Мгновение",
    desc: "Компактный формат для лаконичных мыслей. Идеально для вложений в букет.",
    format: "A6",
    image: "assets/cards/snake.jpg",
  },
];

const quotes = [
  "«Семья — это не только кровь, это те, кто держит тебя за руку в тишине».",
  "«Память — это единственный способ победить время».",
  "«В мире, где слишком много шума, истина рождается в тишине».",
];

const heroImages = ["2.jpg", "4.jpg"];

function renderGallery() {
  const container = document.getElementById("catalog-container");
  if (!container) return;

  container.innerHTML = cardsData
    .map((card) => {
      const formatClass = card.format === "A5" ? "card-a5" : "card-a6";
      return `
            <div class="product-card ${formatClass}">
                <div class="product-image-wrapper">
                    <img src="${card.image}" alt="${card.title}">
                    <div class="size-tag">${card.format}</div>
                </div>
                <div class="product-info">
                    <h3>${card.title}</h3>
                    <p>${card.desc}</p>
                </div>
            </div>
        `;
    })
    .join("");
}

function init() {
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
}

window.addEventListener("DOMContentLoaded", init);
