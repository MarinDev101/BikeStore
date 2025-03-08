const hamburgerIcon = document.getElementById("hamburger-icon");
const leaveButton = document.getElementById("button-leave");
const asideResponsive = document.getElementById("aside-responsive");
const html = document.querySelector("html");
const leaveAside = document.getElementById("leave-aside");

function abrir() {
  asideResponsive.style.display = "flex";
  html.style.overflow = "hidden";
  leaveAside.style.display = "block";
}

function cerrar() {
  asideResponsive.style.display = "none";
  html.style.overflow = "visible";
  leaveAside.style.display = "none";
}

hamburgerIcon.addEventListener("click", () => {
  asideResponsive.style.animationName = "open";
  leaveAside.style.animation = "open-leave-aside 200ms ease-out forwards";
  window.setTimeout(abrir, 200);
});

leaveButton.addEventListener("click", () => {
  asideResponsive.style.animationName = "close";
  leaveAside.style.animation = "open-leave-aside 200ms ease-out reverse forwards";
  window.setTimeout(cerrar, 200);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    cerrar();
  }
});

leaveAside.addEventListener("click", () => {
  asideResponsive.style.animationName = "close";
  leaveAside.style.animation = "open-leave-aside 200ms ease-out reverse forwards";
  window.setTimeout(cerrar, 200);
});
