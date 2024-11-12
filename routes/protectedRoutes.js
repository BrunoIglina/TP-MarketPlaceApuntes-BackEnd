import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import AlumnoController from '../controllers/alumnoController.js';

const router = express.Router();

// Rutas protegidas
router.use(authenticateToken);

router.get('/profile', AlumnoController.get);
router.post('/comprado', AlumnoController.create);
router.put('/modificar-materia/:id', AlumnoController.update);
router.get('/note-detail/:id', AlumnoController.get);

// Ruta pública
router.post('/alta-alumno', AlumnoController.create);

export default router;
