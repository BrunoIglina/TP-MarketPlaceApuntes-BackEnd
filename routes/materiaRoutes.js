import express from 'express';
import MateriaController from '../controllers/materiaController.js';

const router = express.Router();

router.post('/', MateriaController.create);
router.get('/:id', MateriaController.getById);
router.put('/:id', MateriaController.update);
router.delete('/:id', MateriaController.delete);
router.get('/', MateriaController.getAll);

export default router;

