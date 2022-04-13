const dedicatedbrand = require('./sites/dedicatedbrand');
const montlimart = require('./sites/montlimart');
const adresseparis = require('./sites/adresseparis');
async function sandbox (eshop) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    products1 = await dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/news');
    products2 = await montlimart.scrape('https://www.montlimart.com/toute-la-collection.html?limit=all');
    products3 = await adresseparis.scrape('https://adresse.paris/630-toute-la-collection');
    products1=products1.concat(products2)
    products1=products1.concat(products3)
    console.log(products1)
    
    saveToFile(products1)

    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
const [,, eshop] = process.argv;
sandbox()

function saveToFile(products){
  const fs=require('fs');
  const json=JSON.stringify(products);


  fs.writeFileSync("./all_products.json",json,function(err, result) {
   if(err) console.log('error', err);
 });
}



