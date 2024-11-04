import express from 'express';
import cors from 'cors';
import routes from './routes';
var cookieParser = require('cookie-parser')


const app = express();

// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Enable CORS with options
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser()); 
app.use('/api', routes);

export default app;