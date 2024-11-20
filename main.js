const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const create = document.getElementById("create");
const dataContainer = document.getElementById("dataContainer");
const deleteAllBtn = document.getElementById("deleteAllBtn");
let mode = "create";
let temp;
const serach = document.getElementById("search");

const getTotal = () => {
  if (price.value !== "") {
    const result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerText = ` ${result}`;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(170, 16, 16)";
  }
};

let productData = localStorage.product ? JSON.parse(localStorage.product) : [];

const clearData = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
};

const showData = () => {
  getTotal();

  let table = "";
  productData.forEach((product, i) => {
    table += `
      <tr>
        <td class="media-query"> ${i + 1}</td>
        <td >${product.title}</td>
        <td >${product.price}</td>
        <td class="media-query">${product.taxes}</td>
        <td class="media-query">${product.ads}</td>
        <td class="media-query">${product.discount}</td>
        <td >${product.category}</td>
        <td class="media-query">${product.total}</td>
        <td ><button onclick="updateProduct(${i})">update</button></td>
        <td ><button onclick="deleteProduct(${i})">delete</button></td>
      </tr>
    `;
  });
  dataContainer.innerHTML = table;
};

create.onclick = () => {
  getTotal();
  const newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (mode === "create") {
    if (count.value > 1) {
      for (let i = 0; i < count.value; i++) {
        productData.push(newProduct);
        localStorage.setItem("product", JSON.stringify(productData));
      }
    } else {
      productData.push(newProduct);
      localStorage.setItem("product", JSON.stringify(productData));
    }
  } else {
    productData[temp] = newProduct;
    mode = "create";
    count.style.display = "block";
    create.innerHTML = "Create";
  }

  clearData();
  showData();
  deleteAllData();
};

const deleteProduct = (item) => {
  productData.splice(item, 1);
  localStorage.product = JSON.stringify(productData);
  showData();
  deleteAllData();
};

const deleteAllData = () => {
  if (productData.length > 0) {
    deleteAllBtn.style.display = "block";
    deleteAllBtn.innerText = `Delete All (${productData.length})`;
  } else if (productData.length == 0) {
    deleteAllBtn.style.display = "none";
  }
};

deleteAllBtn.addEventListener("click", () => {
  productData = [];
  localStorage.clear();
  showData();
  deleteAllData();
});

const updateProduct = (i) => {
  title.value = productData[i].title.toLowerCase();
  price.value = productData[i].price;
  taxes.value = productData[i].taxes;
  ads.value = productData[i].ads;
  discount.value = productData[i].discount;
  category.value = productData[i].category.toLowerCase();
  create.innerHTML = "Update";
  count.style.display = "none";
  mode = "update";
  temp = i;
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
};

let searchMode = "title";

const changeSearchMode = (id) => {
  if (id == "SBT") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  if (searchMode == "title") {
    serach.placeholder = "Search By Title";
  } else {
    serach.placeholder = "Search By Category";
  }
  serach.focus();
  serach.value = "";
  showData();
};

const searchProduct = (value) => {
  let table = "";

  if (searchMode == "title") {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td class="media-query">${i + 1}</td>
          <td >${productData[i].title}</td>
          <td >${productData[i].price}</td>
          <td class="media-query">${productData[i].taxes}</td>
          <td class="media-query">${productData[i].ads}</td>
          <td class="media-query">${productData[i].discount}</td>
          <td >${productData[i].category}</td>
          <td class="media-query">${productData[i].total}</td>
          <td ><button onclick="updateProduct(${i})">update</button></td>
          <td ><button onclick="deleteProduct(${i})">delete</button></td>
        </tr>
      `;
      }
    }
  } else {
    for (let i = 0; i < productData.length; i++) {
      if (productData[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td class="media-query">${i + 1}</td>
          <td >${productData[i].title}</td>
          <td >${productData[i].price}</td>
          <td class="media-query">${productData[i].taxes}</td>
          <td class="media-query">${productData[i].ads}</td>
          <td class="media-query">${productData[i].discount}</td>
          <td >${productData[i].category}</td>
          <td class="media-query">${productData[i].total}</td>
          <td ><button onclick="updateProduct(${i})">update</button></td>
          <td ><button onclick="deleteProduct(${i})">delete</button></td>
        </tr>
      `;
      }
    }
  }
  dataContainer.innerHTML = table;
};

showData();
deleteAllData();
console.log("hello world");
