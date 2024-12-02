const Group = require('../models/Groups');
const User = require('../models/User');

const joinGroup = async (req, res) => {
  const { idUsuario, idGrupo } = req.body;

  try {
    // Verificar si el grupo existe
    const group = await Group.findById(idGrupo);
    if (!group) {
      return res.status(404).json({ message: "El grupo no existe." });
    }

    // Verificar si el usuario ya es miembro del grupo
    const isMember = group.miembros.some(member => member.idUsuario === idUsuario);
    if (isMember) {
      return res.status(400).json({ message: "Ya eres miembro de este grupo." });
    }

    // Obtener información del usuario
    const user = await User.findById(idUsuario);
    if (!user) {
      return res.status(404).json({ message: "El usuario no existe." });
    }

    const nombreCompleto = `${user.usuario.datosPersonales.nombre} ${user.usuario.datosPersonales.apellidos}`;

    // Verificar si el grupo es privado
    if (group.tipo === "privado") {
      // Crear una notificación para el administrador del grupo
      const notification = {
        idNotificacion: `${Date.now()}-${idUsuario}`,
        contenido: `El usuario ${nombreCompleto} desea unirse al grupo "${group.nombreGrupo}".`,
        fecha: new Date(),
        estado: "pendiente"
      };

      // Actualizar las notificaciones del administrador
      await User.updateOne(
        { "_id": group.administrador.idUsuario },
        { $push: { "usuario.notificaciones": notification } }
      );

      // Agregar solicitud pendiente al grupo
      group.miembros.push({
        idUsuario,
        nombre: nombreCompleto,
        estadoSolicitud: "pendiente",
        ranking: 0 // Ranking inicial para solicitudes pendientes
      });

      await group.save();

      return res.status(200).json({
        message: "Solicitud enviada. El administrador revisará tu solicitud."
      });
    }

    // Si el grupo es público, aceptar automáticamente
    group.miembros.push({
      idUsuario,
      nombre: nombreCompleto,
      estadoSolicitud: "aceptada",
      ranking: 0 // Ranking inicial para miembros aceptados
    });

    await group.save();

    // Agregar el grupo a la lista del usuario
    await User.updateOne(
      { "_id": idUsuario },
      {
        $push: {
          "usuario.grupos": {
            idGrupo,
            nombreGrupo: group.nombreGrupo, // Incluir el nombre del grupo
            nombreAdministrador: group.administrador.nombre,
            estadoSolicitud: "aceptada",
            tipo: group.tipo,
            ranking: 0 // Ranking inicial en el grupo del usuario
          }
        }
      }
    );

    return res.status(200).json({ message: "Te has unido al grupo exitosamente." });
  } catch (error) {
    res.status(500).json({
      message: "Error al unirse al grupo.",
      error: error.message
    });
  }
};

module.exports = { joinGroup };
