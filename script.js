// Inicializar localForage
localforage.config({
    name: 'LR_textiles',
    storeName: 'products'
});

const products = [
    // Productos predefinidos (si los tienes)
];

const catalog = document.getElementById("catalog");

// Función para mostrar un producto en el catálogo
function displayProduct(product) {
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
}

// Configurar la búsqueda
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

// Cargar todos los productos (predefinidos y de localForage)
function loadProducts() {
    // Limpiar el catálogo primero
    catalog.innerHTML = "";
    
    // Mostrar productos predefinidos
    products.forEach(product => {
        displayProduct(product);
    });
    
    // Obtener y mostrar productos de localForage
    localforage.getItem("products").then(storedProducts => {
        if (storedProducts) {
            storedProducts.forEach(product => {
                displayProduct(product);
            });
        }
    }).catch(err => {
        console.error("Error al cargar productos de localForage:", err);
    });
}

// Cargar los productos al iniciar
loadProducts();

// Actualizar el año en el footer
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
