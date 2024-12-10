const User = require('../models/User');

const getPublicationsController = async (req, res) => {
  try {
    // Consulta para obtener todas las publicaciones de todos los usuarios
    const users = await User.find({}, { "usuario.publicaciones": 1, _id: 0 });

    // Combinar todas las publicaciones en un solo array
    const allPublications = users
      .map(user => user.usuario.publicaciones)
      .flat();

    res.status(200).json(allPublications); // Devolver directamente las publicaciones
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = { getPublicationsController };
