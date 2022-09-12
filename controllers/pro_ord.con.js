const Products = require("../models/products");
const Orders = require("../models/orders");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
  
    filename: function (req, file, cb) {
      cb(null, `${new Date().toDateString()} ${file.originalname}`);
    },
  });
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Make sure the image file extension is jpeg or jpg'), false);
    }
  };
exports.upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
  });

// const isValidate = require("../validateInput");

// const validate = require("../validate");

// creating a product
exports.postProduct = async (req, res) => {
  try {
    console.log(req.file);
    // var requiredFields = ["quantity", "title", "price", "color", "productImage"];
    // var product = req.body;

    // if (isValidate(product, requiredFields) === true) {
      const order = new Orders({
        quantity: req.body.quantity,
        createdAt: req.body.createdAt,
      });

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
    // } else {
    //   res.status(200).json({
    //     message: "Fill out required fields only",
    //   });
    // }
  } catch (err) {
    console.log(err);
  }
};

// Fetch all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find().exec();

    if (!products.length) return res.json([]);

    const mappedProducts = products.map(async (product) => {
      let order = {
        quantity: 0,
        createdAt: null,
      };

      if (product.order) {
        order = await Orders.findOne({ _id: product.order });
      }

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

// Fetch one product
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

// Fetch orders
exports.getOrders = async (req, res) => {
  try {
    const order = await Orders.find();
    res.json(order);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
};

// Fetch one order
exports.getOrder = async (req, res) => {
  try {
    const Order = await Orders.findById(req.params.order);
    console.log(Order);
    if (!Order) {
      return res.send({ msg: "Order not found" });
    } else {
      return res.json(Order);
    }
  } catch (err) {
    console.log(err);
  }
};

// update a product
exports.patchProduct = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    await Products.findByIdAndUpdate(id, req.body).then((data) => {
      if (!data) {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.send({ message: "Product was updated successfully." });
    });
  } catch (err) {
    res.send("error");
  }
};
// Delete all products
exports.deleteAllProducts = async (req, res) => {
  try {
    await Products.deleteMany({}).then((data) => {
      res.send({
        message: `${data.deletedCount} Products were deleted successfully!`,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message:
        err.message || "Some error occurred while removing all Products.",
    });
  }
};

//   Delete all orders
exports.deleteAllOrders = async (req, res) => {
  try {
    await Orders.deleteMany({}).then((data) => {
      res.send({
        message: `${data.deletedCount} Orders were deleted successfully!`,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message || "Some error occurred while removing all Orders.",
    });
  }
};
