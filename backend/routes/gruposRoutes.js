const express = require('express');
const router = express.Router();
const gruposController = require('../controllers/grupos.controller');

router.get('/', gruposController.listarGrupos);
router.post('/', gruposController.crearGrupo);
router.get('/:id', gruposController.obtenerGrupo);
router.put('/:id', gruposController.actualizarGrupo);
router.patch('/:id/inactivar', gruposController.inactivarGrupo);
router.delete('/:id', gruposController.eliminarGrupo);
module.exports = router;