const express = require("express");
const { postRegisterUser, loginUser, getMe, logoutUser } = require("../controller/user.controller");
const router = express.Router();
const isLogin = require("../middleware/isLogin");

router.get("/me", isLogin, getMe);
router.post("/register",postRegisterUser);
router.post("/login",loginUser);
router.post("/logout", logoutUser);

module.exports=router;