import * as CompraModel from '../models/compra.js';

class CompraController {
    constructor({ compraModel }) {
        this.compraModel = compraModel;
    }

    create = async (req, res) => {
        const { numero_alumno, id_apunte } = req.body;

        try {
            const newCompra = await this.compraModel.createCompra({ numero_alumno, id_apunte });
            res.status(201).json(newCompra);
        } catch (error) {
            console.error('Error al crear la compra:', error);
            res.status(500).json({ error: 'Error al crear la compra' });
        }
    };

    updateCalificacion = async (req, res) => {
        const { numero_alumno, id_apunte } = req.params;
        const { calificacion_apunte_comprador } = req.body;

        if (!calificacion_apunte_comprador) {
            return res.status(400).json({ error: 'Falta el campo de calificación' });
        }

        try {
            const updatedCompra = await this.compraModel.updateCompra({
                numero_alumno,
                id_apunte,
                calificacion_apunte_comprador
            });
            res.json(updatedCompra);
        } catch (error) {
            console.error('Error al actualizar la calificación:', error);
            res.status(500).json({ error: 'Error al actualizar la calificación' });
        }
    };

    getCompras = async (req, res) => {
        const { numero_alumno } = req.params;

        try {
            const compras = await this.compraModel.GetCompras(numero_alumno);
            res.json(compras);
        } catch (error) {
            console.error('Error al obtener las compras:', error);
            res.status(500).json({ error: 'Error al obtener las compras' });
        }
    };

    getCompra = async (req, res) => {
        const { numero_alumno, id_apunte } = req.params;

        try {
            const compra = await this.compraModel.GetCompra(numero_alumno, id_apunte);
            if (!compra) {
                return res.status(404).json({ error: 'Compra no encontrada' });
            }
            res.json(compra);
        } catch (error) {
            console.error('Error al obtener la compra:', error);
            res.status(500).json({ error: 'Error al obtener la compra' });
        }
    };
}

export default new CompraController({ compraModel: CompraModel });
