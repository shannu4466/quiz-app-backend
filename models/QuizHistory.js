import mongoose from 'mongoose';

const quizHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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

export default mongoose.model('QuizHistory', quizHistorySchema);
