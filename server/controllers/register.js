// controllers/register.js
const User = require('../models/User');

// Función para registrar un nuevo usuario
const register = async (req, res) => {
  const { nombre, apellidos, genero, email, telefono, password, confirmPassword } = req.body;

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden' });
  }

  try {
    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ 'usuario.datosPersonales.email': email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Asignar la foto de perfil según el género
    const fotoPerfil = genero.toLowerCase() === 'masculino' ? 'uploads/profile/masculino.png' : 'uploads/profile/femenino.jpg';

    // Crear un nuevo usuario usando el modelo existente
    const newUser = new User({
      usuario: {
        // id: Date.now().toString(),
        datosPersonales: {
          nombre,
          apellidos,
          email,
          telefono,
          genero,
          fotoPerfil,
          fechaRegistro: new Date().toISOString() // Formato ISO para la fecha
        },
        credenciales: {
          username: email.split('@')[0], // Usar parte del email como username
          passwordHash: password, // Asegúrate de aplicar hashing en producción
          ultimoInicioSesion: null
        },
        actividad: {
        },
        grupos: [], // Inicializar grupos como un array vacío
        solicitudesEnviadas: [], // Inicializar solicitudes enviadas
        notificaciones: [], // Inicializar notificaciones
        publicaciones: [] // Inicializar publicaciones
      }
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();
    return res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser.usuario });
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// Exportar la función de registro
module.exports = { register };
