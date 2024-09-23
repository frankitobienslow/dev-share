const jwt = require('jsonwebtoken');

const verificarToken = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Se requiere autenticación' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            }

            req.usuarioId = decoded.id;
            req.isCliente = decoded.isCliente; // Asegúrate de que esto esté en el token
            req.isDesarrollador = decoded.isDesarrollador; // Asegúrate de que esto esté en el token

            // Verifica los roles permitidos
            if (roles.length && !roles.some(role => {
                return (role === 'cliente' && req.isCliente) || (role === 'desarrollador' && req.isDesarrollador);
            })) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            next();
        });
    };
};

module.exports = verificarToken;