import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';

const app = express();

// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Enable CORS with options
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/auth', authRoutes);

export default app;