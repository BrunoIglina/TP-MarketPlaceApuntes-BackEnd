import * as ModificacionMateriaModel from '../models/modificacion_materia.js';

class ModificacionMateriaController {
    create = async (req, res) => {
        try {
            const newModificacion = await ModificacionMateriaModel.createModificacionMateria(req.body);
            res.status(201).json(newModificacion);
        } catch (error) {
            console.error('Error al crear la modificación de materia:', error);
            res.status(500).json({ error: 'Error al crear la modificación de materia' });
        }
    };

    getById = async (req, res) => {
        const { cod_materia, fecha_hora_mod_materia } = req.params;
        try {
            const modificacion = await ModificacionMateriaModel.getModificacionMateriaById(cod_materia, fecha_hora_mod_materia);
            if (modificacion) return res.json(modificacion);
            res.status(404).json({ message: 'Modificación de materia no encontrada' });
        } catch (error) {
            console.error('Error al obtener la modificación de materia:', error);
            res.status(500).json({ error: 'Error al obtener la modificación de materia' });
        }
    };

    getAll = async (req, res) => {
        try {
            const modificaciones = await ModificacionMateriaModel.getAllModificacionesMateria();
            res.json(modificaciones);
        } catch (error) {
            console.error('Error al obtener todas las modificaciones de materia:', error);
            res.status(500).json({ error: 'Error al obtener las modificaciones de materia' });
        }
    };
}

export default new ModificacionMateriaController();

