// routes/requisitos.routes.js
const express = require('express');
const router = express.Router();
const requisitosController = require('../controllers/requisitos.controller');

// ======================================
// RUTAS PARA GESTIÓN DE REQUISITOS
// ======================================

router.get('/', requisitosController.listarRequisitos);
router.post('/', requisitosController.crearRequisito);
router.get('/:id', requisitosController.obtenerRequisito);
router.put('/:id', requisitosController.actualizarRequisito);
router.patch('/:id/inactivar', requisitosController.inactivarRequisito);
router.delete('/:id', requisitosController.eliminarRequisito);

module.exports = router;
