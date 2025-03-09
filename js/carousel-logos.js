// clonar los logos
const marcoCarousel = document.querySelector(".marco-carousel-trademarks");
const carouselTrademarks = document.querySelector(".carousel-trademarks");
const sliderTrademarks = document.querySelector(".slider-trademarks");
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// Obtiene todos los hijos
const hijos = Array.from(sliderTrademarks.children);

// Clona cada hijo y lo agrega al padre (duplicando el contenido)
hijos.forEach(hijo => {
    const clon = hijo.cloneNode(true); // true para clonar hijos internos
    sliderTrademarks.appendChild(clon);
});

// cuando el usuario deja el puntero por mucho tiempo de pausa el movimiento

function cambiarVelocidadSlider(boolean) {
  if (boolean) {
  sliderTrademarks.style.animationDuration = `calc(${sliderTrademarks.children.length} * 1s)`;
  } else {
  sliderTrademarks.style.animationDuration = `calc(${sliderTrademarks.children.length} * 2s)`;
  }
}

// Evento único para "resize"
window.addEventListener("resize", () => {
  cambiarVelocidadSlider(window.innerWidth <= 650);
});

// Llamada inicial para aplicar los estilos según el tamaño de la ventana al cargar
cambiarVelocidadSlider(window.innerWidth <= 650);

if (!isMobile) {

let timeout;

sliderTrademarks.addEventListener("mouseover", () => {
  clearTimeout(timeout); // Limpia el timeout anterior si existe
  timeout = setTimeout(() => {
    sliderTrademarks.classList.add("paused"); // Aplica la clase al contenedor
  }, 500);
});

sliderTrademarks.addEventListener("mouseleave", () => {
  clearTimeout(timeout); // Evita que se aplique si el mouse sale antes de 2s
  sliderTrademarks.classList.remove("paused"); // Quita la pausa
});

};





