import express from 'express';
import { createPreference, getFeedback } from '../controllers/mercadoPagoController.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();


router.post('/create_preference', createPreference);


router.get('/feedback', getFeedback);

export default router;
