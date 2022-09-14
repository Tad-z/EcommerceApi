const Orders = require("../models/orders");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    res.status(200).json({
      message: "Orders retrieved successfully",
      count: orders.length,
      orders,
    });
  } catch (err) {
    console.log(err);
    res.send("error");
  }
};

exports.getOrder = async (req, res) => {
  try {
    const Order = await Orders.findById(req.params.order);
    console.log(Order);
    if (!Order) {
      return res.json({ msg: "Order not found" });
    } else {
      return res.json(Order);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteAllOrders = async (req, res) => {
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
