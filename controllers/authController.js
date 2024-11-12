// controllers/authController.js
import jwt from 'jsonwebtoken';
import { getAlumnoByLegajo } from '../models/alumno.js';
import { getAdministradorByNombreUsuario } from '../models/administrador.js';

class AuthController {
  login = async (req, res) => {
    const { legajo, password } = req.body;

    try {
      const alumno = await getAlumnoByLegajo(legajo);
      if (!alumno || alumno.contraseña_usuario !== password) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const token = jwt.sign({ id: alumno.numero_usuario, rol_usuario: 'Alumno' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, usuario: alumno });
    } catch (error) {
      console.error('Error en el login: ', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };

  loginAdmin = async (req, res) => {
    const { usuario, password } = req.body;

    try {
      const admin = await getAdministradorByNombreUsuario(usuario);
      if (!admin || admin.contraseña_usuario !== password) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const token = jwt.sign({ id: admin.nombre_usuario, rol_usuario: 'Administrador' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, admin });
    } catch (error) {
      console.error('Error en el login de administrador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };
}

export default new AuthController();
