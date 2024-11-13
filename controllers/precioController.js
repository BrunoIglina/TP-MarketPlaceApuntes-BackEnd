import * as PrecioModel from '../models/precio.js';

class PrecioController {
    constructor({ precioModel }) {
        this.precioModel = precioModel;
    }

    create = async (req, res) => {
        try {
            const newPrecio = await this.precioModel.createPrecio(req.body);
            res.status(201).json(newPrecio);
        } catch (error) {
            console.error('Error al crear el precio: ', error);
            res.status(500).json({ error: 'Error al crear el precio' });
        }
    };

    getUltPrecio = async (req, res) => {
        const { id } = req.params;
        try {
            const precio = await this.precioModel.getPrecioApunte(id);
            if (precio) return res.json(precio);
            res.status(404).json({ message: 'Precio no encontrado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener precio' });
        }
    };

    update = async (req, res) => {
        const { id } = req.params;

        try {
            const updatedPrecio = await this.precioModel.updatePrecio(id, req.body); // Se agregó req.body para actualizar
            return res.json(updatedPrecio);
        } catch (error) {
            console.error('Error en la actualización del precio:', error);
            res.status(500).json({ error: 'Error en la actualización del precio.' });
        }
    };
}

export default new PrecioController({ precioModel: PrecioModel });
