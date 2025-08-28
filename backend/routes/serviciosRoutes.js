const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/servicios.controller');

// ======================================
// RUTAS PARA GESTIÓN DE SERVICIOS
// ======================================

// CRUD Básico
router.get('/', serviciosController.listarServicios);
router.post('/', serviciosController.crearServicio);
router.get('/', serviciosController.listarServicios);
router.get('/:id', serviciosController.obtenerServicio);
router.put('/:id', serviciosController.actualizarServicio);
router.patch('/:id/inactivar', serviciosController.inactivarServicio);
router.delete('/:id', serviciosController.eliminarServicio);

module.exports = router;    