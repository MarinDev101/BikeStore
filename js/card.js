// quita la opcion de arrastrar a todos los objetos excepto a los <a>
document.addEventListener("dragstart", function (event) {
  // Verifica si el elemento arrastrado es un <a>
  if (event.target.tagName !== "A") {
    event.preventDefault();
  }
});

const heartsVacios = document.getElementsByClassName("heart-vacio");
const heartsRellenos = document.getElementsByClassName("heart-relleno");

// Inicialmente, oculta todos los corazones rellenos
for (let i = 0; i < heartsRellenos.length; i++) {
  heartsRellenos[i].style.display = "none";
}

// Añade eventos de clic a todos los corazones vacíos
for (let i = 0; i < heartsVacios.length; i++) {
  heartsVacios[i].addEventListener("click", () => {
    heartsVacios[i].style.display = "none";
    heartsRellenos[i].style.display = "block";
  });
}

// Añade eventos de clic a todos los corazones rellenos
for (let i = 0; i < heartsRellenos.length; i++) {
  heartsRellenos[i].addEventListener("click", () => {
    heartsRellenos[i].style.display = "none";
    heartsVacios[i].style.display = "block";
  });
}