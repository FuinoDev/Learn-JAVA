// Elements
const userEmail = document.getElementById("userEmail");
const logoutButton = document.getElementById("logoutButton");

const productForm = document.getElementById("productForm");
const productId = document.getElementById("productId");
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const productQuantity = document.getElementById("productQuantity");
const lowStockLevel = document.getElementById("lowStockLevel");

const productTableBody = document.getElementById("productTableBody");

const totalProducts = document.getElementById("totalProducts");
const totalStock = document.getElementById("totalStock");
const lowStock = document.getElementById("lowStock");

const productNameError = document.getElementById("productNameError");
const productCategoryError = document.getElementById("productCategoryError");
const productPriceError = document.getElementById("productPriceError");
const productQuantityError = document.getElementById("productQuantityError");
const lowStockLevelError = document.getElementById("lowStockLevelError");

// Check session
async function checkUser() {
    try {
        const response = await fetch("/api/auth/me");

        if (!response.ok) {
            window.location.href = "/";
            return;
        }

        const data = await response.json();

        userEmail.textContent = data.email;
    } catch (error) {
        window.location.href = "/";
    }
}

checkUser();

// Load products
async function loadProducts() {
    try {
        const response = await fetch("/api/products");

        if (!response.ok) {
            console.error("Failed to load products.");
            return;
        }

        const products = await response.json();

        displayProducts(products);
        updateSummary(products);
    } catch (error) {
        console.error("Failed to load products.");
    }
}

loadProducts();

// Display products
function displayProducts(products) {
    productTableBody.innerHTML = "";

    if (products.length === 0) {
        productTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted py-4">
                    No products available.
                </td>
            </tr>
        `;

        return;
    }

    products.forEach(function (product) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category || "-"}</td>
            <td>₱${Number(product.price).toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>${product.lowStockLevel}</td>
            <td>
                <button
                    class="btn btn-sm btn-outline-danger"
                    onclick="deleteProduct(${product.id})"
                >
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        productTableBody.appendChild(row);
    });
}

// Update summary
function updateSummary(products) {
    totalProducts.textContent = products.length;

    const stock = products.reduce(function (total, product) {
        return total + product.quantity;
    }, 0);

    const lowStockCount = products.filter(function (product) {
        return product.quantity <= product.lowStockLevel;
    }).length;

    totalStock.textContent = stock;
    lowStock.textContent = lowStockCount;
}

// Clear error
function clearInputError(input, errorElement) {
    input.classList.remove("is-invalid");
    errorElement.textContent = "";
}

// Show error
function showInputError(input, errorElement, message) {
    input.classList.add("is-invalid");
    errorElement.textContent = message;
}

// Clear all errors
function clearProductErrors() {
    clearInputError(productName, productNameError);
    clearInputError(productCategory, productCategoryError);
    clearInputError(productPrice, productPriceError);
    clearInputError(productQuantity, productQuantityError);
    clearInputError(lowStockLevel, lowStockLevelError);
}

// Validate product
function validateProduct() {
    clearProductErrors();

    let valid = true;

    if (productName.value.trim() === "") {
        showInputError(
            productName,
            productNameError,
            "Product name is required."
        );

        valid = false;
    }

    if (productCategory.value.trim() === "") {
        showInputError(
            productCategory,
            productCategoryError,
            "Category is required."
        );

        valid = false;
    }

    if (
        productPrice.value.trim() === "" ||
        Number(productPrice.value) < 0
    ) {
        showInputError(
            productPrice,
            productPriceError,
            "Enter a valid price."
        );

        valid = false;
    }

    if (
        productQuantity.value.trim() === "" ||
        Number(productQuantity.value) < 0
    ) {
        showInputError(
            productQuantity,
            productQuantityError,
            "Enter a valid quantity."
        );

        valid = false;
    }

    if (
        lowStockLevel.value.trim() === "" ||
        Number(lowStockLevel.value) < 0
    ) {
        showInputError(
            lowStockLevel,
            lowStockLevelError,
            "Enter a valid low stock level."
        );

        valid = false;
    }

    return valid;
}

// Add product
productForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!validateProduct()) {
        return;
    }

    const product = {
        name: productName.value.trim(),
        category: productCategory.value.trim(),
        price: Number(productPrice.value),
        quantity: Number(productQuantity.value),
        lowStockLevel: Number(lowStockLevel.value)
    };

    try {
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            console.error("Failed to add product.");
            return;
        }

        productForm.reset();
        clearProductErrors();

        const modalElement = document.getElementById("productModal");
        const modal = bootstrap.Modal.getInstance(modalElement);

        modal.hide();

        await loadProducts();
    } catch (error) {
        console.error("Failed to add product.");
    }
});

// Delete product
async function deleteProduct(id) {
    const confirmed = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            console.error("Failed to delete product.");
            return;
        }

        await loadProducts();
    } catch (error) {
        console.error("Failed to delete product.");
    }
}

// Live validation
productName.addEventListener("input", function () {
    if (productName.value.trim() !== "") {
        clearInputError(productName, productNameError);
    }
});

productCategory.addEventListener("input", function () {
    if (productCategory.value.trim() !== "") {
        clearInputError(productCategory, productCategoryError);
    }
});

productPrice.addEventListener("input", function () {
    if (
        productPrice.value.trim() !== "" &&
        Number(productPrice.value) >= 0
    ) {
        clearInputError(productPrice, productPriceError);
    }
});

productQuantity.addEventListener("input", function () {
    if (
        productQuantity.value.trim() !== "" &&
        Number(productQuantity.value) >= 0
    ) {
        clearInputError(productQuantity, productQuantityError);
    }
});

lowStockLevel.addEventListener("input", function () {
    if (
        lowStockLevel.value.trim() !== "" &&
        Number(lowStockLevel.value) >= 0
    ) {
        clearInputError(lowStockLevel, lowStockLevelError);
    }
});

// Logout
logoutButton.addEventListener("click", async function () {
    try {
        const response = await fetch("/api/auth/logout", {
            method: "POST"
        });

        if (response.ok) {
            window.location.href = "/";
        }
    } catch (error) {
        console.error("Logout failed.");
    }
});