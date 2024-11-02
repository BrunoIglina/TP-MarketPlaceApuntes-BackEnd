import { createAlumno, getAlumnoById, updateAlumno } from '../models/alumno.js';

class AlumnoController {
    constructor({ alumnoModel }) {
        this.alumnoModel = alumnoModel;
    }

    create = async (req, res) => {
        try {
            const newAlumno = await createAlumno(req.body);
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
            res.status(500).json({ error: 'Error en la actualización del apunte.' });
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