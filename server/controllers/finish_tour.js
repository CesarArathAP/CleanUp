const Group = require('../models/Groups');
const User = require('../models/User');

// Controlador para finalizar una actividad de recolección
const finishTour = async (req, res) => {
  try {
    const { idGrupo, idAdministrador, idActividad } = req.body;

    // Validar datos obligatorios
    if (!idGrupo || !idAdministrador || !idActividad) {
      return res.status(400).json({
        message: 'Faltan datos necesarios: idGrupo, idAdministrador y idActividad son obligatorios.'
      });
    }

    // Buscar el grupo por ID
    const grupo = await Group.findById(idGrupo);
    if (!grupo) {
      return res.status(404).json({ message: 'Grupo no encontrado.' });
    }

    // Verificar que el usuario sea el administrador del grupo
    if (grupo.administrador.idUsuario !== idAdministrador) {
      return res.status(403).json({ message: 'No tienes permisos para finalizar esta actividad.' });
    }

    // Encontrar la actividad dentro de rutasRecoleccion
    const actividad = grupo.rutasRecoleccion.find(act => act.idActividad === idActividad);
    if (!actividad) {
      return res.status(404).json({ message: 'Actividad no encontrada.' });
    }

    // Verificar si la actividad ya está finalizada
    if (actividad.estado === 'finalizada') {
      return res.status(400).json({ message: 'Este recorrido ya fue finalizado.' });
    }

    // Actualizar el estado de la actividad a "finalizada"
    actividad.estado = 'finalizada';
    actividad.fechaFin = new Date(); // Fecha actual
    actividad.horaFin = new Date().toLocaleTimeString('es-MX'); // Hora actual

    // Guardar los cambios en el grupo
    await grupo.save();

    // Actualizar la actividad en todos los miembros del grupo
    for (let miembro of grupo.miembros) {
      // Buscar al usuario
      const usuario = await User.findById(miembro.idUsuario);

      // Verificar que el usuario exista
      if (usuario) {
        // Verificar si existe la estructura actividad
        if (!usuario.usuario.actividad) {
          usuario.usuario.actividad = {}; // Crear el objeto actividad si no existe
        }

        // Verificar si no existe el arreglo rutasRecorridas
        if (!usuario.usuario.actividad.rutasRecorridas) {
          usuario.usuario.actividad.rutasRecorridas = []; // Crear el arreglo rutasRecorridas si no existe
        }

        // Encontrar la actividad dentro de rutasRecorridas
        const actividadUsuario = usuario.usuario.actividad.rutasRecorridas.find(act => act.idActividad === idActividad);
        if (actividadUsuario) {
          // Actualizar la actividad a "finalizada"
          actividadUsuario.estado = 'finalizada';
          actividadUsuario.fechaFin = new Date();
          actividadUsuario.horaFin = new Date().toLocaleTimeString('es-MX');

          // Guardar los cambios en el usuario
          await usuario.save();
        }
      }
    }

    res.status(200).json({
      message: 'Actividad finalizada con éxito y actualizada en los miembros del grupo.'
    });
  } catch (error) {
    console.error('Error al finalizar actividad de recolección:', error);
    res.status(500).json({
      message: 'Error al finalizar actividad de recolección.',
      error: error.message
    });
  }
};

module.exports = { finishTour };
