const express = require('express');
const router = express.Router();
const asistenciaEventoController = require('../controllers/asistencia_evento.controller'); // Ajusta la ruta según tu estructura

// Rutas CRUD básicas
router.get('/', asistenciaEventoController.listarAsistenciasEvento);
router.post('/', asistenciaEventoController.crearAsistenciaEvento);
router.get('/', asistenciaEventoController.listarAsistenciasEvento);
router.get('/:id', asistenciaEventoController.obtenerAsistenciaEvento);
router.put('/:id', asistenciaEventoController.actualizarAsistenciaEvento);
router.patch('/:id/inactivar', asistenciaEventoController.inactivarAsistenciaEvento);
router.delete('/:id', asistenciaEventoController.eliminarAsistenciaEvento);

// Rutas personalizadas
router.get('/eventos/:eventoId/asistencias', asistenciaEventoController.obtenerAsistenciasPorEvento);
router.get('/feligreses/:feligresId/asistencias', asistenciaEventoController.obtenerAsistenciasPorFeligres);

module.exports = router;