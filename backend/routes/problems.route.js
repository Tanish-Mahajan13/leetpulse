const express = require("express");
const { postProblem } = require("../controller/problems.controller")
const isLogin = require("../middleware/isLogin");
const router = express.Router();

router.post("/addProblem",isLogin,postProblem);

module.exports=router;