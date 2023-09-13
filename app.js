const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();
app.use(cookieParser());
require("dotenv").config();
const cron = require('node-cron');
const axios = require('axios')
const main = require("./models/db");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order")
const signupRouter = require("./routes/userrou");
const cors = require("cors")

main()
  // .then takes a function as an argument
  .then(() => {
    app.listen(4000, () => {
      console.log("Server started...");
    });
    console.log("DB connected");
  })
  .catch(console.error);


app.use(cors({
  credentials: true,
  origin: ['https://emax.vercel.app','https://emaxapp.onrender.com/', 'http://localhost:3000',]
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/setcookie', (req, res) => {
  res.cookie(`Cookie token name`,`encrypted cookie string Value`);
  res.send('Cookie have been saved successfully');
});

app.get('/getcookie', (req, res) => {
  //show the saved cookies
  console.log(req.cookies)
});
app.use('/uploads', express.static('uploads'))
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/user", signupRouter);

cron.schedule('0 */1 * * *', async () => {
  try {
    // Make a GET request to a specific endpoint (e.g., /api/keep-alive)
    const response = await axios.get(`https://emaxapi.onrender.com/products/`)
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.message);
  } console.error('Keep-alive request error:', error);
});

module.exports = app;


