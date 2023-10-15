

document.querySelector(".bnt").addEventListener("click", function() {
  this.classList.add("active");
  setTimeout(() => {
    window.location.href = "/catalogo.html";
  }, 500);
});
