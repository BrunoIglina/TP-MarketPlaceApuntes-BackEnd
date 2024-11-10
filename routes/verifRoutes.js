import express from 'express';
import VerifController from '../controllers/verifController.js';

const router = express.Router();

router.post('/send-verification-code', VerifController.sendVerificationCode);
router.post('/verify-code-and-change-password', VerifController.verifyCodeAndChangePassword);

export default router;