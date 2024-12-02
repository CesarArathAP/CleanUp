const Group = require('../models/Groups');
const User = require('../models/User');

const handleApplication = async (req, res) => {
  const { idAdministrador, idGrupo, idSolicitud, decision } = req.body;

  try {
    // Verificar que el grupo existe
    const group = await Group.findById(idGrupo);
    if (!group) {
      return res.status(404).json({ message: "El grupo no existe." });
    }

    // Verificar que el usuario es el administrador del grupo
    if (group.administrador.idUsuario !== idAdministrador) {
      return res.status(403).json({ message: "No tienes permisos para gestionar solicitudes en este grupo." });
    }

    // Buscar la solicitud pendiente en el grupo
    const solicitud = group.miembros.find(
      miembro => miembro.estadoSolicitud === "pendiente" && miembro.idUsuario === idSolicitud
    );
    if (!solicitud) {
      return res.status(404).json({ message: "No se encontró la solicitud pendiente." });
    }

    // Obtener el usuario solicitante
    const user = await User.findById(idSolicitud);
    if (!user) {
      return res.status(404).json({ message: "El usuario no existe." });
    }

    if (decision === "aceptar") {
      // Actualizar el estado de la solicitud en el grupo
      solicitud.estadoSolicitud = "aceptada";

      // Agregar el grupo al documento del usuario aceptado
      await User.updateOne(
        { _id: idSolicitud },
        {
          $push: {
            "usuario.grupos": {
              idGrupo,
              nombreGrupo: group.nombreGrupo,
              nombreAdministrador: group.administrador.nombre,
              estadoSolicitud: "aceptada",
              tipo: group.tipo
            }
          }
        }
      );

      // Guardar los cambios en el grupo
      await group.save();

      return res.status(200).json({ message: "Solicitud aceptada. El usuario ahora es miembro del grupo." });
    } else if (decision === "rechazar") {
      // Eliminar la solicitud pendiente del grupo
      group.miembros = group.miembros.filter(
        miembro => !(miembro.estadoSolicitud === "pendiente" && miembro.idUsuario === idSolicitud)
      );

      // Guardar los cambios en el grupo
      await group.save();

      return res.status(200).json({ message: "Solicitud rechazada. El usuario no fue agregado al grupo." });
    } else {
      return res.status(400).json({ message: "Decisión no válida. Usa 'aceptar' o 'rechazar'." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al procesar la solicitud.",
      error: error.message
    });
  }
};

module.exports = { handleApplication };
