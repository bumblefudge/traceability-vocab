const faker = require('faker');
// Include test data for ecom products.
const prods = require('../data/generated/EcomProducts.json');
const orders = require('../data/generated/orderVCIDs.json');

const getEcommercePackingListItem = () => {
  // create a list of orderes for products in package
  const randomOrder = faker.random.number({
    min: 1,
    max: Object.keys(orders).length,
  });
  const itemOrder = orders.order[randomOrder];
  // create a list of ordered products
  let numItemsinOrder = faker.random.number({ min: 1, max: 4 });
  const productlist = [];
  while (numItemsinOrder > 0) {
    const randomProd = faker.random.number({
      min: 0,
      max: Object.keys(prods).length - 1,
    });
    const itemOrderedProduct = prods[randomProd].productID;
    productlist.push(itemOrderedProduct);
    numItemsinOrder -= 1;
  }

  const example = {
    '@context': ['https://w3id.org/traceability/v1'],
    type: 'EcommercePackingListItem',
    orderID: itemOrder,
    productInOrder: productlist,
  };

  return example;
};

module.exports = { getEcommercePackingListItem };
