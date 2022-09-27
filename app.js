const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./models/db");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order")
const signupRouter = require("./routes/userrou");

main()
  // .then takes a function as an argument
  .then(() => {
    console.log("DB connected");
  })
  .catch(console.error);

app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: true }));
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/user", signupRouter);

app.listen(4000, () => {
  console.log("Server started...");
});
