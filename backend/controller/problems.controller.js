const User = require("../model/user.model");
const Problems = require("../model/problems.model");

module.exports.postProblem = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, url, code, difficulty, comment } = req.body;

        if (!title || !url || !code || !difficulty) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, url, code, and difficulty."
            });
        }

        const newProblem = await Problems.create({
            user_id: userId,
            title,
            url,
            code,
            difficulty,
            comment
        });

        res.status(201).json({
            success: true,
            message: "Problem added successfully",
            problem: newProblem
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "You've already added this problem."
            });
        }

        console.error("Add Problem Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error while adding problem"
        });
    }
};