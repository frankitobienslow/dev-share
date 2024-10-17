const jwt = require('jsonwebtoken');

const verificarToken = (rolesPermitidos = []) => {
    return (req, res, next) => {
        try {
            // Verifica si hay un token en la cabecera Authorization
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Se requiere autenticación' });
            }

            // Verifica y decodifica el token
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Token inválido o expirado' });
                }

                // Adjunta los datos del usuario a la request
                req.usuarioId = decoded.id;
                req.rol = decoded.rol; // Asumimos que en el token ya se guarda un campo 'rol'

                // Si se especifican roles permitidos, verificamos si el usuario tiene alguno
                if (rolesPermitidos.length && !rolesPermitidos.includes(req.rol)) {
                    return res.status(403).json({ message: 'Acceso denegado' });
                }

                // Si pasa todas las verificaciones, continúa
                next();
            });
        } catch (error) {
            return res.status(500).json({ message: 'Error procesando la autenticación' });
        }
    };
};

module.exports = verificarToken;