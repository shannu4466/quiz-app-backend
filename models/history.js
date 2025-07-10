// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//  MongoDB connection
mongoose.connect("YOUR_MONGODB_ATLAS_URI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//  Mongoose schema
const quizHistorySchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    score: Number,
    totalQuestions: Number,
    answers: [
        {
            question: String,
            selected: String,
            selectedText: String,
            correct: String,
            correctText: String,
            isCorrect: Boolean,
            explanation: String,
        },
    ],
});

const QuizHistory = mongoose.model("QuizHistory", quizHistorySchema);

//  Save quiz attempt
app.post("/api/quiz-history", async (req, res) => {
    try {
        const quiz = new QuizHistory(req.body);
        await quiz.save();
        res.status(201).json({ message: "Quiz saved!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  Get all attempts
app.get("/api/quiz-history", async (req, res) => {
    try {
        const history = await QuizHistory.find().sort({ date: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
