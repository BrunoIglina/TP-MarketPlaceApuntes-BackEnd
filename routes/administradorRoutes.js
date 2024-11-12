import express from 'express';
import AdministradorController from '../controllers/administradorController.js';

const router = express.Router();

router.post('/', AdministradorController.create);
router.put('/:id', AdministradorController.update);
router.get('/:id', AdministradorController.get);

export default router;