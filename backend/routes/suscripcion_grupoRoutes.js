const express = require('express');
const router = express.Router();
const suscripcionGrupoController = require('../controllers/suscripcion_grupo.controller');

// Rutas básicas CRUD
router.post('/', suscripcionGrupoController.crearSuscripcionGrupo);
router.get('/', suscripcionGrupoController.listarSuscripcionesGrupo);
router.put('/:id', suscripcionGrupoController.actualizarSuscripcionGrupo);
router.delete('/:id', suscripcionGrupoController.eliminarSuscripcionGrupo);

// Rutas específicas para Suscripcion_grupo
router.get('/grupo/:grupoId', suscripcionGrupoController.obtenerSuscripcionesPorGrupo);
router.get('/feligres/:feligresId', suscripcionGrupoController.obtenerSuscripcionesPorFeligres);

module.exports = router;