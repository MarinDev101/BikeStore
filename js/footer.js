/*=============================================
=            acordeon footer                  =
=============================================*/

const details = document.querySelectorAll("details");

function cambiarPropiedad(boolean) {
  details.forEach((detail) => {
    if (boolean) {
      detail.removeAttribute("open");
      detail.setAttribute("name", "info");
    } else {
      detail.setAttribute("open", "");
      detail.removeAttribute("name");
    }
  });
}

// Evento único para "resize"
window.addEventListener("resize", () => {
  cambiarPropiedad(window.innerWidth <= 650);
});

// Llamada inicial para aplicar los estilos según el tamaño de la ventana al cargar
cambiarPropiedad(window.innerWidth <= 650);

/*=====  End of acordeon-footer  ======*/

/*=============================================
=            up-button                        =
=============================================*/

document.querySelector(".up-button").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*=====  End of up-button  ======*/
