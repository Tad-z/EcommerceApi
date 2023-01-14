const { ValidateFields, ValidateInput } = require("../Validation/validateInput");
const Cart = require("../models/cart");
const Products = require("../models/products");


exports.postProducttoCart = async (req, res) => {
  try {
    var cart = req.body;
    const product = await Products.findOne({ _id: cart.productId }).exec();
    if (product) {
      var requiredFields = ["productId", "quantity"];
      if (ValidateInput(cart, requiredFields) === true) {
        const cart = new Cart({
          productId: req.body.productId,
          userId: req.userData.userId,
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
    console.log(req.userData);
    if (!cart.length) return res.json([]);
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
    res.status(200).json({
      message: "Products retrieved successfully",
      count: cart.length,
      cartItems,
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

exports.patchQuantity = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    await Cart.findByIdAndUpdate(id, req.body).then((data) => {
      if (!data) {
        res.json({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.json({ message: "Product was updated successfully." });
    });
  } catch (err) {
    console.log(err.message);
    res.json("error");
  }
};


exports.deleteAllProductsfromCart = async (req, res) => {
  try {
    await Cart.deleteMany({}).then((data) => {
      res.status(204).json({
        message: `${data.deletedCount} Products were deleted from cart successfully!`,
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message || "Some error occurred while removing all products from cart.",
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
            message: `Cannot delete Product with id=${id} from. Maybe Product was not found!`
          });
        } else {
          res.status(204).json({
            message: "Product was deleted successfully!"
          });
        }
      })
  } catch (err) {
    console.log(err.message);
    res.send('error');
  }
}
