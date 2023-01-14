const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signUp = async (req, res) => {
  const user = req.body;
  if (user.username.length < 4 || user.username.length > 15) {
    res.status(400).json({
      message: "Username length should be between 4-15 characters long",
    });
    return;
  } else if (user.password.length < 6 || user.password.length > 15) {
    res.status(400).json({
      message: "Password should be stronger, try adding more characters",
    });
    return;
  }
  try {
    const user = User.find({ username: req.body.username.toLowerCase() }).exec();
    if ((await user).length >= 1) {
      return res.status(409).json({
        message: `username exists already use a different username`,
      });
    } else {
      console.log(user);
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const user = new User({
            username: req.body.username.toLowerCase(),
            email: req.body.email,
            password: hash,
          });
          await user.save().then((result) => {
            if (result) {
              console.log(result);
              res.status(200).json({
                message: "You have signed up successfully",
              });
            } else {
              console.log("error occured");
              res.status(400).json({
                message: "An error occured",
              });
            }
          });
        }
      });
    }
  } catch (err) {
    console.log(err.message);
    res.send("error");
  }
};

exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(401).json({
        message: `username or password is incorrect`,
      });
    }
    const result = await bcrypt.compare(req.body.password, user.password)
    if (!result) {
      return res.status(401).json({
        message: `Authentication failed`,
      });
    } else if (result) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({
        message: `Authentication successful`,
        token: token
      });
    }
    return res.status(401).json({
      message: `Username or password incorrect`,
    });
  } catch (err) {
    res.json("error");
    console.log(err.message);
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndRemove(id).then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.json({
          message: "User was deleted successfully!",
        });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.json("error");
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({}).then((data) => {
      res.json({
        message: `${data.deletedCount} Users were deleted from cart successfully!`,
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message || "Some error occurred while removing all users.",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users retrieved successfully",
      count: users.length,
      users,
    });
  } catch (err) {
    console.log(err.message);
    res.json("error");
  }
}