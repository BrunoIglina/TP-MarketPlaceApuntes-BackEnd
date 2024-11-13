import express from 'express';
import ModificacionMateriaController from '../controllers/modificacion_materiaController.js';

const router = express.Router();

router.post('/', ModificacionMateriaController.create);
router.get('/:cod_materia/:fecha_hora_mod_materia', ModificacionMateriaController.getById);
router.get('/', ModificacionMateriaController.getAll);

export default router;
