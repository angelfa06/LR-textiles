const form = document.getElementById("add-product-form");
const productContainer = document.getElementById("products-container");

// Referencia a la colección de productos definida en firebase-config.js
const productsCollection = db.collection('products');

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const imageFile = document.getElementById("product-image").files[0];
    const description = document.getElementById("product-description").value;

    // Mostrar un indicador de carga
    const loadingIndicator = document.createElement("div");
    loadingIndicator.textContent = "Subiendo producto...";
    loadingIndicator.style.color = "#4CAF50";
    loadingIndicator.style.marginTop = "10px";
    form.appendChild(loadingIndicator);

    // Leer la imagen como URL en base64
    const reader = new FileReader();
    
    reader.onloadend = function () {
        const imageBase64 = reader.result;

        // Crear un nuevo producto
        const newProduct = {
            name,
            price,
            image: imageBase64,
            description,
            whatsappMessage: `quiero%20comprar%20tu%20${encodeURIComponent(name)}`,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Agregar a Firestore
        productsCollection.add(newProduct)
            .then(() => {
                // Quitar el indicador de carga
                form.removeChild(loadingIndicator);
                
                // Mostrar un mensaje de éxito
                alert("Producto agregado con éxito!");
                
                // Limpiar el formulario
                form.reset();
                
                // Actualizar la lista de productos
                displayProducts();
            })
            .catch(error => {
                // Quitar el indicador de carga
                form.removeChild(loadingIndicator);
                
                console.error("Error al agregar producto:", error);
                alert("Error al guardar el producto: " + error.message);
            });
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
});

// Función para mostrar los productos en la interfaz
function displayProducts() {
    // Limpiar el contenedor
    productContainer.innerHTML = "";
    
    // Mostrar un indicador de carga
    const loadingIndicator = document.createElement("div");
    loadingIndicator.textContent = "Cargando productos...";
    loadingIndicator.style.textAlign = "center";
    loadingIndicator.style.padding = "20px";
    productContainer.appendChild(loadingIndicator);

    // Obtener productos de Firestore ordenados por fecha de creación
    productsCollection.orderBy("createdAt", "desc").get()
        .then(querySnapshot => {
            // Quitar el indicador de carga
            productContainer.removeChild(loadingIndicator);
            
            if (querySnapshot.empty) {
                productContainer.innerHTML = "<p>No hay productos agregados aún.</p>";
                return;
            }

            // Mostrar cada producto
            querySnapshot.forEach((doc, index) => {
                const product = doc.data();
                const productId = doc.id;
                
                const productCard = document.createElement("div");
                productCard.className = "product-card";
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p><strong>Precio:</strong> ${product.price}</p>
                    <p><strong>Descripción:</strong> ${product.description}</p>
                    <button class="delete-button" data-id="${productId}">Eliminar</button>
                `;

                productContainer.appendChild(productCard);
            });

            // Agregar eventos de eliminación
            const deleteButtons = document.querySelectorAll(".delete-button");
            deleteButtons.forEach(button => {
                button.addEventListener("click", function() {
                    const productId = button.getAttribute("data-id");
                    deleteProduct(productId);
                });
            });
        })
        .catch(error => {
            // Quitar el indicador de carga
            productContainer.removeChild(loadingIndicator);
            
            console.error("Error al cargar productos:", error);
            productContainer.innerHTML = `<p>Error al cargar productos: ${error.message}</p>`;
        });
}

// Función para eliminar un producto
function deleteProduct(productId) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        productsCollection.doc(productId).delete()
            .then(() => {
                alert("Producto eliminado con éxito.");
                displayProducts();
            })
            .catch(error => {
                console.error("Error al eliminar producto:", error);
                alert("Error al eliminar el producto: " + error.message);
            });
    }
}

// Cargar los productos al iniciar la página
displayProducts();

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
