const Cart = require("../models/cart");
const Products = require("../models/products");


async function mappedProducts(cart) {
    const mappedProducts = cart.map(async (cart) => {
        let product = {
          title: null,
          price: 0,
          color: null,
          slug: null,
        };
        if (cart.productId) {
          product = await Products.findOne({ _id: cart.productId }, { title: 1,slug: 1,
             price: 1, productImage: 1, color: 1, _id: 0 });
        }
        return {
          CartId: cart._id,
          userId: cart.userId,
          quantity: cart.quantity,
          createdAt: cart.createdAt,
          product,
        };
      });
      const cartItems = await Promise.all(mappedProducts);
      return cartItems;
}

async function mappedProductss(cart) {
    const mappedProducts = cart.map(async (cart) => {
        let product = {
          title: null,
          price: 0,
          color: null,
          slug: null,
        };
        if (cart.productId) {
          product = await Products.findOne({ _id: cart.productId }, { title: 1,slug: 1,
             price: 1, productImage: 1, color: 1, _id: 0 });
        }
        return {
          quantity: cart.quantity,
          product,
        };
      });
      const cartItems = await Promise.all(mappedProducts);
      return cartItems;
}

module.exports = {
    mappedProducts,
    mappedProductss
}