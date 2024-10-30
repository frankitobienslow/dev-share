const db = require('../../db'); // Asegúrate de que esta es la conexión a la base de datos

const getDeveloperEvaluation = async (developerId, skillId) => {
  const query = `
    SELECT 
      e.id,
      d.id AS developerId,
      h.nombre AS skillName,
      n.nombre AS levelName,
      e.resultado,
      e.fecha
    FROM evaluacion e
    JOIN desarrollador d ON e.id_desarrollador = d.id
    JOIN habilidad h ON e.id_habilidad = h.id
    JOIN nivel n ON e.id_nivel = n.id
    WHERE e.id_desarrollador = ? AND e.id_habilidad = ?;
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [developerId, skillId], (error, results) => {
      if (error) {
        return reject(error);
      }
      // Procesar el resultado para devolver un estado claro
      if (results.length > 0) {
        const evaluation = results[0];
        evaluation.status = evaluation.resultado !== null ? 'Aprobado' : 'Pendiente';
        resolve(evaluation);
      } else {
        resolve(null);
      }
    });
  });
};

module.exports = { getDeveloperEvaluation };
