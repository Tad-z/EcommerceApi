const { ValidateFields } = require("../Validation/validateInput");
const Orders = require("../models/orders");
const Products = require("../models/products");


exports.postOrderstoCart = async (req, res) => {
  try {
    var order = req.body;
    const product = await Products.findOne({ _id: order.productId }).exec();
    if (product) {
      var requiredFields = ["productId", "quantity"];
      if (ValidateFields(order, requiredFields) === true) {
        const order = new Orders({
          productId: req.body.productId,
          quantity: req.body.quantity,
          createdAt: req.body.createdAt,
        });
        const or = await order.save();
        res.status(200).json(or)
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
    console.log(err);
  }
}
exports.getOrdersfromCart = async (req, res) => {
  try {
    const orders = await Orders.find().exec();
    if (!orders.length) return res.json([]);
    const mappedOrders = orders.map(async (order) => {
      let product = {
        title: null,
        price: 0,
        color: null,
      };
      if (order.productId) {
        product = await Products.findOne({ _id: order.productId }, { title: 1, price: 1, color: 1, _id: 0 });
      }
      return {
        OrderId: order._id,
        quantity: order.quantity,
        createdAt: order.createdAt,
        product,
      };
    });
    const data = await Promise.all(mappedOrders);
    res.status(200).json({
      message: "Orders retrieved successfully",
      count: orders.length,
      data,
    });
  } catch (err) {
    console.log(err);
    res.send("error");
  }
};

exports.getOrderfromCart = async (req, res) => {
  try {
    const Order = await Orders.findById(req.params.order);
    if (!Order) {
      return res.json({ msg: "Order not found" });
    } else {
      return res.json(Order);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteAllOrdersfromCart = async (req, res) => {
  try {
    await Orders.deleteMany({}).then((data) => {
      res.json({
        message: `${data.deletedCount} Orders were deleted successfully!`,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message || "Some error occurred while removing all Orders.",
    });
  }
};

exports.deleteOrderfromCart = async (req, res) => {
  try {
    const id = req.params.id;
    await Orders.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Order with id=${id}. Maybe Diary was not found!`
          });
        } else {
          res.send({
            message: "Order was deleted successfully!"
          });
        }
      })
  } catch (err) {
    res.send('error')
  }
}
