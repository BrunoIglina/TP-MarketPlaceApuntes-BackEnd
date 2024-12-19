import express from 'express';
import MateriaController from '../controllers/materiaController.js';

const router = express.Router();

router.post('/', MateriaController.create);
router.get('/:id', MateriaController.getById);
router.put('/:id', MateriaController.update);
router.delete('/:id', MateriaController.delete);
router.put('/:id/restaurar', MateriaController.restore);
router.get('/', MateriaController.getAll);
router.get('/bajas/totales', MateriaController.getAllMateriaBaja);

export default router;


