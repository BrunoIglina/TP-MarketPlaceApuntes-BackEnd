const AlumnoModel = require('../models/alumno')

class AlumnoController {
    constructor({ alumnoModel }) {
        this.alumnoModel = alumnoModel
    }

    create = async (req, res) => {
        try {
            const newAlumno = await this.alumnoModel.createAlumno(req.body)
            res.status(201).json(newAlumno)
        } catch (error) {
            console.error('Error al crear el alumno: ', error)
            res.status(500).json({ error: 'Error al crear el alumno' })
        }
    }

    delete = async (req, res) => {
        const { id } = req.params

        try {
            const result = await this.alumnoModel.deleteAlumno(id)

            if (result === false) {
                return res.status(404).json({ message: 'Alumno no encontrado' })
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el alumno '})
        }
    }

    update = async (req, res) => {
        const { id } = req.params

        try {
            const updatedAlumno = await this.alumnoModel.updateAlumno(id, req.body)
            return res.json(updatedAlumno)
        } catch (error) {
            console.error('Error en la actualización: ', error)
            res.status(500).json({ error: 'Error en la actualzación del apunte. '})
        }
    }
}

module.exports = new AlumnoController({ alumnoModel: AlumnoModel})