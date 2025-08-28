const express = require('express');
const router = express.Router();
const hojaDominicalController = require('../controllers/hoja_dominical.controller');

router.get('/', hojaDominicalController.listarHojasDominicales);
router.post('/', hojaDominicalController.crearHojaDominical);
router.get('/', hojaDominicalController.listarHojasDominicales);
router.get('/:id', hojaDominicalController.obtenerHojaDominical);
router.put('/:id', hojaDominicalController.actualizarHojaDominical);
router.patch('/:id/inactivar', hojaDominicalController.inactivarHojaDominical);
router.delete('/:id', hojaDominicalController.eliminarHojaDominical);

// Rutas Especializadas
router.get('/ultima', hojaDominicalController.obtenerUltimaHoja);
router.get('/por-fecha', hojaDominicalController.obtenerHojasPorFecha);

module.exports = router;