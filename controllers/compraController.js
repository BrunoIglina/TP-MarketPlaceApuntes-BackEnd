const CompraModel = require('../models/compra');

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
}    

module.exports = new CompraController({ compraModel: CompraModel });
