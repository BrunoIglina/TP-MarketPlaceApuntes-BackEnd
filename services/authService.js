import nodemailer from 'nodemailer';
import { Alumno } from '../models/alumno.js';
import { Administrador } from '../models/administrador.js'; 

const verificationCodes = new Map();

export async function sendVerificationCode(email) {
    console.log('Buscando alumno con email:', email);
    const alumno = await Alumno.findOne({ where: { email_usuario: email } });
    if (!alumno) {
        console.log('Correo no encontrado:', email);
        throw new Error('Correo no encontrado');
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(email, verificationCode);
    console.log('Código de verificación generado:', verificationCode);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '¡Bentan Apuntes le recomienda ser mas cuidadoso con su contraseña!',
        text: `Tu código de verificación es: ${verificationCode}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado a:', email);
    } catch (error) {
        console.log('Error al enviar el correo:', error);
        throw new Error('Error al enviar el correo electrónico');
    }
}

export async function sendVerificationCodeAdmin(email) {
    console.log('Buscando administrador con email:', email);
    const administrador = await Administrador.findOne({ where: { email_usuario: email } });
    if (!administrador) {
        console.log('Correo no encontrado para administrador:', email);
        throw new Error('Correo no encontrado');
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(email, verificationCode);
    console.log('Código de verificación generado para administrador:', verificationCode);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '¡Bentan Apuntes le recomienda ser mas cuidadoso con su contraseña!',
        text: `Tu código de verificación es: ${verificationCode}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado a:', email);
    } catch (error) {
        console.log('Error al enviar el correo:', error);
        throw new Error('Error al enviar el correo electrónico');
    }
}

export function verifyCode(email, code) {
    const storedCode = verificationCodes.get(email);
    console.log('Código almacenado:', storedCode, 'Código recibido:', code);
    if (storedCode === code) {
        verificationCodes.delete(email);
        return true;
    }
    return false;
}

export async function changePassword(email, newPassword) {
    console.log('Cambiando contraseña para el email:', email);
    const alumno = await Alumno.findOne({ where: { email_usuario: email } });
    if (!alumno) {
        console.log('Correo no encontrado:', email);
        throw new Error('Correo no encontrado');
    }

    alumno.contraseña_usuario = newPassword;
    await alumno.save();
    console.log('Contraseña actualizada para el email:', email);
}

export async function changePasswordAdmin(email, newPassword) {
    console.log('Cambiando contraseña para el email del administrador:', email);
    const administrador = await Administrador.findOne({ where: { email_usuario: email } });
    if (!administrador) {
        console.log('Correo no encontrado:', email);
        throw new Error('Correo no encontrado');
    }

    administrador.contraseña_usuario = newPassword;
    await administrador.save();
    console.log('Contraseña actualizada para el email del administrador:', email);
}
