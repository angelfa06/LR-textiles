
const products = [
   
  ];
  
  const catalog = document.getElementById("catalog");
  
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product";
  
    // Crear el enlace de WhatsApp con el mensaje predefinido
    const whatsappLink = `https://wa.me/543813027362?text=${product.whatsappMessage}`;
  
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>${product.price}</strong></p>
      <a href="${whatsappLink}" target="_blank">
        <button><i class="fas fa-shopping-cart"></i> Comprar</button>
      </a>
    `;
  
    catalog.appendChild(productCard);
  });

  const searchInput = document.getElementById("search");
searchInput.addEventListener("input", function() {
  const query = searchInput.value.toLowerCase();
  const productCards = document.querySelectorAll(".product");
  productCards.forEach(card => {
    const productName = card.querySelector("h3").textContent.toLowerCase();
    if (productName.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Obtener productos iniciales y los almacenados en localStorage
const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
const allProducts = [...products, ...storedProducts];

// Mostrar los productos en el catálogo
allProducts.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product";

    const whatsappLink = `https://wa.me/543813027362?text=${product.whatsappMessage}`;

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>${product.price}</strong></p>
      <a href="${whatsappLink}" target="_blank">
        <button><i class="fas fa-shopping-cart"></i> Comprar</button>
      </a>
    `;

    catalog.appendChild(productCard);
});

document.getElementById("current-year").textContent = new Date().getFullYear();


// Seleccionar el botón
const scrollToTopButton = document.getElementById("scroll-to-top");

// Mostrar el botón cuando el usuario hace scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) { // Aparece después de hacer scroll 300px
        scrollToTopButton.style.display = "flex";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

// Llevar al usuario al inicio de la página al hacer clic
scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Scroll suave
    });
});
