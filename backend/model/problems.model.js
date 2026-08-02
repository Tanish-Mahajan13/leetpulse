const mongoose = require("mongoose");

const problemsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    comment: {
        type: String,
        default: ''
    },
    revision_count: {
        type: Number,
        default: 0
    },
    last_revised_at: {
        type: Date,
        default: Date.now
    },
    next_revision_date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

problemsSchema.index({ user_id: 1, url: 1 }, { unique: true });

const Problems = mongoose.model("Problems", problemsSchema);
module.exports = Problems;