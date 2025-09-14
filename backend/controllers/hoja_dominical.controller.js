const db = require('../models');
const Hoja_dominical = db.Hoja_dominical;
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Carpeta de almacenamiento de hojas dominicales
const hojasDir = path.join(__dirname, '..', 'uploads', 'hojas_dominical');
if (!fs.existsSync(hojasDir)) {
    fs.mkdirSync(hojasDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, hojasDir),
    filename: (_req, file, cb) => {
        const nombreUnico = Date.now() + '-' + file.originalname;
        cb(null, nombreUnico);
    }
});

const upload = multer({ storage });
exports.subirArchivo = upload.single('ruta_archivos');

// Crear hoja dominical
exports.crearHojaDominical = async (req, res) => {
    try {
                const { fecha, titulo } = req.body;
        const nuevaHoja = await Hoja_dominical.create({
            fecha,
            titulo,
            ruta_archivos: req.file ? req.file.filename : null
        });
        res.status(201).json({ success: true, data: nuevaHoja });
    } catch (error) {
                if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

// Listar hojas dominicales
exports.listarHojasDominicales = async (req, res) => {
    try {
        const hojas = await Hoja_dominical.findAll({
            order: [['fecha', 'DESC']]
        });
        res.status(200).json({ success: true, data: hojas });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener hoja dominical específica
exports.obtenerHojaDominical = async (req, res) => {
    try {
        const { id } = req.params;
        const hoja = await Hoja_dominical.findByPk(id);
        if (hoja) {
            return res.status(200).json({ success: true, data: hoja });
        }
        return res.status(404).json({ success: false, message: 'Hoja dominical no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar hoja dominical
exports.actualizarHojaDominical = async (req, res) => {
    try {
        const { id } = req.params;
        const hoja = await Hoja_dominical.findByPk(id);
        if (!hoja) {
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
            return res.status(404).json({ success: false, message: 'Hoja dominical no encontrada' });
        }
        
        if (req.file) {
            const rutaAntigua = path.join(hojasDir, hoja.ruta_archivos);
            if (fs.existsSync(rutaAntigua)) {
                fs.unlinkSync(rutaAntigua);
            }
            hoja.ruta_archivos = req.file.filename;
        }

        hoja.fecha = req.body.fecha || hoja.fecha;
        hoja.titulo = req.body.titulo || hoja.titulo;
        await hoja.save();
        return res.status(200).json({ success: true, data: hoja });
    } catch (error) {
                if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inactivar hoja dominical
exports.inactivarHojaDominical = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Hoja_dominical.update(
            { estado: false },
            { where: { id } }
        );
        if (updated) {
            return res.status(200).json({ success: true, message: 'Hoja dominical inactivada' });
        }
        return res.status(404).json({ success: false, message: 'Hoja dominical no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar hoja dominical
exports.eliminarHojaDominical = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Hoja_dominical.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Hoja dominical eliminada' });
        }
        return res.status(404).json({ success: false, message: 'Hoja dominical no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

 // Obtener hoja dominical por fecha exacta
exports.obtenerHojaPorFecha = async (req, res) => {
    try {
        const { fecha } = req.params;
        const hoja = await Hoja_dominical.findOne({
            where: db.Sequelize.where(db.Sequelize.fn('DATE', db.Sequelize.col('fecha')), fecha)
        });
        if (hoja) {
            return res.status(200).json({ success: true, data: hoja });
        }
        return res.status(404).json({ success: false, message: 'Hoja dominical no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener hojas por rango de fechas
exports.obtenerHojasPorFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        const hojas = await Hoja_dominical.findAll({
            where: {
                fecha: {
                    [db.Sequelize.Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
                }
            },
            order: [['fecha', 'DESC']]
        });
        res.status(200).json({ success: true, data: hojas });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener última hoja dominical publicada
exports.obtenerUltimaHoja = async (req, res) => {
    try {
        const hoja = await Hoja_dominical.findOne({
            where: { estado: true },
            order: [['fecha', 'DESC']],
            limit: 1
        });
        if (hoja) {
            return res.status(200).json({ success: true, data: hoja });
        }
        return res.status(404).json({ success: false, message: 'No se encontraron hojas dominicales activas' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};