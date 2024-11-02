import express from 'express';
import ApunteController from '../controllers/apunteController.js';
import upload from '../middleware/multerConfig.js';


const router = express.Router();

router.post('/', upload.fields([
    { name: 'archivo_apunte', maxCount: 1 },
    { name: 'archivo_caratula', maxCount: 1 } 
  ]), ApunteController.create);
router.get('/', ApunteController.getAll);
router.get('/:id', ApunteController.getById);
router.put('/:id', ApunteController.update);
router.delete('/:id', ApunteController.delete);
router.get('/materias/:id', ApunteController.getByIdMateria);
router.get('/alumnos/:id', ApunteController.getByIdAlumno);
router.get('/descargar/:id', ApunteController.download);

export default router;
