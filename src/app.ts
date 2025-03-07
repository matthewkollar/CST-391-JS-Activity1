// Import necessary modules
import express, { Request, Response } from 'express';
import albumsRouter from './albums/albums.routes';
import artistsRouter from './artists/artists.routes';
import helmet from 'helmet';
import cors from 'cors';
import logger from './middleware/logger.middleware';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000; // Default to 5000 if PORT is undefined

// Enable all CORS requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Add security middleware
app.use(helmet());

// Console log MySQL Host
console.log(`MySQL Host: ${process.env.MY_SQL_DB_HOST}`);

// Use logger middleware in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode');
}

// Root Route
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Welcome to the Music API</h1>');
});

// Correct Router Middleware Registration
app.use('/albums', albumsRouter);
app.use('/artists', artistsRouter);

// Start Express Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
