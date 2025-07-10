// backend/models/Question.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true }, // 4 options
    correct: { type: String, required: true }
});

export default mongoose.model("Question", questionSchema);
