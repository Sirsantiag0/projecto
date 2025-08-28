const express = require('express');
const router = express.Router();

const cursosController = require('../controllers/cursos.controller');


router.route('/')
  .get(cursosController.listarCursos)      // GET /cursos
  .post(cursosController.crearCurso);     // POST /cursos

// Ruta para obtener un curso específico por ID
router.get('/:id', cursosController.obtenerCurso);

// Ruta para actualizar un curso existente
router.put('/:id', cursosController.actualizarCurso);

// Ruta para inactivar un curso (observación: corregí el nombre del método del controlador)
router.patch('/:id/inactivar', cursosController.inactivarServicio);

// Ruta para eliminar un curso
router.delete('/:id', cursosController.eliminarCurso);

module.exports = router;