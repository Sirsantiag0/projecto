const express = require('express');
const router = express.Router();
const hojaDominicalController = require('../controllers/hoja_dominical.controller');

router.get('/', hojaDominicalController.listarHojasDominicales);
router.post('/', hojaDominicalController.subirArchivo, hojaDominicalController.crearHojaDominical);


// Rutas Especializadas
router.get('/ultima', hojaDominicalController.obtenerUltimaHoja);
router.get('/fecha/:fecha', hojaDominicalController.obtenerHojaPorFecha);
router.get('/por-fecha', hojaDominicalController.obtenerHojasPorFecha);

router.get('/:id', hojaDominicalController.obtenerHojaDominical);
router.put('/:id', hojaDominicalController.subirArchivo, hojaDominicalController.actualizarHojaDominical);
router.patch('/:id/inactivar', hojaDominicalController.inactivarHojaDominical);
router.delete('/:id', hojaDominicalController.eliminarHojaDominical);

module.exports = router;