const Group = require('../models/Groups');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid'); // Para generar IDs únicos

// Controlador para iniciar una actividad de recolección
const startActivity = async (req, res) => {
  try {
    const { idGrupo, idAdministrador, direccion, fechaFin, horaFin } = req.body;

    // Validar datos obligatorios
    if (!idGrupo || !idAdministrador || !direccion) {
      return res.status(400).json({
        message: 'Faltan datos necesarios: idGrupo, idAdministrador y direccion son obligatorios.'
      });
    }

    // Buscar el grupo por ID
    const grupo = await Group.findById(idGrupo);
    if (!grupo) {
      return res.status(404).json({ message: 'Grupo no encontrado.' });
    }

    // Verificar que el usuario sea el administrador del grupo
    if (grupo.administrador.idUsuario !== idAdministrador) {
      return res.status(403).json({ message: 'No tienes permisos para iniciar esta actividad.' });
    }

    // Crear una nueva actividad respetando el esquema
    const nuevaActividad = {
      idActividad: uuidv4(),            // ID único para la actividad
      fechaInicio: new Date(),          // Fecha de inicio actual
      horaInicio: new Date().toLocaleTimeString('es-MX'), // Hora de inicio actual
      direccion,                        // Dirección proporcionada
      fechaFin: fechaFin || null,       // Fecha de fin opcional
      horaFin: horaFin || null,         // Hora de fin opcional
      estado: 'iniciada'                // Estado inicial por defecto
    };

    // Agregar la actividad al grupo
    grupo.rutasRecoleccion.push(nuevaActividad);

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

        // Crear la actividad para el usuario respetando el esquema
        const actividadUsuario = {
          idActividad: nuevaActividad.idActividad,
          direccion: nuevaActividad.direccion,
          fechaInicio: nuevaActividad.fechaInicio,
          horaInicio: nuevaActividad.horaInicio,
          fechaFin: nuevaActividad.fechaFin,
          horaFin: nuevaActividad.horaFin,
          estado: nuevaActividad.estado
        };

        // Agregar la nueva actividad a las rutas recorridas del usuario
        usuario.usuario.actividad.rutasRecorridas.push(actividadUsuario);

        // Guardar los cambios en el usuario
        await usuario.save();
      }
    }

    // Guardar los cambios en el grupo
    await grupo.save();

    res.status(200).json({
      message: 'Actividad de recolección creada con éxito y añadida a los miembros.',
      actividad: nuevaActividad
    });
  } catch (error) {
    console.error('Error al crear actividad de recolección:', error);
    res.status(500).json({
      message: 'Error al crear actividad de recolección.',
      error: error.message
    });
  }
};

module.exports = { startActivity };
