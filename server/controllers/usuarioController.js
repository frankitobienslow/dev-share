const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs'); // Para encriptar/desencriptar passwords
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken

// Autenticar usuario (Login)
exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body; // Cambiar dni por email
    try {
        // Buscar usuario por email
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña enviada con la almacenada (desencriptada)
        const match = await bcryptjs.compare(password, usuario.password);

        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, {
            expiresIn: '1h', // El token expirará en 1 hora
        });

        // Retornar el usuario y el token
        res.status(200).json({ message: 'Login exitoso', usuario, token });
    } catch (error) {
        console.error(error); // Log del error para debug
        res.status(500).json({ error: error.message });
    }
};

// Crear usuario
exports.createUsuario = async (req, res) => {
    try {
        const { dni, nombre, apellido, email, password } = req.body; // Agregar email aquí
        console.log('Datos de registro:', req.body);
        if (!dni || !nombre || !apellido || !email || !password) { // Validar email
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Crear el usuario con el email incluido
        const usuario = await Usuario.create({ dni, nombre, apellido, email, password: hashedPassword });
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Error al crear el usuario:', error); // Agrega este log
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener usuario por ID
exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar usuario
exports.updateUsuario = async (req, res) => {
    try {
        const { dni, nombre, apellido, password } = req.body;
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            const updateData = { dni, nombre, apellido };
            if (password) {
                updateData.password = await bcryptjs.hash(password, 10); // Encriptar nueva contraseña
            }
            await usuario.update(updateData);
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            await usuario.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};