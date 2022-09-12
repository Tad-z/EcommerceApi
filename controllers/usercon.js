const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const user = User.find({ username: req.body.username }).exec();
    if ((await user).length >= 1) {
      return res.status(409).json({
        message: `username exists already use a different username`,
      });
    } else {
      console.log("user");
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const user = new User({
            username: req.body.username,
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
    console.log(err);
    res.send("error");
  }
};

exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(401).json({
        message: `Authentication failed`,
      });
    }
    // const comparePass = bcrypt.compareSync(req.body.password, user.password);
    // if (!comparePass) {
    //   return res.status(401).json({ message: `Authentication failed` });
    // }
    // return res.status(200).json({ message: `Authentication successful` });
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
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
          token: token,
        });
      }
    });
  } catch (err) {
    res.send("error");
    console.log(err);
  }
};

// Deleting a user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndRemove(id).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    });
  } catch (err) {
    res.send("error");
  }
};
