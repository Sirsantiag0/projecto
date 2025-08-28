const express = require('express');
const router = express.Router();
const suscripcionCursoController = require('../controllers/suscripcion_curso.controller');

router.get('/', suscripcionCursoController.listarSuscripcionesCurso)
router.post('/', suscripcionCursoController.crearSuscripcionCurso);
router.get('/', suscripcionCursoController.listarSuscripcionesCurso);
router.put('/:id', suscripcionCursoController.actualizarSuscripcionCurso);
router.delete('/:id', suscripcionCursoController.eliminarSuscripcionCurso);

// Rutas Especializadas
router.get('/cursos/:cursoId/suscripciones', suscripcionCursoController.obtenerSuscripcionesPorCurso
)
router.get('/usuarios/:usuarioId/suscripciones', suscripcionCursoController.obtenerSuscripcionesPorUsuario
);
router.get('/suscripciones/verificar/:usuarioId/:cursoId', suscripcionCursoController.verificarSuscripcion
);
module.exports = router;