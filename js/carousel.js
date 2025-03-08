const slider = document.getElementById('slider'),
  containerImg = document.getElementsByClassName('container-img'),
  leftButtonSlider = document.getElementById('left-button-slider'),
  rightButtonSlider = document.getElementById('right-button-slider'),
  pointers = document.getElementById('pointers'),
  dot = document.getElementsByClassName('dot');

// calcular el tamaño de los elementos y ponerlo como ancho del slider
const numElements = containerImg.length;
slider.style.width = `calc(100% * ${numElements + 2})`;

// se evalua cuantos elementos hay en el slider del html y se crean en base a ellos los dots
// no toma los clones
for (let i = 0; i < containerImg.length; i++) {
  const dotNew = document.createElement('div');
  dotNew.classList.add('dot');
  pointers.append(dotNew);
}

//obtiene la posicion de la imagen de carrusel y asi pinta la posicion del dot
function colorearDot(position) {
  if (pointers.children[position]) {
    pointers.children[position].style.backgroundColor = "white";
  } else {
    // cuando la posicion de sale del rango de la cantidad de dots, osea se encuentra en la posicion de un clon, entonces se pinta el dot
    if (position <= -1) {
      pointers.children[pointers.children.length - 1].style.backgroundColor = "white";
    } else if (position >= pointers.children.length) {
      pointers.children[0].style.backgroundColor = "white";
    }
  }
}
// cuando avanza la posicion de un dot se elimina el estilo del dot de antes
function descolorearDot(position, direction) {
  let index = direction === "right" ? position + 1 : position - 1;
  if (pointers.children[index]) {
    pointers.children[index].style.backgroundColor = "transparent";
  }
}

// Clonamos el primer y último elemento
const firstClone = containerImg[0].cloneNode(true);
const lastClone = containerImg[containerImg.length - 1].cloneNode(true);

// Insertamos los clones
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slider.firstElementChild);

// Inicialización de variables
let operacion = 0,
  counter = 1, // Empezamos en 1 porque ahora tenemos un clon al inicio
  widthImg = 100 / (containerImg.length),
  isTransitioning = false,
  counterDot = 0;

// Colocar el slider y el dot en la posición inicial
operacion = widthImg * counter;
slider.style.transform = `translate(-${operacion}%)`;
colorearDot(counterDot);

// Eventos de click
leftButtonSlider.addEventListener("click", () => {
  if (isTransitioning) return;
  moveToLeft();
});

rightButtonSlider.addEventListener("click", () => {
  if (isTransitioning) return;
  moveToRight();
});

// Desplazamiento automático
let interval = setInterval(moveToRight, 15000);

// Reiniciar el intervalo cuando el usuario interactúa
function resetInterval() {
  clearInterval(interval);
  interval = setInterval(moveToRight, 15000);
}

function moveToRight() {
  if (isTransitioning) return;
  isTransitioning = true;
  counter++;
  operacion = widthImg * counter;
  slider.style.transform = `translate(-${operacion}%)`;
  slider.style.transition = "transform ease-out 500ms";
  counterDot++;
  colorearDot(counterDot);
  descolorearDot(counterDot, "left");

  // Verificar si llegamos al último clon
  slider.addEventListener('transitionend', () => {
    if (counter >= containerImg.length - 1) {
      counterDot = 0;
      colorearDot(counterDot);
      counter = 1;
      operacion = widthImg * counter;
      slider.style.transition = "none";
      slider.style.transform = `translate(-${operacion}%)`;
    }
    isTransitioning = false;
  }, { once: true });

  resetInterval();
}

function moveToLeft() {
  if (isTransitioning) return;
  isTransitioning = true;
  counter--;
  operacion = widthImg * counter;
  slider.style.transform = `translate(-${operacion}%)`;
  slider.style.transition = "transform ease-out 500ms";
  counterDot--;
  colorearDot(counterDot);
  descolorearDot(counterDot, "right");

  // Verificar si llegamos al primer clon
  slider.addEventListener('transitionend', () => {
    if (counter <= 0) {
      counterDot = pointers.children.length - 1;
      colorearDot(counterDot);
      counter = containerImg.length - 2;
      operacion = widthImg * counter;
      slider.style.transition = "none";
      slider.style.transform = `translate(-${operacion}%)`;
    }
    isTransitioning = false;
  }, { once: true });

  resetInterval();
}

// Agregar evento a cada dot para mover el slider
for (let i = 0; i < dot.length; i++) {
  dot[i].addEventListener("click", () => moveToPosition(i));
}

function moveToPosition(position) {
  if (isTransitioning || counterDot === position) return; // Evita bloquear si ya está en la posición
  
  counter = position + 1; // Se ajusta por el clon inicial
  operacion = widthImg * counter;
  
  slider.style.transform = `translate(-${operacion}%)`;
  slider.style.transition = "transform ease-out 500ms";
  
  // Actualizar dots
  counterDot = position;
  colorearDot(counterDot);
  for (let j = 0; j < dot.length; j++) {
    if (j !== counterDot) {
      dot[j].style.backgroundColor = "transparent";
    }
  }

  resetInterval();
}

let startX = 0;

// Eventos táctiles (para móviles)
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    if (isTransitioning) return;
    moveToRight();
  } else if (startX - endX < -50) {
    if (isTransitioning) return;
    moveToLeft();
  }
});