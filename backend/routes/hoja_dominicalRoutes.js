const express = require('express');
const router = express.Router();
const hojaDominicalController = require('../controllers/hoja_dominical.controller');

router.get('/', hojaDominicalController.listarHojasDominicales);
router.post('/', hojaDominicalController.subirArchivo, hojaDominicalController.crearHojaDominical);


// Rutas Especializadas
router.get('/ultima', hojaDominicalController.obtenerUltimaHoja);
router.get('/por-fecha', hojaDominicalController.obtenerHojasPorFecha);

module.exports = router;