import express from 'express';
import QuizHistory from '../models/QuizHistory.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST new quiz attempt user attached
router.post('/', auth, async (req, res) => {
    try {
        const quiz = new QuizHistory({
            ...req.body,
            user: req.user._id, 
        });
        await quiz.save();
        res.status(201).json({ message: 'Quiz history saved!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET quiz history for logged in user only
router.get('/', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await QuizHistory.find({ user: req.user._id }).sort({ date: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
