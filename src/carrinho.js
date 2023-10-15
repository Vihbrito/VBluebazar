function toggleCarrinho() {
    const carrinho = document.getElementById("carrinho");
    carrinho.classList.toggle("aberto");
  }

  let carrinho = [];
  let totalCarrinho = 0;

  document.addEventListener("DOMContentLoaded", () => {
    const botoesCarrinho = document.querySelectorAll(".cart-button");

    botoesCarrinho.forEach((botao, index) => {
      botao.addEventListener("click", () => {
        const card = document.querySelectorAll(".card")[index];
        const imgSrc = card.querySelector("img").src;
        const price = card.querySelector(".price").textContent;
        const produto = {
          imgSrc,
          price,
        };

        // Verifica se o produto já está no carrinho
        const produtoExistente = carrinho.find((item) => item.imgSrc === produto.imgSrc);

        if (!produtoExistente) {
          carrinho.push(produto);
          atualizarCarrinho();
        }
      });
    });

    function atualizarCarrinho() {
        const carrinhoItens = document.getElementById("carrinho-itens");
        carrinhoItens.innerHTML = "";
      
        totalCarrinho = 0;
      
        carrinho.forEach((produto, index) => {
          const carrinhoItem = document.createElement("li");
          carrinhoItem.classList.add("carrinho-item");
          carrinhoItem.innerHTML = `
            <img class="carrinho-imagem" src="${produto.imgSrc}" alt="Produto">
            <span class="carrinho-preco">${produto.price}</span>
            <button class="remove-item" data-index="${index}">
              <i class="fas fa-times"></i> <!-- Ícone Font Awesome -->
            </button>
          `;
          carrinhoItens.appendChild(carrinhoItem);
      
          const priceNumber = parseFloat(produto.price.replace("R$", ""));
          totalCarrinho += priceNumber;
        });
      
        const totalCarrinhoElement = document.getElementById("total-carrinho");
        totalCarrinhoElement.textContent = `R$ ${totalCarrinho.toFixed(2)}`;

      
        const botoesRemover = document.querySelectorAll(".remove-item");
        botoesRemover.forEach((botao) => {
          botao.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            carrinho.splice(index, 1);
            atualizarCarrinho();
          });
        });
      }
      // Obtenha a referência do botão "Finalizar Compra"
const finalizarCompraButton = document.querySelector(".finalizar-compra-button");

// Adicione um ouvinte de eventos para o botão "Finalizar Compra"
finalizarCompraButton.addEventListener("click", function (event) {
  // Verifique se há itens no carrinho
  if (carrinho.length > 0) {
    // Crie uma lista de itens codificada em JSON
    const itensDoCarrinho = JSON.stringify(carrinho);

    // Adicione os itens do carrinho à URL da página "checkout.html" como um parâmetro chamado "itens"
    const urlParaCheckout = `checkout.html?itens=${encodeURIComponent(itensDoCarrinho)}`;
    
    // Redirecione para a página "checkout.html" com os itens do carrinho na URL
    window.location.href = urlParaCheckout;
  } else {
    // Você pode mostrar uma mensagem de erro se o carrinho estiver vazio
    alert("Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.");
  }

  // Impedir o comportamento padrão do link (navegar para a página "checkout.html")
  event.preventDefault();
});

  });



  

  
  
  