const express = require('express');
const router = express.Router();
const feligresController = require('../controllers/feligres.controller');

router.post('/', feligresController.crearFeligres);
router.get('/', feligresController.listarFeligreses);
router.put('/:id', feligresController.actualizarFeligres);
router.delete('/:id', feligresController.eliminarFeligres);

module.exports = router;