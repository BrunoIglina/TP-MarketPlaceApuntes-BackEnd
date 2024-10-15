const express = require('express');
const router = express.Router();
const CompraController = require('../controllers/compraController.js');

router.post('/', CompraController.create);
router.patch('/:numero_alumno/:id_apunte', CompraController.updateCalificacion);

module.exports = router;