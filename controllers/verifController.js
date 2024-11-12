import { sendVerificationCode, verifyCode, changePassword, sendVerificationCodeAdmin, changePasswordAdmin } from '../services/authService.js';

class VerifController {
    async sendVerificationCode(req, res) {
        try {
            console.log('Solicitud para enviar código de verificación recibida:', req.body.email);
            await sendVerificationCode(req.body.email);
            res.status(200).json({ message: 'Código de verificación enviado' });
        } catch (error) {
            console.log('Error en sendVerificationCode:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async verifyCodeAndChangePassword(req, res) {
        const { email, verificationCode, newPassword } = req.body;
        try {
            console.log('Solicitud para verificar código y cambiar contraseña recibida:', email);
            if (verifyCode(email, verificationCode)) {
                await changePassword(email, newPassword);
                res.status(200).json({ message: 'Contraseña actualizada correctamente' });
            } else {
                console.log('Código de verificación incorrecto para el email:', email);
                res.status(400).json({ error: 'Código de verificación incorrecto' });
            }
        } catch (error) {
            console.log('Error en verifyCodeAndChangePassword:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async sendVerificationCodeAdmin(req, res) {
        try {
            console.log('Solicitud para enviar código de verificación recibida para administrador:', req.body.email);
            await sendVerificationCodeAdmin(req.body.email);
            res.status(200).json({ message: 'Código de verificación enviado' });
        } catch (error) {
            console.log('Error en sendVerificationCodeAdmin:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async verifyCodeAndChangePasswordAdmin(req, res) {
        const { email, verificationCode, newPassword } = req.body;
        try {
            console.log('Solicitud para verificar código y cambiar contraseña recibida para administrador:', email);
            if (verifyCode(email, verificationCode)) {
                await changePasswordAdmin(email, newPassword);
                res.status(200).json({ message: 'Contraseña actualizada correctamente' });
            } else {
                console.log('Código de verificación incorrecto para el email del administrador:', email);
                res.status(400).json({ error: 'Código de verificación incorrecto' });
            }
        } catch (error) {
            console.log('Error en verifyCodeAndChangePasswordAdmin:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

export default new VerifController();
