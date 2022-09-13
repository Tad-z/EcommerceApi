const Orders = require("../models/orders");
// Fetch orders
exports.getOrders = async (req, res) => {
    try {
      const orders = await Orders.find();
      res.status(200).json({
        message: "Orders retrieved successfully",
        count: orders.length,
        orders,
      });;
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