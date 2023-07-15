'use strict';

const productCards = document.querySelector('.product-cards');
const categoryListArea = document.querySelector('.category-list-area');

let cards = "";

let filteredCategories = [];
let checkedCategory = [];

const getProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    return products;
}

async function productList() {
    const products = await getProducts();
    cards = "";
    let allCategory = [];
    products.forEach(product => {
        allCategory.push(product.category);
        cards += `<div class="card"><img src="${product.image}" alt="product-image"><div class="card-info"><h3 class="category">${product.category}</h3><p class="price">$ ${product.price}</p><div class="title">${product.title}</div></div></div>`;
    });
    productCards.innerHTML = cards;
    categoryList(allCategory);
}

function categoryList(allCategory) {
    filteredCategories = [];
    let box = "";
    allCategory.forEach(category => {
        if (!filteredCategories.includes(category)) {
            filteredCategories.push(category);
            box += `<label><input type="checkbox" onclick="filterCategory()" value="${category}"> ${category}</label>`;
        }
    });
    categoryListArea.innerHTML = box;
}

function filterCategory() {
    checkedCategory = [];
    const categoryBox = document.querySelectorAll("input[type='checkbox']");
    categoryBox.forEach(category => {
        if (category.checked) {
            checkedCategory.push(category.value);
        }
    });
    categorisedProductList();
}

async function categorisedProductList() {
    if (checkedCategory.length) {
        const products = await getProducts();
        cards = "";
        products.forEach(product => {
            if (checkedCategory.includes(product.category)) {
                cards += `<div class="card"><img src="${product.image}" alt="product-image"><div class="card-info"><h3 class="category">${product.category}</h3><p class="price">$ ${product.price}</p><div class="title">${product.title}</div></div></div>`;
            }
        });
        productCards.innerHTML = cards;
    } else {
        productList();
    }
}

window.addEventListener('load', productList);