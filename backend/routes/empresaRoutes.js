const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresa.controller'); // Asegúrate de que la ruta sea correcta

// Rutas para empresas
router.post('/empresas', empresaController.crearEmpresa);
router.get('/', empresaController.listarEmpresas);
router.get('/empresas/:id', empresaController.obtenerEmpresa);
// aqui las que tenia...


module.exports = router;

// ya lista para consumir en el frontend...