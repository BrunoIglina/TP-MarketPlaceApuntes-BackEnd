const express = require('express');
const router = express.Router();
const PrecioController = require('../controllers/precioController');

router.post('/', PrecioController.create);
router.get('/:id', PrecioController.getUltPrecio);
router.put('/:id', PrecioController.update);

module.exports = router;