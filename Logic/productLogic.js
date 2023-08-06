const Products = require("../models/products");

exports.postProduct = async (req, res) => {
  try {
    // Saving a product
    const product = new Products({
      productImage: req.file.path,
      title: req.body.title,
      price: req.body.price,
      color: req.body.color,
      slug: req.body.slug,
      createdat: req.body.createdAt,
    });
    const p = await product.save();
    res.json(p);
  } catch (err) {
    console.log(err.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
    // Finds all products saved
    const products = await Products.find().exec();
    // If there are no products it returns an empty array
    if (!products.length) return res.json([]);
    // Maps each product found
    const count = products.length;
    const result = await res.paginatedResults
    // Projects data to be returned
    res.status(200).json({
      message: "Products retrieved successfully",
      count,
      // count: products.length,
      // products,
      result
    });

  } catch (err) {
    console.log(err.message);
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
    console.log(err.message);
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
    console.log(err.message);
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
    console.log(err.message);
    res.status(400).json({
      message:
        err.message || "Some error occurred while removing all Products.",
    });
  }
};

