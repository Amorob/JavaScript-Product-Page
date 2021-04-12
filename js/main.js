// Global Variables Declarations
const productForm = document.getElementById("product-form");

const addingProducts = document.querySelector(".adding-products");
const viewProducts = document.querySelector(".view-products");
const closeProductForm = document.querySelector(".close-product-form");
// Displaying Add products form to add products
addingProducts.addEventListener("click", function () {
  document.querySelector(".products-display").classList.remove("display-show");
  document.querySelector(".add-products").classList.add("display-show");
  addingProducts.classList.add("display-none");
  viewProducts.classList.remove("display-none");
});
// Displaying list of products Added
viewProducts.addEventListener("click", function () {
  document.querySelector(".add-products").classList.remove("display-show");
  document.querySelector(".products-display").classList.add("display-show");
  viewProducts.classList.add("display-none");
  addingProducts.classList.remove("display-none");
});
// Close product form
closeProductForm.addEventListener("click", function () {
  document.querySelector(".add-products").classList.remove("display-show");
  addingProducts.classList.remove("display-none");
});
// Cancel product adding button
document
  .querySelector(".cancel-product-adding")
  .addEventListener("click", function () {
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image-url").value = "";
  });

// product class
class Product {
  constructor(title, price, stock, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.stock = stock;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
// UI class
class UI {
  addProductToList(Product) {
    const list = document.getElementById("product-list");
    // Create tr Element
    const row = document.createElement("tr");
    //    Insert td into tr
    row.innerHTML = `
         <td> ${Product.title}</td>
         <td> ${Product.price}</td>
         <td> ${Product.stock}</td>
         <td> ${Product.description}</td>
         <td> ${Product.imageUrl}</td>
         <td> <a href="#" class="delete-product">x</a></td>`;
    list.appendChild(row);
  }
  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");
    // Create Classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const addProductForm = document.querySelector(".add-product-form");
    // Get form
    const form = document.querySelector("#product-form");
    //   Insert Alert
    addProductForm.insertBefore(div, form);
    // Time out after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteProduct(target) {
    if (target.className === "delete-product") {
      target.parentElement.parentElement.remove();
    }
  }
  clearInputFields() {
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image-url").value = "";
  }
}

// Add Event Listener for Product form submit to Add product
productForm.addEventListener("submit", function (evt) {
  // Get form input values
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;
  const description = document.getElementById("description").value;
  const imageUrl = document.getElementById("image-url").value;
  // Instantiate Product
  const product = new Product(title, price, stock, description, imageUrl);
  // Instantiate UI
  const ui = new UI();

  // Validate Input Fields
  if (
    title === "" ||
    price === "" ||
    stock === "" ||
    description === "" ||
    imageUrl === ""
  ) {
    ui.showAlert("Please fill in all Fields", "error");
  } else {
    // Add product to List
    ui.addProductToList(product);
    //   Show success alert
    ui.showAlert("Product Added!", "success");
    // Clear input fields after submit
    ui.clearInputFields();
  }

  // Prevent Default submit behaviour
  evt.preventDefault();
});

// Event Listener to delete product
document
  .getElementById("product-list")
  .addEventListener("click", function (evt) {
    // Instantiate UI
    const ui = new UI();
    //   Delete product
    ui.deleteProduct(evt.target);
    //   Show message
    ui.showAlert("Product Removed!", "success");
    evt.preventDefault();
  });
