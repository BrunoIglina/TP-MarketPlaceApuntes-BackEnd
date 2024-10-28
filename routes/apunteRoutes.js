import express from 'express';
import ApunteController from '../controllers/apunteController.js';

const router = express.Router();

router.post('/', ApunteController.create);
router.get('/', ApunteController.getAll);
router.get('/:id', ApunteController.getById);
router.put('/:id', ApunteController.update);
router.delete('/:id', ApunteController.delete);
router.get('/materias/:id', ApunteController.getByIdMateria);
router.get('/alumnos/:id', ApunteController.getByIdAlumno);

export default router;
