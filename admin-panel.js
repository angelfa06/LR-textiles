const form = document.getElementById("add-product-form");
const productContainer = document.getElementById("products-container");

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

        // Obtener los productos existentes de localStorage
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        storedProducts.push(newProduct);

        // Guardar los productos actualizados en localStorage
        localStorage.setItem("products", JSON.stringify(storedProducts));

        // Mostrar un mensaje de éxito
        alert("Producto agregado con éxito!");

        // Limpiar el formulario
        form.reset();

        // Actualizar la lista de productos
        displayProducts();
    }

    if (imageFile) {
        reader.readAsDataURL(imageFile);  // Convertir la imagen a base64
    }
});

// Función para mostrar los productos en la interfaz
function displayProducts() {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    productContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar los productos

    // Mostrar cada producto como una tarjeta
    storedProducts.forEach((product, index) => {
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
}

// Función para eliminar un producto de localStorage y la vista
function deleteProduct(index) {
    // Obtener los productos del localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Eliminar el producto en la posición indicada
    storedProducts.splice(index, 1);

    // Actualizar el localStorage con los productos restantes
    localStorage.setItem("products", JSON.stringify(storedProducts));

    // Actualizar la lista de productos en la interfaz
    displayProducts();
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
