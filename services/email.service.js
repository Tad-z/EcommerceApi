const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });
  
  const handlebarOptions = {
    viewEngine: {
      partialsDir: process.cwd() + '/templates/',
      defaultLayout: false,
    },
    viewPath: process.cwd() + '/templates/',
  };
  
  transport.use('compile', hbs(handlebarOptions));
  
async function sendOrderConfirmationEmail(orderData) {
    const { fullname, phoneNumber, city, adress,  user, cartItems } = orderData;
  
    const mailOptions = {
      from: process.env.MY_EMAIL,
      template: 'order_confirmation',
      to: user.email, // Send the email to the user's email address
      subject: 'Order Confirmation',
      context: {
        name: user.username,
        orderItems: cartItems,
        fullname,
        phoneNumber,
        city,
        adress,
      },
    };
  
    try {
      const sendMail = await transport.sendMail(mailOptions);
      console.log('Order Confirmation Email sent successfully');
      return sendMail;
    } catch (error) {
      console.error('Error sending Order Confirmation Email:', error);
      throw error;
    }
  }

  module.exports = {
    sendOrderConfirmationEmail
  }