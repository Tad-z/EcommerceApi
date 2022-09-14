const { validateEmail } = require("../Validation/validateInput");
const { signUp, logIn, deleteUser, getUsers } = require("../Logic/userLogic");

exports.signUp = async (req, res) => {
  if (validateEmail(req.body.email) === false) {
    return res.status(401).json({
      message: `Email address is not valid`,
    });
  }
  await signUp(req, res);
};

exports.logIn = async (req, res) => {
  await logIn(req, res);
};
// Deleting a user
exports.deleteUser = async (req, res) => {
  await deleteUser(req, res);
};
// Fetching users
exports.getUsers = async (req, res) => {
  await getUsers(req, res);
};
