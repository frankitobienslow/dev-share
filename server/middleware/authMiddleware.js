const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Obtén el token del encabezado de autorización
    const token = req.headers['authorization']?.split(' ')[1]; // Extrae el token

    // Si no hay token, retorna un error 403
    if (!token) {
        return res.status(403).json({ message: 'Se requiere autenticación' });
    }

    // Verifica el token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
            console.error('Error en el middleware de autenticación:', err);
        }

        // Guarda el ID del usuario decodificado en la solicitud
        req.usuarioId = decoded.id; // o cualquier otra información que necesites
        next(); // Pasa al siguiente middleware o ruta
    });
};

module.exports = verificarToken;