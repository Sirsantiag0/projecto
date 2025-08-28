const express = require('express');
const router = express.Router();
const qrEventoController = require('../controllers/qr_evento.controller');

// CRUD Básico
router.get('/', qrEventoController.listarQrEventos);
router.post('/', qrEventoController.crearQrEvento);
router.get('/:id', qrEventoController.obtenerQrEvento);
router.put('/:id', qrEventoController.actualizarQrEvento);
router.patch('/:id/inactivar', qrEventoController.inactivarQrEvento);
router.delete('/:id', qrEventoController.eliminarQrEvento);

// Rutas Especializadas
router.get('/:eventoId/qr', qrEventoController.obtenerQrPorEvento);
module.exports = router;