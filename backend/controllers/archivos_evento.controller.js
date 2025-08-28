const db = require('../models');
const Archivos_evento = db.Archivos_evento;
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', 'eventos');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + '-' + file.originalname;
    cb(null, nombreUnico);
  }
});

// Middleware de subida
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

exports.subirArchivo = upload.single('archivo');

// Controladores
exports.crearArchivoEvento = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Debes subir un archivo' 
      });
    }

    const nuevoArchivo = await Archivos_evento.create({
      nombre_original: req.file.originalname,
      nombre_archivo: req.file.filename,
      ruta: path.join('eventos', req.file.filename),
      tipo_archivo: req.file.mimetype,
      tamaño: req.file.size,
      id_evento: req.body.id_evento,
      descripcion: req.body.descripcion || null
    });

    res.status(201).json({ success: true, data: nuevoArchivo });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, error: error.message });
  }
};
// Método para descargar archivo físico
exports.descargarArchivo = async (req, res) => {
  try {
    const { id } = req.params;
    const archivo = await Archivos_evento.findByPk(id);
    
    if (!archivo) {
      return res.status(404).json({ success: false, message: 'Archivo no encontrado' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', archivo.ruta);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'El archivo físico no existe' });
    }

    res.download(filePath, archivo.nombre_original);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Listar todos los archivos de evento
exports.listarArchivosEvento = async (req, res) => {
    try {
        const archivos = await Archivos_evento.findAll();
        res.status(200).json({ success: true, data: archivos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener un archivo específico
exports.obtenerArchivoEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const archivo = await Archivos_evento.findByPk(id);
        if (archivo) {
            return res.status(200).json({ success: true, data: archivo });
        }
        return res.status(404).json({ success: false, message: 'Archivo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar archivo de evento
exports.actualizarArchivoEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Archivos_evento.update(req.body, { where: { id } });
        if (updated) {
            const archivoActualizado = await Archivos_evento.findByPk(id);
            return res.status(200).json({ success: true, data: archivoActualizado });
        }
        return res.status(404).json({ success: false, message: 'Archivo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inactivar archivo de evento (borrado lógico)
exports.inactivarArchivoEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Archivos_evento.update(
            { activo: false },
            { where: { id } }
        );
        if (updated) {
            return res.status(200).json({ success: true, message: 'Archivo inactivado' });
        }
        return res.status(404).json({ success: false, message: 'Archivo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }   
};

// Eliminar archivo de evento (borrado físico)
exports.eliminarArchivoEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Archivos_evento.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Archivo eliminado permanentemente' });
        }
        return res.status(404).json({ success: false, message: 'Archivo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener archivos por evento específico
exports.obtenerArchivosPorEvento = async (req, res) => {
    try {
        const { eventoId } = req.params;
        const archivos = await Archivos_evento.findAll({ 
            where: { id_evento: eventoId } 
        });
        res.status(200).json({ success: true, data: archivos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
    

