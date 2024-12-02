const Group = require('../models/Groups');
const User = require('../models/User');

const createGroup = async (req, res) => {
  const { nombreGrupo, descripcion, tipo, administrador } = req.body;

  try {
    // Verificar si el usuario ya ha creado un grupo en las últimas 24 horas
    const recentGroup = await Group.findOne({
      "administrador.idUsuario": administrador.idUsuario,
      "fechaCreacion": { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (recentGroup) {
      return res.status(400).json({
        message: "Ya has creado un grupo recientemente, por favor espera 24 horas."
      });
    }

    // Verificar si ya existe un grupo con el mismo nombre
    const existingGroup = await Group.findOne({ nombreGrupo });
    if (existingGroup) {
      return res.status(400).json({
        message: "Ya existe un grupo con este nombre, por favor elige otro."
      });
    }

    // Crear el nuevo grupo
    const newGroup = new Group({
      nombreGrupo,
      descripcion,
      tipo,
      administrador: {
        idUsuario: administrador.idUsuario,
        nombre: administrador.nombre
      },
      miembros: [
        {
          idUsuario: administrador.idUsuario,
          nombre: administrador.nombre,
          estadoSolicitud: "aceptada",
          ranking: 0 // Ranking inicial para el administrador
        }
      ],
      fechaCreacion: new Date(),
      mensajes: [],
      rankingGrupo: [],
      puntos: 0,
      rutasRecoleccion: []
    });

    // Guardar el grupo en la colección de grupos
    await newGroup.save();

    // Actualizar el documento del usuario para agregar el grupo creado
    const updatedUser = await User.findByIdAndUpdate(
      administrador.idUsuario, // Aseguramos que se usa el _id del administrador
      {
        $push: {
          "usuario.grupos": {
            idGrupo: newGroup._id.toString(), // Referencia al grupo creado
            nombreGrupo, // Incluir el nombre del grupo
            nombreAdministrador: administrador.nombre,
            estadoSolicitud: "aceptada",
            tipo,
            ranking: 0 // Ranking inicial para el grupo
          }
        }
      },
      { new: true } // Retorna el documento actualizado
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "No se encontró el usuario administrador."
      });
    }

    // Responder con el mensaje de éxito
    res.status(201).json({
      message: "Grupo creado exitosamente."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el grupo.",
      error: error.message
    });
  }
};

module.exports = { createGroup };
