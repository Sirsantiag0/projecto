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

// Reemplazar archivo existente
router.put('/:id',
  archivosEventoController.subirArchivo,
  archivosEventoController.reemplazarArchivoEvento
);

// Eliminar archivo
router.delete('/:id', archivosEventoController.eliminarArchivoEvento);


module.exports = router;