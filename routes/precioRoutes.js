import express from 'express';
import PrecioController from '../controllers/precioController.js';

const router = express.Router();

router.post('/', PrecioController.create);
router.get('/:id', PrecioController.getUltPrecio);
router.put('/:id', PrecioController.update);

export default router;
