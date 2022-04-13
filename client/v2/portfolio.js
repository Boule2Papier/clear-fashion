// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let allProducts = [];
let favoritesProducts = [];
// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectFilter = document.querySelector('#filter-select')
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const p50 = document.querySelector('#p50');
const p90 = document.querySelector('#p90');
const p95 = document.querySelector('#p95');
const lastReleaseDate = document.querySelector('#last-release-date');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}" target="_blank">${product.name}</a>
        <span>${product.price}</span>   Add to favorites : 
        <input type="button" onclick=fav(this) value="${product.name}">
      </div>
    `;
    })
    .join('');
  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

const renderBrands = brands => {
  var options = ""
  for(let i=0;i<brands.length;i++){
    options+=`<option value="${brands[i]}">${brands[i]}</option>`
  }
  selectBrand.innerHTML = options;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};




/**
 * Render page selector
 * @param  {Object} pagination
 */

function renderIndicators(products , pagination){
  const {count} = pagination;

  spanNbProducts.innerHTML = count;

  if(products.length!=0){
    p50.innerHTML = sortFunctionPrice(products)[Math.trunc(0.5*products.length)].price;

    p90.innerHTML = sortFunctionPrice(products)[Math.trunc(0.9*products.length)].price;
  
    p95.innerHTML = sortFunctionPrice(products)[Math.trunc(0.95*products.length)].price;
    
    lastReleaseDate.innerHTML = sortFunctionDate(products)[products.length-1].released;
  }
}

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(products, pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectPage.addEventListener('change', async (event) => {
  const pagination = await fetchProducts(parseInt(event.target.value), currentProducts.products);

  setCurrentProducts(pagination);
  render(currentProducts, currentPagination);
});

selectBrand.addEventListener('change', async (event) => {
  const products = await fetchProducts(1 , 100000);
  products["result"] = brandfilter(products["result"],event.target.value)

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectFilter.addEventListener('change', async (event) => {
  const products = await fetchProducts(1 , 100000);
  products["meta"] = event.target.value
  if(products["meta"]=="recent-product"){
    products["result"]=recentproduct(products["result"])
  }
  if(products["meta"]=="reasonable-product"){
    products["result"]=reasonableproduct(products["result"])
  }
  if(products["meta"]=="favorite-product"){
    products["result"]=favoritesProducts
  }

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

selectSort.addEventListener('change', async (event) => {
  const products = await fetchProducts(1 , 100000);
  products["meta"] = event.target.value
  if(products["meta"]=="price-asc"){
    products["result"] = sortFunctionPrice(products["result"])
  }
  if(products["meta"]=="price-desc"){
    products["result"] = sortFunctionPrice(products["result"])
    products["result"].reverse()
  }
  if(products["meta"]=="date-asc"){
    products["result"] = sortFunctionDate(products["result"])
  }
  if(products["meta"]=="date-desc"){
    products["result"] = sortFunctionDate(products["result"])
    products["result"].reverse()
  }
  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});






document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts(1 , 100000);
  var brands = brandlist(products["result"]);
  allProducts=products["result"];
  renderBrands(brands);
});

function brandlist(marketplace){
  const list_brand = []
  for(let i=0;i<marketplace.length;i++){
    if(list_brand.includes(marketplace[i].brand)==false){
      list_brand.push(marketplace[i].brand)
    }
  }
  return list_brand
}
function brandfilter(marketplace,brand){
  const list_filter = []
  for(let i=0;i<marketplace.length;i++){
    if(marketplace[i].brand==brand){
      list_filter.push(marketplace[i])
    }
  }
  return list_filter
}

function sortFunctionDate(marketplace){
  var sorted_date = [].concat(marketplace);
  sorted_date = sorted_date.sort(function(a,b){return new Date(a.released).getDate() - new Date(b.released).getDate()})
  sorted_date = sorted_date.sort(function(a,b){return new Date(a.released).getMonth() - new Date(b.released).getMonth()})
  sorted_date = sorted_date.sort(function(a,b){return new Date(a.released).getFullYear() - new Date(b.released).getFullYear()})
  return sorted_date
}

function sortFunctionPrice(marketplace){
  var sorted_price = [].concat(marketplace);
  sorted_price =sorted_price.sort(function(a,b){return a.price - b.price})
  return sorted_price
}





function reasonableproduct(marketplace){

  const reasonablePrice = []
  for(let i=0;i<marketplace.length;i++){
    if(marketplace[i].price<50){
      reasonablePrice.push(marketplace[i])
    }
  }

  return reasonablePrice
}


function recentproduct(marketplace){

  var todayDate = new Date()
  const recentDate = []
  for(let i=0;i<marketplace.length;i++){
    var productDate = new Date(marketplace[i].released)
    var Diff_temps = todayDate.getTime() - productDate.getTime()
    var Diff_jours = Diff_temps / (1000 * 3600 * 24)
    if(Diff_jours<14){
      recentDate.push(marketplace[i])
    }
  }

  return recentDate
}

function fav(favorite){
  for(let i=0;i<allProducts.length;i++){
    if(favorite.value==allProducts[i].name){
      favoritesProducts.push(allProducts[i])
    }
  }
}
