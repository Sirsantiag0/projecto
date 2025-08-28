// migrate.js
const { sequelize } = require('./models/index'); // Importamos desde models/index.js

async function runMigrations() {
  try {
    // Verificar conexión
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // Opciones de sincronización
    const syncOptions = {
      alter: true,       // Modo seguro (actualiza tablas sin borrar datos)
      // force: true,    // ¡PELIGROSO! Elimina y recrea todas las tablas (solo desarrollo)
      logging: console.log // Muestra las consultas SQL
    };

    // Ejecutar sincronización
    await sequelize.sync(syncOptions);
    
    console.log('🔄 Migraciones completadas exitosamente');
    console.log('📋 Modelos sincronizados:');
    console.log(Object.keys(sequelize.models).join(', '));

  } catch (error) {
    console.error('❌ Error durante las migraciones:', error);
  } finally {
    // Cerrar conexión
    await sequelize.close();
    console.log('🔌 Conexión cerrada');
  }
}

// Ejecutar migración
runMigrations();