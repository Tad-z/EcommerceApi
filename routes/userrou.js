const express = require("express");
const router = express.Router();
const { signUp, logIn, deleteUser, getUsers } = require("../controllers/user.controller");
const { deleteAllUsers, user } = require("../Logic/userLogic");


router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/', user)
// router.get('/',getUsers)
router.delete('/:id', deleteUser);
router.delete('/', deleteAllUsers);


module.exports = router