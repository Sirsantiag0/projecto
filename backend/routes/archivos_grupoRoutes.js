const express = require('express');
const router = express.Router();
const archivosGrupoController = require('../controllers/archivos_grupo.controller');

// Ruta para subir archivos
router.post('/', 
  archivosGrupoController.subirArchivo, // Middleware de subida
  archivosGrupoController.crearArchivoGrupo // Controlador
);

// Ruta para descargar archivos
router.get('/:id/download', archivosGrupoController.descargarArchivo);

// Rutas CRUD estándar
router.get('/', archivosGrupoController.listarArchivosGrupo);
router.get('/:id', archivosGrupoController.obtenerArchivoGrupo);
router.put('/:id', archivosGrupoController.actualizarArchivoGrupo);
router.patch('/:id/inactivar', archivosGrupoController.inactivarArchivoGrupo);
router.delete('/:id', archivosGrupoController.eliminarArchivoGrupo);

// Ruta para obtener archivos por grupo
router.get('/grupo/:grupoId', archivosGrupoController.obtenerArchivosPorGrupo);

module.exports = router;