const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
 
 const parse = data => {
  const $ = cheerio.load(data);

  return $('.product_list.grid .ajax_block_product')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ')
        .split("  ")[0];
      const brand="adresseparis"
      const photo = $(element)
        .find('.left-block .product-image-container .product_img_link img')
        .attr('data-original');
      const price = parseInt(
        $(element)
          .find('.price').text()

      );
      
      const link= $(element).find('.product-name').attr('href');

      if(typeof link !="undefined")
      {
        const _id= uuidv5(link, uuidv5.URL)
        return {_id,link,brand,price,name,photo};
      }
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
