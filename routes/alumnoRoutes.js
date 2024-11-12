import express from 'express';
import AlumnoController from '../controllers/alumnoController.js';

const router = express.Router();

router.post('/', AlumnoController.create);
router.put('/:id', AlumnoController.update);
router.get('/:id', AlumnoController.get);

export default router;