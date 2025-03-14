const catalog = document.getElementById("catalog");
const searchInput = document.getElementById("search");

// Referencia a la colección de productos definida en firebase-config.js
const productsCollection = db.collection('products');

// Función para mostrar los productos en el catálogo
function loadProducts() {
    // Limpiar el catálogo
    catalog.innerHTML = "";
    
    // Mostrar un indicador de carga
    const loadingIndicator = document.createElement("div");
    loadingIndicator.textContent = "Cargando productos...";
    loadingIndicator.style.textAlign = "center";
    loadingIndicator.style.padding = "20px";
    catalog.appendChild(loadingIndicator);

    // Obtener productos de Firestore ordenados por fecha de creación
    productsCollection.orderBy("createdAt", "desc").get()
        .then(querySnapshot => {
            // Quitar el indicador de carga
            catalog.removeChild(loadingIndicator);
            
            if (querySnapshot.empty) {
                catalog.innerHTML = "<p style='text-align: center; padding: 20px;'>No hay productos disponibles.</p>";
                return;
            }

            // Mostrar cada producto
            querySnapshot.forEach(doc => {
                const product = doc.data();
                displayProduct(product);
            });
        })
        .catch(error => {
            // Quitar el indicador de carga
            catalog.removeChild(loadingIndicator);
            
            console.error("Error al cargar productos:", error);
            catalog.innerHTML = `<p style='text-align: center; padding: 20px;'>Error al cargar productos: ${error.message}</p>`;
        });
}

// Función para mostrar un producto individual
function displayProduct(product) {
    const productCard = document.createElement("div");
    productCard.className = "product";
    productCard.setAttribute("data-name", product.name.toLowerCase());

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

// Función de búsqueda
searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase();
    const productCards = document.querySelectorAll(".product");
    
    productCards.forEach(card => {
        const productName = card.getAttribute("data-name");
        if (productName.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// Cargar productos al iniciar la página
loadProducts();

// Actualizar año en el footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Funcionalidad del botón de scroll hacia arriba
const scrollToTopButton = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = "flex";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
