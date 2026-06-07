// ==================== CARRINHO ====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

function addToCart(produto, preco) {
  cart.push({ produto, preco });
  total += preco;
  saveCart();
  updateCart();
}

function removeFromCart(index) {
  if (index > -1 && index < cart.length) {
    total -= cart[index].preco; // desconta o valor do item
    cart.splice(index, 1);      // remove o item da lista
    saveCart();
    updateCart();
  }
}

function updateCart() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (cartItems && cartTotal) {
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = `
        ${item.produto} - R$ ${item.preco.toFixed(2)} 
        <button onclick="removeFromCart(${index})">❌</button>
      `;
      cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", total.toString());
}

// Atualiza ícone ao carregar qualquer página
document.addEventListener("DOMContentLoaded", updateCart);


// ==================== PESQUISA DE PRODUTOS ====================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".card");

  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      let filter = searchInput.value.toLowerCase();

      cards.forEach(card => {
        let productName = card.getAttribute("data-name").toLowerCase();

        if (productName.includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});

// ==================== FINALIZAR COMPRA ====================
document.addEventListener("DOMContentLoaded", () => {
  const finalizarBtn = document.getElementById("finalizarCompraBtn");

  if (finalizarBtn) {
    finalizarBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      // Exemplo simples de finalização
      alert(`Compra finalizada com sucesso!\nTotal: R$ ${total.toFixed(2)}`);

      // Limpa o carrinho
      cart = [];
      total = 0;
      saveCart();
      updateCart();
    });
  }
});