import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
// import questionRoutes from './routes/questionRoutes.js';
import quizHistoryRoutes from './routes/quizHistoryRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

app.use('/api/auth', authRoutes);
// app.use('/api/questions', questionRoutes);
app.use('/api/quiz-history', quizHistoryRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
