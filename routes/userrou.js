const express = require("express");
const router = express.Router();
const { signUp, logIn, deleteUser, getUsers } = require("../controllers/user.controller")


router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/',getUsers)
router.delete('/:id', deleteUser);


module.exports = router