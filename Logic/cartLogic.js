const { ValidateFields } = require("../Validation/validateInput");
const Cart = require("../models/cart");
const Products = require("../models/products");


exports.postProducttoCart = async (req, res) => {
  try {
    var cart = req.body;
    const product = await Products.findOne({ _id: cart.productId }).exec();
    if (product) {
      var requiredFields = ["productId", "quantity"];
      if (ValidateFields(cart, requiredFields) === true) {
        const cart = new Cart({
          productId: req.body.productId,
          quantity: req.body.quantity,
          createdAt: req.body.createdAt,
        });
        const or = await cart.save();
        res.status(200).json(or);
      } else {
        res.status(200).json({
          message: "Fill out required fields",
        });
      }
    } else {
      res.status(200).json({
        message: "Product not found",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
}
exports.getProductsfromCart = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.userData.userId }).exec();
    if (!cart.length) return res.json([]);
    const mappedProducts = cart.map(async (cart) => {
      let product = {
        title: null,
        price: 0,
        color: null,
      };
      if (cart.productId) {
        product = await Products.findOne({ _id: cart.productId }, { title: 1, price: 1, color: 1, _id: 0 });
      }
      return {
        CartId: cart._id,
        quantity: cart.quantity,
        createdAt: cart.createdAt,
        product,
      };
    });
    const data = await Promise.all(mappedProducts);
    res.status(200).json({
      message: "Products retrieved successfully",
      count: cart.length,
      data,
    });
  } catch (err) {
    console.log(err.message);
    res.send("error");
  }
};

exports.getProductfromCart = async (req, res) => {
  try {
    const Product = await Cart.findById(req.params.id);
    if (!Product) {
      return res.json({ msg: "Product not found" });
    } else {
      return res.json(Product);
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteAllProductsfromCart = async (req, res) => {
  try {
    await Cart.deleteMany({}).then((data) => {
      res.json({
        message: `${data.deletedCount} Products were deleted successfully!`,
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message || "Some error occurred while removing all products.",
    });
  }
};

exports.deleteProductfromCart = async (req, res) => {
  try {
    const id = req.params.id;
    await Cart.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
          });
        } else {
          res.send({
            message: "Product was deleted successfully!"
          });
        }
      })
  } catch (err) {
    console.log(err.message);
    res.send('error');
  }
}
