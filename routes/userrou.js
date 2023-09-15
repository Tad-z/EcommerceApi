const express = require("express");
const router = express.Router();
const { signUp, logIn, deleteUser, getUser, getUsers } = require("../controllers/user.controller");
const { deleteAllUsers,  } = require("../Logic/userLogic");
const auth = require("../Authorization/auth");


router.post('/signup', signUp);
router.post('/login', logIn);
router.delete('/:id', deleteUser);
router.get('/',getUsers)
router.get('/user', auth, getUser)

router.delete('/', deleteAllUsers);



module.exports = router