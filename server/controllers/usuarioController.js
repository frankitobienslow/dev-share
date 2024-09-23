// Autenticar usuario (Login)
const Usuario = require('../models/Usuario'); // Asegúrate de importar tu modelo de usuario
const Cliente = require('../models/Cliente'); // Modelo para cliente
const Desarrollador = require('../models/Desarrollador'); // Modelo para desarrollador
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Crear usuario genérico
exports.createUsuario = async (datosUsuario) => {
    const { dni, nombre, apellido, email, password } = datosUsuario;

    // Validar que los campos requeridos estén presentes
    if (!dni || !nombre || !apellido || !email || !password) {
        throw new Error('Faltan datos requeridos');
    }

    // Verificar si el DNI o el email ya existen
    const dniExists = await Usuario.findOne({ where: { dni } });
    const emailExists = await Usuario.findOne({ where: { email } });
    if (dniExists || emailExists) {
        throw new Error('DNI o email ya están registrados');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Crear el usuario
    const usuario = await Usuario.create({ dni, nombre, apellido, email, password: hashedPassword });

    return usuario; // Devolver el usuario creado
};

// Crear desarrollador
exports.createDesarrollador = async (req, res) => {
    try {
        const { dni, nombre, apellido, email, password } = req.body;

        // Crear el usuario usando la función genérica
        const usuario = await exports.createUsuario({ dni, nombre, apellido, email, password });

        // Crear el desarrollador
        await Desarrollador.create({ id: usuario.id, activo: true });

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

        // Crear el usuario usando la función genérica
        const usuario = await exports.createUsuario({ dni, nombre, apellido, email, password });

        // Crear el cliente
        await Cliente.create({ id: usuario.id });

        res.status(201).json({ message: 'Cliente registrado exitosamente' });
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ error: error.message });
    }
};



exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login intento:", email); // Verifica que se esté llamando a esta función
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        console.log("Usuario encontrado:", usuario); // Verifica el usuario encontrado

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const match = await bcryptjs.compare(password, usuario.password);
        console.log("Contraseña correcta:", match); // Verifica si la contraseña es correcta

        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Obtener rol del usuario en un solo paso
        const rol = await Cliente.findOne({ where: { id: usuario.id } })
            .then(cliente => cliente ? 'cliente' : 
                Desarrollador.findOne({ where: { id: usuario.id } })
                .then(desarrollador => desarrollador ? 'desarrollador' : null)
            );

        console.log("Rol encontrado:", rol); // Verifica el rol encontrado

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login exitoso',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol, // Aquí devolvemos el rol directamente
            },
            token
        });
    } catch (error) {
        console.error("Error en login:", error); // Más detalle del error
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