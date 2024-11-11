import express from 'express';
import CompraController from '../controllers/compraController.js';

const router = express.Router();

router.post('/', CompraController.create);
router.patch('/:numero_alumno/:id_apunte', CompraController.updateCalificacion);
router.get('/:numero_alumno', CompraController.getCompras);
router.get('/:numero_alumno/:id_apunte', CompraController.getCompra);
router.get('/apuntes/contar/:id_apunte', CompraController.getComprasContador);

export default router;
