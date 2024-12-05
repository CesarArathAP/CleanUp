const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');

// Configuración de multer para guardar imágenes en "uploads/images/"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/images/')); // Ruta relativa desde este archivo
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`; // Nombre único para cada imagen
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

const createPost = async (req, res) => {
  try {
    const { idUsuario, contenido } = req.body;

    // Validar que los datos obligatorios estén presentes
    if (!idUsuario || !contenido) {
      return res.status(400).json({
        message: 'Faltan datos necesarios: idUsuario y contenido son obligatorios.'
      });
    }

    // Buscar el usuario en la base de datos
    const usuario = await User.findById(idUsuario);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Obtener las rutas relativas de las imágenes cargadas
    const imagenes = req.files
      ? req.files.map(file => `uploads/images/${file.filename}`)
      : [];

    // Crear la nueva publicación
    const nuevaPublicacion = {
      idPublicacion: uuidv4(),
      contenido: contenido.trim(),
      imagenes, // Lista de rutas de las imágenes
      likes: [],
      fechaPublicacion: new Date()
    };

    // Guardar la publicación en la lista de publicaciones del usuario
    usuario.usuario.publicaciones.push(nuevaPublicacion);
    await usuario.save();

    // Respuesta exitosa
    res.status(201).json({
      message: 'Publicación creada con éxito.'
    });
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    res.status(500).json({
      message: 'Error al crear la publicación.',
      error: error.message
    });
  }
};

module.exports = { createPost, upload };
