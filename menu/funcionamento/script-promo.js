// ==================== CARRINHO ====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

function addToCart(produto, preco) {
  // Limite de 1 produto para a página de promoções
  if (window.location.pathname.includes("promocoes.html") && cart.length >= 1) {
    alert("Você só pode adicionar 1 produto de promoção ao carrinho!");
    return; // não adiciona
  }

  cart.push({ produto, preco });
  total += preco;
  saveCart();
  updateCart();
}

function removeFromCart(index) {
  if (index > -1 && index < cart.length) {
    total -= cart[index].preco;
    cart.splice(index, 1);
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

document.addEventListener("DOMContentLoaded", updateCart);

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