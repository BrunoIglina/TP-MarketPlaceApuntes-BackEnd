import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/login-admin', AuthController.loginAdmin);

export default router;
