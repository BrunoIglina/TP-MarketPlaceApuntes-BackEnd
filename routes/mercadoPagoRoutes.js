import express from 'express';
import { createPreference, getFeedback } from '../controllers/mercadoPagoController.js';

const router = express.Router();


router.post('/create_preference', createPreference);


router.get('/feedback', getFeedback);

export default router;
