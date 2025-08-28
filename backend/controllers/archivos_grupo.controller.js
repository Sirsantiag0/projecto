const db = require('../models');
const Archivos_grupo = db.Archivos_grupo;
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configuración de Multer para guardar en uploads/grupos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', 'uploads', 'grupos');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + '-' + file.originalname;
    cb(null, nombreUnico);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Middleware de subida
exports.subirArchivo = upload.single('archivo');

// Crear archivo de grupo (con archivo físico)
exports.crearArchivoGrupo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Debes subir un archivo' 
      });
    }

    const nuevoArchivo = await Archivos_grupo.create({
      nombre_original: req.file.originalname,
      nombre_archivo: req.file.filename,
      ruta: path.join('grupos', req.file.filename),
      tipo_archivo: req.file.mimetype,
      tamaño: req.file.size,
      id_grupo: req.body.id_grupo,
      descripcion: req.body.descripcion || null
    });

    res.status(201).json({ success: true, data: nuevoArchivo });
  } catch (error) {
    // Eliminar archivo subido si hay error
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
    const archivo = await Archivos_grupo.findByPk(id);
    
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

// Listar archivos de grupo
exports.listarArchivosGrupo = async (req, res) => {
    try {
        const archivos = await Archivos_grupo.findAll();
        res.status(200).json({ success: true, data: archivos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener un archivo específico
exports.obtenerArchivoGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const archivo = await Archivos_grupo.findByPk(id);
        if (archivo) {
            return res.status(200).json({ success: true, data: archivo });
        }
        return res.status(404).json({ success: false, message: 'Archivo de grupo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar archivo de grupo
exports.actualizarArchivoGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Archivos_grupo.update(req.body, { where: { id } });
        if (updated) {
            const archivoActualizado = await Archivos_grupo.findByPk(id);
            return res.status(200).json({ success: true, data: archivoActualizado });
        }
        return res.status(404).json({ success: false, message: 'Archivo de grupo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inactivar archivo de grupo
exports.inactivarArchivoGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Archivos_grupo.update(
            { activo: false },
            { where: { id } }
        );
        if (updated) {
            return res.status(200).json({ success: true, message: 'Archivo de grupo inactivado' });
        }
        return res.status(404).json({ success: false, message: 'Archivo de grupo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar archivo de grupo
exports.eliminarArchivoGrupo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Archivos_grupo.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Archivo de grupo eliminado' });
        }
        return res.status(404).json({ success: false, message: 'Archivo de grupo no encontrado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener archivos por grupo específico
exports.obtenerArchivosPorGrupo = async (req, res) => {
    try {
        const { grupoId } = req.params;
        const archivos = await Archivos_grupo.findAll({ 
            where: { id_grupo: grupoId } 
        });
        res.status(200).json({ success: true, data: archivos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};