const express = require('express');
const router = express.Router();
const ApunteController = require('../controllers/apunteController'); 

router.post('/', ApunteController.create);    
router.get('/', ApunteController.getAll);    
router.get('/:id', ApunteController.getById); 
router.put('/:id', ApunteController.update); 
router.delete('/:id', ApunteController.delete);
router.get('/materias/:id', ApunteController.getByIdMateria); 
router.get('/alumnos/:id', ApunteController.getByIdAlumno);


module.exports = router;
