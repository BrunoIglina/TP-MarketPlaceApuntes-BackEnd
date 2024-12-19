import * as MateriaModel from '../models/materia.js';
import { createModificacionMateria } from '../models/modificacion_materia.js'; 

class MateriaController {
    create = async (req, res) => {
    try {
        const newMateria = await MateriaModel.createMateria(req.body);
        res.status(201).json(newMateria);
    } catch (error) {
        console.error('Error al crear la materia:', error);
        res.status(500).json({ error: 'Error al crear la materia' });
    }
    };

    getById = async (req, res) => {
    const { id } = req.params;
    try {
        const materia = await MateriaModel.getMateriaById(id);
        if (materia) return res.json(materia);
        res.status(404).json({ message: 'Materia no encontrada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la materia' });
    }
    };

    getAll = async (req, res) => {
    try {
        const materias = await MateriaModel.getAllMaterias();
        res.json(materias);
    } catch (error) {
        console.error('Error al obtener todas las materias:', error);
        res.status(500).json({ error: 'Error al obtener las materias' });
    }
    };

    update = async (req, res) => {
        const { id } = req.params;
        try {
            
            const updatedMateria = await MateriaModel.updateMateria(id, req.body);
            
            
            const { nombre_materia, nivel_carrera } = req.body; 
            await createModificacionMateria({
                cod_materia: id,
                desc_mod_materia: `Actualización de materia: ${nombre_materia ? nombre_materia : 'N/A'} - Nivel: ${nivel_carrera ? nivel_carrera : 'N/A'}`,
            });

            
            res.json(updatedMateria);
        } catch (error) {
            console.error('Error al actualizar la materia:', error);
            res.status(500).json({ error: 'Error al actualizar la materia' });
        }
    };

    delete = async (req, res) => {
    const { id } = req.params;
    try {
        await MateriaModel.deleteMateria(id);
        res.json({ message: 'Materia eliminada' });
    } catch (error) {
        console.error('Error al eliminar la materia:', error);
        res.status(500).json({ error: 'Error al eliminar la materia' });
    }
    };

    getAllMateriaBaja = async (req, res) => {
        try {
            const materias = await MateriaModel.getAllMateriasBajas();
            res.json(materias);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las materias' });
        }
    };
}

export default new MateriaController();

