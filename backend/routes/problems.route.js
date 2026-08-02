const express = require("express");
const { postProblem } = require("../controller/problems.controller")
const router = express.Router();

router.post("/addProblem",postProblem);

module.exports=router;