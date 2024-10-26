const db = require('../../db'); // Usa la configuración de base de datos existente

// Consulta un registro por ID
async function getRecordById(id) {
  try {
    const [rows] = await db.query('SELECT * FROM my_table WHERE id = ?', [id]);
    return { record: rows[0] || null };
  } catch (error) {
    console.error(error);
    return { error: 'Error al obtener el registro' };
  }
}

// Consulta todos los registros
async function getAllRecords() {
  try {
    const [rows] = await db.query('SELECT * FROM my_table');
    return { records: rows };
  } catch (error) {
    console.error(error);
    return { error: 'Error al obtener los registros' };
  }
}

module.exports = { getRecordById, getAllRecords };
