document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const itensCodificados = urlParams.get("itens");

  if (itensCodificados) {
    const itensDoCarrinho = JSON.parse(decodeURIComponent(itensCodificados));

    const itensCarrinho = document.getElementById("itens-carrinho");

    let totalCarrinho = 0;

    itensDoCarrinho.forEach((item) => {
      const itemHTML = document.createElement("div");
      itemHTML.classList.add("item-carrinho");
      itemHTML.innerHTML = `
                <img src="${item.imgSrc}" alt="Produto">
                <span>${item.price}</span>
            `;

      itensCarrinho.appendChild(itemHTML);

      const priceNumber = parseFloat(item.price.replace("R$", ""));
      totalCarrinho += priceNumber;
    });

    if (totalCarrinho < 80) {
      totalCarrinho += 10;
    }

    const totalCarrinhoElement = document.getElementById("valor-total");
    totalCarrinhoElement.textContent = totalCarrinho.toFixed(2);
  }
});

document
  .getElementById("forma-pagamento")
  .addEventListener("change", function () {
    var dadosCartao = document.getElementById("dados-cartao");
    if (this.value === "cartao") {
      dadosCartao.style.display = "block";
    } else {
      dadosCartao.style.display = "none";
    }
  });

document
  .getElementById("forma-pagamento")
  .addEventListener("change", function () {
    var dadosPix = document.getElementById("pix-info");
    if (this.value === "pix") {
      dadosPix.style.display = "block";
    } else {
      dadosPix.style.display = "none";
    }
  });

document.getElementById("copyIcon").addEventListener("click", function () {
  var emailText = document.querySelector(".epix");
  var email = emailText.textContent.split(":")[1].trim();

  var tempInput = document.createElement("input");
  tempInput.value = email;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  alert("E-mail copiado para a área de transferência: " + email);
});

document.getElementById("finalizar").addEventListener("click", function (e) {
  e.preventDefault();

  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var telefone = document.getElementById("telefone").value;
  var enderecoEntrega = document.getElementById("endereco-entrega").value;
  var formaPagamento = document.getElementById("forma-pagamento").value;

  var totalCarrinho = document.getElementById("total-carrinho").textContent;

  var dadosPedido = {
    nome: nome,
    email: email,
    telefone: telefone,
    enderecoEntrega: enderecoEntrega,
    totalCarrinho: totalCarrinho,
    formaPagamento: formaPagamento,
  };
  localStorage.setItem("dadosPedido", JSON.stringify(dadosPedido));

  window.location.href = "comprovante.html";
});
