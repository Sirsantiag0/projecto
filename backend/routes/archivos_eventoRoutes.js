const express = require('express');
const router = express.Router();
const archivosEventoController = require('../controllers/archivos_evento.controller');

// Ruta para subir archivos
router.post('/', 
  archivosEventoController.subirArchivo, // Middleware de Multer
  archivosEventoController.crearArchivoEvento // Controlador
);

// Listar archivos activos
router.get('/', archivosEventoController.listarArchivosEvento);

module.exports = router;