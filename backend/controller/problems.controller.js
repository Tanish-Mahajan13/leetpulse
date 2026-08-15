const User = require("../model/user.model");
const Problems = require("../model/problems.model");
const getNextRevisionDate = require("../utils/calculateNextRevision");

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

        const nextRevisionDate = getNextRevisionDate(difficulty, 0);

        const newProblem = await Problems.create({
            user_id: userId,
            title,
            url,
            code,
            difficulty,
            comment,
            next_revision_date: nextRevisionDate,
            last_revised_at: new Date()
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

module.exports.getProblems = async (req, res) => {
    try {
        const userId = req.userId;
        const allProblems = await Problems.find({ user_id: userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Problems fetched",
            problems: allProblems
        });
    } catch (error) {
        console.error("Get Problems Error:", error);
        res.status(500).json({
            success: false,
            message: "Couldn't fetch problems."
        });
    }
};

module.exports.dueProblems = async (req, res) => {
    try {
        const userId = req.userId;
        const dueProblems = await Problems.find({
            user_id: userId,
            next_revision_date: { $lte: new Date() }
        }).sort({ next_revision_date: 1 });

        res.status(200).json({
            success: true,
            message: "Due Problems fetched",
            problems: dueProblems
        });
    } catch (error) {
        console.error("Due Problems Error:", error);
        res.status(500).json({
            success: false,
            message: "Couldn't fetch problems."
        });
    }
};

module.exports.reviseProblem = async (req, res) => {
    try {
        const userId = req.userId;
        const problemId = req.params.id;
        const { success } = req.body;

        let problem = await Problems.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        if (!problem.user_id.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to modify this problem"
            });
        }

        const newRevisionCount = success ? problem.revision_count + 1 : 0;
        const nextRevisionDate = getNextRevisionDate(problem.difficulty, newRevisionCount);

        problem.revision_count = newRevisionCount;
        problem.next_revision_date = nextRevisionDate;
        problem.last_revised_at = new Date();

        await problem.save();

        res.status(200).json({
            success: true,
            message: success ? "Great job! Interval increased." : "No worries, resetting the interval.",
            problem
        });

    } catch (error) {
        console.error("Revise Problem Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error while revising problem"
        });
    }
};

module.exports.toggleFlag = async (req, res) => {
    try {
        const userId = req.userId;
        const problemId = req.params.id;

        let problem = await Problems.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        if (!problem.user_id.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to modify this problem"
            });
        }

        problem.is_flagged = !problem.is_flagged;
        await problem.save();

        res.status(200).json({
            success: true,
            message: "flag changed",
            problem
        });

    } catch (error) {
        console.error("Toggle Flag Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports.getFlaggedProblems = async (req, res) => {
    try {
        const userId = req.userId;
        const flaggedProblems = await Problems.find({ user_id: userId, is_flagged: true });

        res.status(200).json({
            success: true,
            message: "Flagged Problems fetched successfully",
            problems: flaggedProblems
        });
    } catch (error) {
        console.error("Flagged Problem Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports.getProblemById = async (req, res) => {
    try {
        const userId = req.userId;
        const problemId = req.params.id;

        const problem = await Problems.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        if (!problem.user_id.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to view this problem"
            });
        }

        res.status(200).json({
            success: true,
            problem
        });
    } catch (error) {
        console.error("Get Problem Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports.updateProblem = async (req, res) => {
    try {
        const userId = req.userId;
        const problemId = req.params.id;
        const { title, url, code, difficulty, comment } = req.body;

        const problem = await Problems.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        if (!problem.user_id.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to modify this problem"
            });
        }

        if (title !== undefined) problem.title = title;
        if (url !== undefined) problem.url = url;
        if (code !== undefined) problem.code = code;
        if (difficulty !== undefined) problem.difficulty = difficulty;
        if (comment !== undefined) problem.comment = comment;

        await problem.save();

        res.status(200).json({
            success: true,
            message: "Problem updated successfully",
            problem
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "You already have a problem with this URL"
            });
        }
        console.error("Update Problem Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error while updating problem"
        });
    }
};

module.exports.deleteProblem = async (req, res) => {
    try {
        const userId = req.userId;
        const problemId = req.params.id;

        const problem = await Problems.findById(problemId);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found"
            });
        }

        if (!problem.user_id.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this problem"
            });
        }

        await problem.deleteOne();

        res.status(200).json({
            success: true,
            message: "Problem deleted successfully"
        });

    } catch (error) {
        console.error("Delete Problem Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error while deleting problem"
        });
    }
};