var dadosPedido = JSON.parse(localStorage.getItem("dadosPedido"));

if (dadosPedido) {
  var dadosComprovante = document.getElementById("dados-comprovante");
  dadosComprovante.innerHTML = `
        <p><strong>Nome:</strong> ${dadosPedido.nome}</p>
        <p><strong>E-mail:</strong> ${dadosPedido.email}</p>
        <p><strong>Telefone:</strong> ${dadosPedido.telefone}</p>
        <p><strong>Endereço de Entrega:</strong> ${dadosPedido.enderecoEntrega}</p>
        <p><strong>Forma de Pagamento:</strong> ${dadosPedido.formaPagamento}</p>
        <p><strong>Total do Pedido:</strong> ${dadosPedido.totalCarrinho}</p>
    `;
}

function preloadImages(images, callback) {
  let loadedImages = 0;
  images.forEach(function (src) {
    const img = new Image();
    img.onload = function () {
      loadedImages++;
      if (loadedImages === images.length) {
        callback();
      }
    };
    img.src = src;
  });
}

const imagesToPreload = ["assets/img/Logo blue.PNG"];

preloadImages(imagesToPreload, function () {
  document.getElementById("capturar").addEventListener("click", function () {
    alert(
      "Encaminhar esses dados e o comprovante de PIX para o número (85) 997229859"
    );

    const elementoParaCapturar = document.getElementById(
      "elemento-para-capturar"
    );
    const container = document.getElementById("captura-de-tela");

    html2canvas(elementoParaCapturar).then(function (canvas) {
      container.appendChild(canvas);

      const imagemURL = canvas.toDataURL("image/png");

      const downloadLink = document.getElementById("download-link");
      downloadLink.href = imagemURL;
      downloadLink.style.display = "block";

      downloadLink.download = "captura_de_tela.png";

      const compartilharButton = document.createElement("button");
      compartilharButton.textContent = "Compartilhar";
      compartilharButton.className = "botao-compartilhar";
      compartilharButton.addEventListener("click", function () {
        if (navigator.share) {
          fetch(imagemURL)
            .then((response) => response.blob())
            .then((blob) => {
              const shareData = {
                files: [
                  new File([blob], "captura_de_tela.png", {
                    type: "image/png",
                  }),
                ],
              };
              navigator
                .share(shareData)
                .then(() => console.log("Imagem compartilhada com sucesso"))
                .catch((error) =>
                  console.error("Erro ao compartilhar:", error)
                );
            })
            .catch((error) => console.error("Erro ao buscar a imagem:", error));
        } else {
          alert("Seu navegador não suporta a função de compartilhamento.");
        }
      });

      container.appendChild(compartilharButton);
    });
  });
});
