const Group = require('../models/Groups');

const sendMessage = async (req, res) => {
  const { idGrupo, idUsuario, nombreUsuario, contenido } = req.body;

  try {
    // Verificar que el grupo existe
    const group = await Group.findById(idGrupo);
    if (!group) {
      return res.status(404).json({ message: "El grupo no existe." });
    }

    // Verificar que el usuario es miembro del grupo o el administrador
    const isAdmin = group.administrador.idUsuario === idUsuario;
    const isMember = group.miembros.some(
      miembro => miembro.idUsuario === idUsuario && miembro.estadoSolicitud === "aceptada"
    );

    if (!isAdmin && !isMember) {
      return res.status(403).json({ message: "No tienes permisos para enviar mensajes en este grupo." });
    }

    // Agregar el mensaje al grupo
    group.mensajes.push({
      idUsuario,
      nombreUsuario,
      contenido,
      fechaEnvio: new Date()
    });

    // Guardar el grupo con el mensaje agregado
    await group.save();

    return res.status(200).json({ message: "Mensaje enviado correctamente." });
  } catch (error) {
    res.status(500).json({
      message: "Error al enviar el mensaje.",
      error: error.message
    });
  }
};

module.exports = { sendMessage };
