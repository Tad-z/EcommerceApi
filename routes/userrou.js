const express = require("express");
const router = express.Router();
const { signUp, logIn, deleteUser } = require("../controllers/usercon")


router.post('/signup', signUp);
router.post('/login', logIn);
router.delete('/:id', deleteUser);


module.exports = router