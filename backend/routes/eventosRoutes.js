const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventos.controller');

router.get('/', eventosController.listarEventos);
router.post('/', eventosController.crearEvento);
router.get('/:id', eventosController.obtenerEvento);
router.put('/:id', eventosController.actualizarEvento);
router.patch('/:id/inactivar', eventosController.inactivarEvento);
router.delete('/:id', eventosController.eliminarEvento);

module.exports = router;