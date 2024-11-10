import jwt from 'jsonwebtoken';
import { getAlumnoByLegajo } from '../models/alumno.js';

class AuthController {
  login = async (req, res) => {
    const { legajo, password } = req.body;

    try {
      const alumno = await getAlumnoByLegajo(legajo);
      if (!alumno || alumno.contraseña_usuario !== password) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const token = jwt.sign({ id: alumno.numero_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, usuario: alumno });
    } catch (error) {
      console.error('Error en el login: ', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };
}

export default new AuthController();
