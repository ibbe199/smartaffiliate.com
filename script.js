// elements
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const products = document.querySelectorAll(".product");
const productGrid = document.getElementById("productGrid");

// filter products
function filterProducts(){

let search = searchInput.value.toLowerCase();
let category = categoryFilter.value;
let price = parseInt(priceFilter.value) || Infinity;

let visible = 0;

products.forEach(product => {

let title = product.querySelector(".card-title").textContent.toLowerCase();
let desc = product.querySelector("p").textContent.toLowerCase();
let cat = product.dataset.category;
let p = parseInt(product.dataset.price);

let show =
(title.includes(search) || desc.includes(search)) &&
(category === "all" || cat === category) &&
(p <= price);

product.style.display = show ? "" : "none";

if(show) visible++;

});

// no results message
let msg = document.getElementById("noResultsMsg");

if(visible === 0){

if(!msg){

msg = document.createElement("div");
msg.id = "noResultsMsg";
msg.className = "no-results";
msg.innerHTML = "<p>No products found.</p>";
productGrid.appendChild(msg);

}

}else{

if(msg) msg.remove();

}

}

// event listeners
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
priceFilter.addEventListener("change", filterProducts);


// affiliate links from links.js

function loadAffiliateLinks(){

if(typeof links === "undefined") return;

if(document.getElementById("earbudsLink"))
document.getElementById("earbudsLink").href = links.earbuds;

if(document.getElementById("smartwatchLink"))
document.getElementById("smartwatchLink").href = links.smartwatch;

if(document.getElementById("ssdLink"))
document.getElementById("ssdLink").href = links.ssd;

if(document.getElementById("headphonesLink"))
document.getElementById("headphonesLink").href = links.headphones;

if(document.getElementById("powerbankLink"))
document.getElementById("powerbankLink").href = links.powerbank;

}

// run after page load
document.addEventListener("DOMContentLoaded", loadAffiliateLinks);
