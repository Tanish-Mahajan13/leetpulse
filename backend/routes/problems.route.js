const express = require("express");
const { postProblem, getProblems, dueProblems, reviseProblem, toggleFlag, getFlaggedProblems } = require("../controller/problems.controller")
const isLogin = require("../middleware/isLogin");
const router = express.Router();

router.post("/addProblem",isLogin,postProblem);
router.get("/getProblems",isLogin,getProblems);
router.get("/dueProblems",isLogin,dueProblems);
router.patch("/:id/revise", isLogin, reviseProblem);
router.patch("/:id/flag", isLogin, toggleFlag);
router.get("/flaggedProblems", isLogin, getFlaggedProblems);


module.exports=router;