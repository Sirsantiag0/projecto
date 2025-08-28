const db = require('../models');
const Empresa = db.Empresa;

// Crear empresa
exports.crearEmpresa = async (req, res) => {    
    try {
        const nuevaEmpresa = await Empresa.create(req.body);
        res.status(201).json({ success: true, data: nuevaEmpresa });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Listar empresas
exports.listarEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.findAll();
        res.status(200).json({ success: true, data: empresas });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Obtener una empresa específica
exports.obtenerEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const empresa = await Empresa.findByPk(id);
        if (empresa) {
            return res.status(200).json({ success: true, data: empresa });
        }
        return res.status(404).json({ success: false, message: 'Empresa no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar empresa
exports.actualizarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Empresa.update(req.body, { where: { id } });
        if (updated) {
            const empresaActualizada = await Empresa.findByPk(id);
            return res.status(200).json({ success: true, data: empresaActualizada });
        }
        return res.status(404).json({ success: false, message: 'Empresa no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Inactivar empresa
exports.inactivarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Empresa.update(
            { activo: false },
            { where: { id } }
        );
        if (updated) {
            return res.status(200).json({ success: true, message: 'Empresa inactivada' });
        }
        return res.status(404).json({ success: false, message: 'Empresa no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Eliminar empresa
exports.eliminarEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Empresa.destroy({ where: { id } });
        if (deleted) {
            return res.status(200).json({ success: true, message: 'Empresa eliminada' });
        }
        return res.status(404).json({ success: false, message: 'Empresa no encontrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Buscar empresas por nombre
exports.buscarEmpresasPorNombre = async (req, res) => {
    try {
        const { nombre } = req.query;
        const empresas = await Empresa.findAll({
            where: {
                nombre: {
                    [db.Sequelize.Op.like]: `%${nombre}%`
                }
            }
        });
        res.status(200).json({ success: true, data: empresas });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};