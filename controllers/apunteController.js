import * as ApunteModel from '../models/apunte.js'; 


class ApunteController {
    constructor({ apunteModel }) {
        this.apunteModel = apunteModel;
    }

    getAll = async (req, res) => {
        try {
            const apuntes = await this.apunteModel.getAllApuntes();
            res.json(apuntes);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los apuntes' });
        }
    };

    getByIdAlumno = async (req, res) => {
        const { id } = req.params;
        try {
            const apuntes = await this.apunteModel.getApunteByIdAlumno(id);
            if (apuntes.length > 0) return res.json(apuntes);
            res.status(404).json({ message: 'No se encontraron apuntes para este alumno' });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los apuntes del alumno' });
        }
    };

    getById = async (req, res) => {
        const { id } = req.params;
        try {
            const apunte = await this.apunteModel.getApunteById(id);
            if (apunte) return res.json(apunte);
            res.status(404).json({ message: 'Apunte no encontrado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el apunte' });
        }
    };

    getByIdMateria = async (req, res) => {
        const { id } = req.params;
        try {
            const apuntes = await this.apunteModel.getApunteByIdMateria(id);
            if (apuntes.length > 0) return res.json(apuntes);
            res.status(404).json({ message: 'La materia no tiene apuntes' });
        } catch (error) {
            res.status(500).json({ error: 'ERROR al obtener los apuntes de la materia' });
        }
    };

    create = async (req, res) => {
        try {
            const newApunte = await this.apunteModel.createApunte(req.body);
            res.status(201).json(newApunte);
        } catch (error) {
            console.error('Error al crear el apunte:', error);
            res.status(500).json({ error: 'Error al crear el apunte' });
        }
    };

    delete = async (req, res) => {
        const { id } = req.params;

        try {
            const result = await this.apunteModel.deleteApunte(id);

            if (result === false) {
                return res.status(404).json({ message: 'Apunte no encontrado' });
            }

            return res.json({ message: 'Apunte eliminado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el apunte' });
        }
    };

    update = async (req, res) => {
        const { id } = req.params;

        try {
            const updatedApunte = await this.apunteModel.updateApunte(id, req.body);
            return res.json(updatedApunte);
        } catch (error) {
            console.error('Error en la actualización:', error);
            res.status(500).json({ error: 'Error en la actualización del apunte.' });
        }
    };
}

export default new ApunteController({ apunteModel: ApunteModel });
