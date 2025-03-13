const form = document.getElementById("add-product-form");
const productContainer = document.getElementById("products-container");

// Inicializar localForage
localforage.config({
    name: 'LR_textiles',
    storeName: 'products'
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const imageFile = document.getElementById("product-image").files[0]; // Obtener la imagen
    const description = document.getElementById("product-description").value;

    // Leer la imagen como URL en base64 (para cargarla sin necesidad de un servidor)
    const reader = new FileReader();
    
    reader.onloadend = function () {
        const imageBase64 = reader.result;  // La imagen convertida a base64

        // Crear un nuevo producto con la imagen base64
        const newProduct = {
            name,
            price,
            image: imageBase64,
            description,
            whatsappMessage: `quiero%20comprar%20tu%20${encodeURIComponent(name)}`
        };

        // Obtener los productos existentes de localForage
        localforage.getItem("products").then(storedProducts => {
            // Si no hay productos, crear un array vacío
            const products = storedProducts || [];
            products.push(newProduct);

            // Guardar los productos actualizados en localForage
            return localforage.setItem("products", products);
        }).then(() => {
            // Mostrar un mensaje de éxito
            alert("Producto agregado con éxito!");

            // Limpiar el formulario
            form.reset();

            // Actualizar la lista de productos
            displayProducts();
        }).catch(err => {
            console.error("Error al guardar el producto:", err);
            alert("Hubo un error al guardar el producto. Inténtalo de nuevo.");
        });
    }

    if (imageFile) {
        reader.readAsDataURL(imageFile);  // Convertir la imagen a base64
    }
});

// Función para mostrar los productos en la interfaz
function displayProducts() {
    localforage.getItem("products").then(storedProducts => {
        const products = storedProducts || [];
        productContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar los productos

        // Mostrar cada producto como una tarjeta
        products.forEach((product, index) => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Descripción:</strong> ${product.description}</p>
                <button class="delete-button" data-index="${index}">Eliminar</button>
            `;

            productContainer.appendChild(productCard);
        });

        // Agregar el evento de eliminación
        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function () {
                const index = button.getAttribute("data-index");
                deleteProduct(index);
            });
        });
    }).catch(err => {
        console.error("Error al cargar los productos:", err);
    });
}

// Función para eliminar un producto de localForage y la vista
function deleteProduct(index) {
    localforage.getItem("products").then(storedProducts => {
        const products = storedProducts || [];
        
        // Eliminar el producto en la posición indicada
        products.splice(index, 1);

        // Actualizar localForage con los productos restantes
        return localforage.setItem("products", products);
    }).then(() => {
        // Actualizar la lista de productos en la interfaz
        displayProducts();
    }).catch(err => {
        console.error("Error al eliminar el producto:", err);
    });
}

// Cargar los productos al cargar la página
displayProducts();

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
