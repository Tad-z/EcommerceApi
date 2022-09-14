const { isValidate } = require("../Validation/validateInput");
const Orders = require("../models/orders");
const Products = require("../models/products");

exports.postProduct = async (req, res) => {
  try {
    console.log(req.body);
    var requiredFields = ["quantity", "title", "price", "color"];
    var product = req.body;
    // Checks whether all required fields were filled before moving on
    if (ValidateFields(product, requiredFields) === true) {
      const order = new Orders({
        quantity: req.body.quantity,
        createdAt: req.body.createdAt,
      });
      // Saving a product
      const product = new Products({
        productImage: req.file.path,
        title: req.body.title,
        price: req.body.price,
        color: req.body.color,
        order: order._id,
        createdat: req.body.createdAt,
      });
      await order.save();
      const p = await product.save();
      res.json(p);
    } else {
      res.status(200).json({
        message: "Fill out required fields",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getProducts = async (req, res) => {
  try {
    // Finds all products saved
    const products = await Products.find().exec();
    // If there are no products it returns an empty array
    if (!products.length) return res.json([]);
    // Maps each product found
    const mappedProducts = products.map(async (product) => {
      let order = {
        quantity: 0,
        createdAt: null,
      };
      // If the product has an order it gets the order throught it's Id
      if (product.order) {
        order = await Orders.findOne({ _id: product.order });
      }
      // Projects data to be returned
      return {
        productImage: product.productImage,
        Title: product.title,
        productId: product._id,
        price: product.price,
        color: product.color,
        order,
        createdAt: product.createdAt,
      };
    });

    const data = await Promise.all(mappedProducts);
    res.status(200).json({
      message: "Products retrieved successfully",
      count: products.length,
      data,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    console.log(product);
    if (!product) {
      return res.send({ msg: "Product not found" });
    } else {
      return res.json(product);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.patchProduct = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    await Products.findByIdAndUpdate(id, req.body).then((data) => {
      if (!data) {
        res.json({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.json({ message: "Product was updated successfully." });
    });
  } catch (err) {
    res.json("error");
  }
};

exports.deleteAllProducts = async (req, res) => {
  try {
    await Products.deleteMany({}).then((data) => {
      res.json({
        message: `${data.deletedCount} Products were deleted successfully!`,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message:
        err.message || "Some error occurred while removing all Products.",
    });
  }
};
