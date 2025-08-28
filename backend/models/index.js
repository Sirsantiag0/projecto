const Sequelize = require('sequelize');
const config = require('../database/database'); 

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
)
// import models
const Archivos_evento = require('./archivos_evento')(sequelize, Sequelize.DataTypes);
const Archivos_grupo = require('./archivos_grupo')(sequelize, Sequelize.DataTypes);
const Roles = require('./roles')(sequelize, Sequelize.DataTypes);
const Usuario = require('./usuario')(sequelize, Sequelize.DataTypes);
const Asistencia_evento = require('./asistencia_evento')(sequelize, Sequelize.DataTypes);
const Cursos = require('./cursos')(sequelize, Sequelize.DataTypes);
const Empresa = require('./empresa')(sequelize, Sequelize.DataTypes);
const Estado_servicio = require('./estado_servicio')(sequelize, Sequelize.DataTypes);
const Eventos = require('./eventos')(sequelize, Sequelize.DataTypes);
const Feligres = require('./feligres')(sequelize, Sequelize.DataTypes);
const Grupos = require('./grupos')(sequelize, Sequelize.DataTypes);
const Hoja_dominical = require('./hoja_dominical')(sequelize, Sequelize.DataTypes);
const Qr_evento = require('./qr_evento')(sequelize, Sequelize.DataTypes);
const Servicios = require('./servicios')(sequelize, Sequelize.DataTypes);
const Suscripcion_curso = require('./suscripcion_curso')(sequelize, Sequelize.DataTypes);
const Suscripcion_grupo = require('./suscripcion_grupo')(sequelize, Sequelize.DataTypes);
const Tipo = require('./tipo')(sequelize, Sequelize.DataTypes);

// Definir relaciones
// Empresa 
Empresa.hasMany(Servicios, {foreignKey: 'id_empresa'});
Servicios.belongsTo(Empresa, { foreignKey: 'id_empresa' });
// hoja dominical

Empresa.hasMany(Hoja_dominical, {foreignKey: 'id_hoja_dominical'});

// Usuario ---------
Usuario.belongsTo(Feligres, {foreignKey: 'id_feligres'});
Feligres.hasOne(Usuario, { foreignKey: 'id_feligres' });

//roles -------
Usuario.belongsTo(Roles, { foreignKey: 'id_rol'});
Roles.hasMany(Usuario, { foreignKey: 'id_rol', as: 'usuario' });


// Estado_servicio
Estado_servicio.hasMany(Servicios, {foreignKey: 'id_estado_servicio'});
Servicios.belongsTo(Estado_servicio, {foreignKey: 'id_estado_servicio'});

// Suscripcion_curso 
Suscripcion_curso.belongsTo(Feligres, {foreignKey: 'id_feligres'});
Suscripcion_curso.belongsTo(Cursos, {foreignKey: 'id_curso'});
Suscripcion_curso.belongsTo(Servicios, {foreignKey: 'id_servicio'});

Cursos.hasMany(Suscripcion_curso, {foreignKey: 'id_curso'});
Feligres.hasMany(Suscripcion_curso, {foreignKey: 'id_feligres'});

// Tipo
Tipo.hasMany(Servicios, {foreignKey: 'id_tipo'});
Servicios.belongsTo(Tipo, {foreignKey: 'id_tipo'});

// Suscripcion_grupo
Suscripcion_grupo.belongsTo(Feligres, {foreignKey: 'id_feligres'})
Suscripcion_grupo.belongsTo(Grupos, {foreignKey: 'id_grupo'})

// Archivos_evento 
Archivos_evento.belongsTo(Eventos, {foreignKey: 'id_evento'})
Eventos.hasMany(Archivos_evento, {foreignKey: 'id_evento'})

// Archivos_grupo
Archivos_grupo.belongsTo(Grupos, {foreignKey: 'id_grupo'})
Grupos.hasMany(Archivos_grupo, {foreignKey: 'id_grupo'})



// Asistencia_evento
Asistencia_evento.belongsTo(Feligres, {foreignKey: 'id_feligres'})
Asistencia_evento.belongsTo(Eventos, {foreignKey: 'id_evento'})

Feligres.hasMany(Asistencia_evento, {foreignKey: 'id_feligres'})
Eventos.hasOne(Asistencia_evento, {foreignKey: 'id_evento'})


// Cursos
Cursos.belongsTo(Servicios, {foreignKey: 'id_servicio'})
Servicios.hasOne(Cursos, {foreignKey: 'id_servicio'}) 

// Servicios
Servicios.belongsTo(Tipo, { foreignKey: 'id_tipo' });
Tipo.hasMany(Servicios, { foreignKey: 'id_tipo' });

//feligres
// eventos

// Qr_evento
Qr_evento.belongsTo(Eventos, { foreignKey: 'id_evento', as: 'evento'});
Eventos.hasOne(Qr_evento, {foreignKey: 'id_evento', as: 'qr_evento' });

// Un grupo coral puede participar en múltiples servicios
//Un servicio puede contar con varios grupos
// Uno a Uno: belongsTo y hasOne
// Uno a Muchos: hasMany y belongsTo
// Muchos a Muchos: belongsToMany
// Exportar modelos y sequelize
module.exports = {
    sequelize,
    Sequelize,
    Archivos_evento,
    Archivos_grupo,
    Asistencia_evento,
    Cursos,
    Empresa,
    Estado_servicio,
    Eventos,
    Feligres,
    Grupos,
    Hoja_dominical,
    Qr_evento,
    Servicios,
    Suscripcion_curso,
    Suscripcion_grupo,
    Tipo,
    Roles,
    Usuario
};
