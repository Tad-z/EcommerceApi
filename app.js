const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./models/db");
const productRouter = require("./routes/products");
const orderRouter = require("./routes/orders");
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
app.use("/orders", orderRouter);
app.use("/user", signupRouter);

app.listen(3000, () => {
  console.log("Server started...");
});
