const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { authenticateJWT, authorizeRoles } = require('../middlewares/auth.middlewares');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para gestión de usuarios
 */

/**
 * @swagger
 * /api/usuario:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_feligres: 
 *                 type: number
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
router.post('/crear-usuario', usuarioController.crearUsuario);

/**
 * @swagger
 * /api/usuario:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', authenticateJWT, authorizeRoles('admin'), usuarioController.listarUsuarios);

/**
 * @swagger
 * /api/usuario/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del usuario
 */
router.get('/:id', authenticateJWT, authorizeRoles('admin', 'user'), usuarioController.obtenerUsuario);

/**
 * @swagger
 * /api/usuario/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put('/:id', authenticateJWT, authorizeRoles('admin'), usuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuario/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete('/:id', authenticateJWT, authorizeRoles('admin'), usuarioController.eliminarUsuario);

module.exports = router;
