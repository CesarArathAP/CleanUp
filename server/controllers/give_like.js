const User = require('../models/User');

const giveLike = async (req, res) => {
  try {
    const { idUsuario, idPublicacion } = req.body;

    // Validar datos obligatorios
    if (!idUsuario || !idPublicacion) {
      return res.status(400).json({
        message: 'Faltan datos necesarios: idUsuario e idPublicacion son obligatorios.'
      });
    }

    // Buscar el usuario que está dando like
    const usuario = await User.findById(idUsuario);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario que da like no encontrado.' });
    }

    // Buscar la publicación en los usuarios
    const usuarioConPublicacion = await User.findOne({
      'usuario.publicaciones.idPublicacion': idPublicacion
    });

    if (!usuarioConPublicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada.' });
    }

    // Obtener la publicación específica
    const publicacion = usuarioConPublicacion.usuario.publicaciones.find(
      pub => pub.idPublicacion === idPublicacion
    );

    // Verificar si el usuario ya dio like
    const yaDioLike = publicacion.likes.some(like => like.idUsuario === idUsuario);

    if (yaDioLike) {
      return res.status(400).json({ message: 'El usuario ya dio like a esta publicación.' });
    }

    // Agregar el like
    publicacion.likes.push({
      idUsuario,
      nombre: `${usuario.usuario.datosPersonales.nombre} ${usuario.usuario.datosPersonales.apellidos}`
    });

    // Guardar los cambios
    await usuarioConPublicacion.save();

    res.status(200).json({ message: 'Like agregado con éxito.' });
  } catch (error) {
    console.error('Error al dar like:', error);
    res.status(500).json({
      message: 'Error al dar like.',
      error: error.message
    });
  }
};

module.exports = { giveLike };
