import express from 'express';
import cors from 'cors';
import apunteRoutes from './routes/apunteRoutes'; 

const app = express();

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  
];

app.use(cors({
  origin: (origin, callback) => {
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

