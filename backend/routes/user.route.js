const express = require("express");
const { postRegisterUser, loginUser } = require("../controller/user.controller");
const router = express.Router();

router.post("/register",postRegisterUser);
router.post("/login",loginUser);

module.exports=router;