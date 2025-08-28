const express = require('express');
const router = express.Router();
const archivosEventoController = require('../controllers/archivos_evento.controller');

// Ruta para subir archivos
router.post('/', 
  archivosEventoController.subirArchivo, // Middleware de Multer
  archivosEventoController.crearArchivoEvento // Controlador
);

// Rutas para archivos de evento
router.get('/', archivosEventoController.listarArchivosEvento);
router.get('/:id', archivosEventoController.obtenerArchivoEvento);
router.get('/evento/:eventoId', archivosEventoController.obtenerArchivosPorEvento);
router.put('/:id', archivosEventoController.actualizarArchivoEvento);
router.patch('/:id/inactivar', archivosEventoController.inactivarArchivoEvento);
router.delete('/:id', archivosEventoController.eliminarArchivoEvento);

module.exports = router;