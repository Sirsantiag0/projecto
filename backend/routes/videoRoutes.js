const express = require("express");
const router = express.Router();
const videoController = require("../controllers/video.controller");

// Rutas principales CRUD
router.get("/", videoController.listarVideos);
router.post("/", videoController.crearVideo);
router.get("/:id", videoController.obtenerVideo);
router.put("/:id", videoController.actualizarVideo);
router.delete("/:id", videoController.eliminarVideo);

// Rutas especializadas
router.patch("/:id/inactivar", videoController.inactivarVideo);
router.get("/buscar/enlaces", videoController.buscarVideos);

module.exports = router;
