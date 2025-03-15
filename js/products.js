const buttonLeft = document.getElementById("button-left-products");
const buttonRight = document.getElementById("button-right-products");
const productsList = document.getElementById("products-list");

const numCards = productsList.children.length;


let position = 0;
let porcertaje = 0;
let espaciadosFinales = 0;

buttonRight.addEventListener("click", () => {
  irDerecha();
});

buttonLeft.addEventListener("click", ()=>{
  irIzquierda()
})

function irDerecha() {
  position++;
  if (position <= numCards - espaciadosFinales) {
    productsList.style.transform = `translateX(-${position * porcertaje}%)`;
    buttonLeft.classList.add("visible");
    buttonLeft.classList.remove("oculto");
  }
  if (position == numCards - espaciadosFinales) {
    buttonRight.classList.add("oculto");
    buttonRight.classList.remove("visible");
  }
}

function irIzquierda(){
  position--;
  if (position >= 0) {
    productsList.style.transform = `translateX(-${position * porcertaje}%)`;
    buttonRight.classList.add("visible");
    buttonRight.classList.remove("oculto");
  }
  if (position == 0) {
    buttonLeft.classList.add("oculto");
    buttonLeft.classList.remove("visible");
  }
}


function cambiarTamañoCards(dispositivo){
  if(dispositivo == "computador"){
    visibilityButtons(4)
    productsList.style.gridTemplateColumns = `repeat(${numCards}, 25%)`;
    productsList.style.transform = `translateX(0%)`;
    position = 0;
    espaciadosFinales = 4;
    porcertaje = 25;
  } else if (dispositivo == "portatil") {
    visibilityButtons(3)
    productsList.style.gridTemplateColumns = `repeat(${numCards}, 33.3%)`;
    productsList.style.transform = `translateX(0%)`;
    position = 0;
    espaciadosFinales = 3;
    porcertaje = 33.3;
  } else if (dispositivo == "tablet") {
    visibilityButtons(2)
    productsList.style.gridTemplateColumns = `repeat(${numCards}, 50%)`;
    productsList.style.transform = `translateX(0%)`;
    position = 0;
    espaciadosFinales = 2;
    porcertaje = 50;
  } else if (dispositivo == "telefono") {
    visibilityButtons(1)
    productsList.style.gridTemplateColumns = `repeat(${numCards}, 100%)`;
    productsList.style.transform = `translateX(0%)`;
    position = 0;
    espaciadosFinales = 1;
    porcertaje = 100;
  }
}

window.addEventListener("resize", () => {
  if(window.innerWidth <= 650){
    cambiarTamañoCards("telefono");
  }else if(window.innerWidth <= 850){
    cambiarTamañoCards("tablet");
  } else if(window.innerWidth <= 1190){
    cambiarTamañoCards("portatil");
  } else if(window.innerWidth > 1190){
    cambiarTamañoCards("computador");
  }
});

cambiarTamañoCards(window.innerWidth <= 650 ? "telefono" :
  window.innerWidth <= 850 ? "tablet" :
  window.innerWidth <= 1190 ? "portatil" :
  "computador");

function visibilityButtons(cardsVisibles){
    if(numCards <= cardsVisibles){
    buttonRight.classList.add("oculto");
    buttonRight.classList.remove("visible");
  } else {
    buttonRight.classList.add("visible");
    buttonRight.classList.remove("oculto");
    buttonLeft.classList.add("oculto");
    buttonLeft.classList.remove("visible");
  }
}

