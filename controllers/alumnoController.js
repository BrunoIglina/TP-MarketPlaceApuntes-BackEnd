import { createAlumno, getAlumnoById, updateAlumno, getAlumnoByLegajo, getAlumnoByEmail, getAlumnoByNombreUsuario } from '../models/alumno.js';

class AlumnoController {
    constructor({ alumnoModel }) {
        this.alumnoModel = alumnoModel;
    }

    create = async (req, res) => {
        const { legajo_usuario, nombre_usuario, nombre_apellido_alumno, email_usuario, telefono_usuario, contraseña_usuario, CVU_MP } = req.body;
    
        try {
            const existingLegajo = await getAlumnoByLegajo(legajo_usuario);
            if (existingLegajo) {
                return res.status(400).json({ message: 'El legajo ya está registrado.' });
            }
    
            const existingNombreUsuario = await getAlumnoByNombreUsuario(nombre_usuario);
            if (existingNombreUsuario) {
                return res.status(400).json({ message: 'El nombre de usuario ya está registrado.' });
            }
    
            const existingEmail = await getAlumnoByEmail(email_usuario);
            if (existingEmail) {
                return res.status(400).json({ message: 'El correo ya está registrado.' });
            }
    
            const newAlumno = await createAlumno({
                legajo_usuario,
                nombre_usuario,
                nombre_apellido_alumno,
                email_usuario,
                telefono_usuario,
                contraseña_usuario,
                CVU_MP: CVU_MP,
                rol_usuario: 'Alumno',
            });
    
            res.status(201).json(newAlumno);
        } catch (error) {
            console.error('Error al crear el alumno: ', error);
            res.status(500).json({ error: 'Error al crear el alumno' });
        }
    };
    
    

    update = async (req, res) => {
        const { id } = req.params;

        try {
            const updatedAlumno = await updateAlumno(id, req.body);
            res.json(updatedAlumno);
        } catch (error) {
            console.error('Error en la actualización: ', error);
            res.status(500).json({ error: 'Error en la actualización del alumno.' });
        }
    };

    update = async (req, res) => {
        const { id } = req.params;

        try {
            const updatedAlumno = await updateAlumno(id, req.body);
            res.json(updatedAlumno);
        } catch (error) {
            console.error('Error en la actualización: ', error);
            res.status(500).json({ error: 'Error en la actualización del alumno.' });
        }
    };

    get = async (req, res) => {
        const { id } = req.params;

        try {
            const alumno = await getAlumnoById(id);
            if (!alumno) {
                return res.status(404).json({ error: 'Alumno no encontrado' });
            }
            res.status(200).json(alumno);
        } catch (error) {
            console.error('Error al obtener el alumno: ', error);
            res.status(500).json({ error: 'Error al obtener el alumno' });
        }
    };

    
}

export default new AlumnoController({ alumnoModel: { createAlumno, getAlumnoById, updateAlumno } });