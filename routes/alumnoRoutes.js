const express = require('express')
const router = express.Router()
const AlumnoController = require('../controllers/alumnoController')

router.post('/', AlumnoController.create)
router.put('/:id', AlumnoController.update)
router.delete('/:id', AlumnoController.delete)

module.exports = router