const Usuario = require('../models/Usuario');
const Desarrollador = require('../models/Desarrollador');
const Cliente = require('../models/Cliente');
const bcryptjs = require('bcryptjs'); // Para encriptar/desencriptar passwords
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken

exports.createDesarrollador = async (req, res) => {
    try {
        const { dni, nombre, apellido, email, password } = req.body;

        // Validar campos requeridos
        if (!dni || !nombre || !apellido || !email || !password) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        // Verificar si el DNI o el email ya existen
        const dniExists = await Usuario.findOne({ where: { dni } });
        const emailExists = await Usuario.findOne({ where: { email } });
        if (dniExists || emailExists) {
            return res.status(400).json({ message: 'DNI o email ya están registrados' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Crear el usuario primero
        const usuario = await Usuario.create({ dni, nombre, apellido, email, password: hashedPassword });

        // Crear el desarrollador
        await Desarrollador.create({ id: usuario.id, activo: true }); // Asegúrate de que la tabla Desarrollador esté definida

        res.status(201).json({ message: 'Desarrollador registrado exitosamente' });
    } catch (error) {
        console.error('Error al crear desarrollador:', error);
        res.status(500).json({ error: error.message });
    }
};

// Crear cliente
exports.createCliente = async (req, res) => {
    try {
        const { dni, nombre, apellido, email, password } = req.body;

        // Validar campos requeridos
        if (!dni || !nombre || !apellido || !email || !password) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        // Verificar si el DNI o el email ya existen
        const dniExists = await Usuario.findOne({ where: { dni } });
        const emailExists = await Usuario.findOne({ where: { email } });
        if (dniExists || emailExists) {
            return res.status(400).json({ message: 'DNI o email ya están registrados' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Crear el usuario primero
        const usuario = await Usuario.create({ dni, nombre, apellido, email, password: hashedPassword });

        // Crear el cliente
        await Cliente.create({ id: usuario.id }); // Asegúrate de que la tabla Cliente esté definida

        res.status(201).json({ message: 'Cliente registrado exitosamente' });
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ error: error.message });
    }
};

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
        const { dni, nombre, apellido, email, password } = req.body;
        console.log('Datos de registro:', req.body);

        // Validar que los campos requeridos estén presentes
        if (!dni || !nombre || !apellido || !email || !password) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        // Verificar si el DNI ya existe
        const dniExists = await Usuario.findOne({ where: { dni } });
        if (dniExists) {
            return res.status(400).json({ message: 'El DNI ya está registrado' });
        }

        // Verificar si el email ya existe
        const emailExists = await Usuario.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Crear el usuario
        const usuario = await Usuario.create({ dni, nombre, apellido, email, password: hashedPassword });
        res.status(201).json(usuario);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
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