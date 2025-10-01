const express = require("express");
const router = express.Router();
const videoController = require("../controllers/video.controller");

// Rutas principales CRUD
router.get("/", videoController.listarVideos);
router.post("/", videoController.crearVideo);
router.post("/bulk", videoController.guardarVideosMasivo);

// Rutas especializadas

router.get("/buscar/enlaces", videoController.buscarVideos);
router.get("/:id", videoController.obtenerVideo);
router.put("/:id", videoController.actualizarVideo);
router.patch("/:id/inactivar", videoController.inactivarVideo);
router.delete("/:id", videoController.eliminarVideo);

module.exports = router;
