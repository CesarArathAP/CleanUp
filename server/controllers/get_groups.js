const Group = require('../models/Groups');

// Controlador para obtener un grupo por su ObjectId
const getGroupById = async (req, res) => {
  const { oid } = req.params;

  try {
    // Buscar el grupo por su ID
    const group = await Group.findById(oid);

    // Si no se encuentra el grupo
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    // Retornar el grupo en formato JSON
    return res.status(200).json(group);
  } catch (error) {
    // Manejar errores de MongoDB o problemas en el servidor
    return res.status(500).json({ message: 'Error al obtener el grupo', error: error.message });
  }
};

module.exports = { getGroupById };
