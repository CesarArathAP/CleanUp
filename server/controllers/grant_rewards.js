const Group = require('../models/Groups');
const User = require('../models/User');

// Controlador para otorgar recompensas
const grantReward = async (req, res) => {
  try {
    const { idGrupo, idAdministrador, idUsuario, cantidad } = req.body;

    // Validar datos obligatorios
    if (!idGrupo || !idAdministrador || !idUsuario || !cantidad) {
      return res.status(400).json({
        message: 'Faltan datos necesarios: idGrupo, idAdministrador, idUsuario y cantidad son obligatorios.'
      });
    }

    // Buscar el grupo por ID
    const grupo = await Group.findById(idGrupo);
    if (!grupo) {
      return res.status(404).json({ message: 'Grupo no encontrado.' });
    }

    // Verificar que el usuario sea el administrador del grupo
    if (grupo.administrador.idUsuario !== idAdministrador) {
      return res.status(403).json({ message: 'No tienes permisos para otorgar recompensas en este grupo.' });
    }

    // Buscar al miembro dentro del grupo
    const miembro = grupo.miembros.find(m => m.idUsuario === idUsuario);
    if (!miembro) {
      return res.status(404).json({ message: 'Miembro no encontrado en el grupo.' });
    }

    // Crear una nueva recompensa para el grupo
    const nuevaRecompensaGrupo = {
      cantidad,
      fecha: new Date(),
      hora: new Date().toLocaleTimeString('es-MX')
    };

    // Agregar la recompensa al historial del miembro dentro del grupo
    miembro.historialRecompensas.push(nuevaRecompensaGrupo);

    // Guardar los cambios en el grupo
    await grupo.save();

    // Buscar al usuario por ID
    const usuario = await User.findById(idUsuario);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Obtener el nombre del grupo
    const nombreGrupo = grupo.nombreGrupo || grupo.nombre;  // Asegúrate de que `nombreGrupo` esté definido correctamente

    // Crear una nueva recompensa para el usuario
    const nuevaRecompensaUsuario = {
      cantidad,
      nombreGrupo: nombreGrupo, // Asegúrate de pasar el nombre del grupo correcto
      fecha: nuevaRecompensaGrupo.fecha,
      hora: nuevaRecompensaGrupo.hora
    };

    // Agregar la recompensa al historial de actividad del usuario
    usuario.usuario.actividad.recompensas.push(nuevaRecompensaUsuario);

    // Guardar los cambios en el usuario
    await usuario.save();

    // Solo devolver el mensaje de éxito
    res.status(200).json({
      message: 'Recompensa otorgada con éxito.'
    });
  } catch (error) {
    console.error('Error al otorgar recompensa:', error);
    res.status(500).json({
      message: 'Error al otorgar recompensa.',
      error: error.message
    });
  }
};

module.exports = { grantReward };
