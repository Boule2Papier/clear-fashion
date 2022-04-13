// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable
const cheapest_tshirt="https://www.loom.fr/products/le-t-shirt";
console.log("cheapest tshirt : ",cheapest_tshirt);
console.log("////////////////////////////////////////////////")




/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable
const nb_product = marketplace.length
console.log(nb_product)
console.log("////////////////////////////////////////////////")

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have
const list_brand = []
for(let i=0;i<marketplace.length;i++){
  if(list_brand.includes(marketplace[i].brand)==false){
    list_brand.push(marketplace[i].brand)
  }
}
console.log(list_brand)
console.log(list_brand.length)
console.log("////////////////////////////////////////////////")

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
function sortFunctionPrice(marketplace){
  var sorted_price = [].concat(marketplace);
  sorted_price =sorted_price.sort(function(a,b){return a.price - b.price})
  console.log(sorted_price)
  return sorted_price
}
var sorted_price = sortFunctionPrice(marketplace)
console.log("////////////////////////////////////////////////")

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable
//.gettime()
function sortFunctionDate(marketplace){
  var sorted_date = [].concat(marketplace);
  sorted_date = sorted_date.sort(function(a,b){return new Date(a.date).getDate() - new Date(b.date).getDate()})
  sorted_date = sorted_date.sort(function(a,b){return new Date(a.date).getMonth() - new Date(b.date).getMonth()})
  sorted_date = sorted_date.sort(function(a,b){return new Date(a.date).getFullYear() - new Date(b.date).getFullYear()})
  console.log(sorted_date)
}
sortFunctionDate(marketplace)
console.log("////////////////////////////////////////////////")
// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list
var price_between_50_and_100 = [].concat(marketplace);
price_between_50_and_100 = price_between_50_and_100.filter(elem => (elem.price <100) && (elem.price >50))
console.log(price_between_50_and_100)
console.log("////////////////////////////////////////////////")

// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average
var avarage_price = 0
for(let i=0;i<marketplace.length;i++){
  avarage_price=avarage_price+marketplace[i].price
}
avarage_price=avarage_price/marketplace.length
console.log(avarage_price)
console.log("////////////////////////////////////////////////")


/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products

//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands
const brands = [];
for(let i=0;i<list_brand.length;i++){
  brands.push({
    key:   list_brand[i],
    value: []
})
}
for(let i=0;i<marketplace.length;i++){
  for(let j=0;j<brands.length;j++){
    if(marketplace[i].brand==brands[j].key){
      brands[j].value.push(marketplace[i])
    }
  }
}
console.log(brands)
for(let i=0;i<brands.length;i++){
  console.log(brands[i].value.length)
}
console.log("////////////////////////////////////////////////")
// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort
for(let i=0;i<brands.length;i++){
  sortFunctionPrice(brands[i].value)
}
console.log("////////////////////////////////////////////////")


// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort
for(let i=0;i<brands.length;i++){
  sortFunctionDate(brands[i].value)
}
console.log("////////////////////////////////////////////////")



/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products
var p90 = 0.9*marketplace.length
console.log(sorted_price[p90].price)
console.log("////////////////////////////////////////////////")


/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
function newproduct(marketplace){
  var todayDate = new Date()
  for(let i=0;i<marketplace.length;i++){
    var temp = false
    var productDate = new Date(marketplace[i].date)
    var Diff_temps = todayDate.getTime() - productDate.getTime()
    var Diff_jours = Diff_temps / (1000 * 3600 * 24)
    if(Diff_jours<14){
      temp=true
    }
    console.log(temp)
  }
}
newproduct(COTELE_PARIS)
console.log("////////////////////////////////////////////////")
// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
for(let i=0;i<COTELE_PARIS.length;i++){
  var temp = true
  COTELE_PARIS.forEach(element => {
    if(element.price>100){
      temp = false
    }    
  })
}
console.log(temp)
console.log("////////////////////////////////////////////////")

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
function findspecificproduct(uuid){
  for(let i=0;i<COTELE_PARIS.length;i++){
    if(COTELE_PARIS[i].uuid==uuid){
      console.log(COTELE_PARIS[i])
    }
  }
}
findspecificproduct(`b56c6d88-749a-5b4c-b571-e5b5c6483131`)
console.log("////////////////////////////////////////////////")


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product
function deletespecificproduct(uuid){
  for(let i=0;i<COTELE_PARIS.length;i++){
    if(COTELE_PARIS[i].uuid==uuid){
      COTELE_PARIS.splice(i)
    }
  }
}
deletespecificproduct('b56c6d88-749a-5b4c-b571-e5b5c6483131')
findspecificproduct('b56c6d88-749a-5b4c-b571-e5b5c6483131')
console.log("Normally nothing")
console.log("////////////////////////////////////////////////")

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};
function addspecificproduct(product){
  COTELE_PARIS.push(product)
}
addspecificproduct(blueJacket)
findspecificproduct('b4b05398-fee0-4b31-90fe-a794d2ccfaaa')
console.log("////////////////////////////////////////////////")
// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?
console.log(jacket)
console.log(blueJacket)
console.log("////////////////////////////////////////////////")

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
blueJacket.favorite=true;




/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
console.log(localStorage)
