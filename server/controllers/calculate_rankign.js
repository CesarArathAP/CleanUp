const Group = require('../models/Groups'); // Modelo de grupos
const User = require('../models/User');   // Modelo de usuarios

const calculateRanking = async (req, res) => {
  try {
    const { idGrupo, idUsuario, kilosRecolectados } = req.body;

    if (!idGrupo || !idUsuario || !kilosRecolectados) {
      return res.status(400).json({ message: 'Faltan datos necesarios (idGrupo, idUsuario, kilosRecolectados).' });
    }

    // Obtener la fecha del inicio de la semana actual
    const hoy = new Date();
    const inicioSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay())); // Primer día de la semana (domingo)
    inicioSemana.setHours(0, 0, 0, 0); // Normalizar al inicio del día

    // Buscar el grupo
    const grupo = await Group.findById(idGrupo);
    if (!grupo) {
      return res.status(404).json({ message: 'Grupo no encontrado.' });
    }

    // Actualizar ranking semanal del grupo
    let rankingSemanal = grupo.rankingGrupo.find(r => {
      const semanaExistente = new Date(r.semana);
      semanaExistente.setHours(0, 0, 0, 0); // Normalizar al inicio del día
      return semanaExistente.getTime() === inicioSemana.getTime();
    });

    if (rankingSemanal) {
      rankingSemanal.puntos += kilosRecolectados;
    } else {
      grupo.rankingGrupo.push({ semana: inicioSemana, puntos: kilosRecolectados });
    }

    // Actualizar ranking individual del usuario dentro del grupo
    const miembro = grupo.miembros.find(m => m.idUsuario === idUsuario);
    if (!miembro) {
      return res.status(404).json({ message: 'Usuario no encontrado en el grupo.' });
    }
    miembro.ranking += kilosRecolectados;

    // Guardar los cambios en el grupo
    await grupo.save();

    // Actualizar puntos en el documento del usuario
    const usuario = await User.findById(idUsuario);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado en la base de datos.' });
    }

    // Actualizar ranking individual semanal
    let rankingIndividual = usuario.usuario.actividad.rankingIndividual.find(r => {
      const semanaExistente = new Date(r.semana);
      semanaExistente.setHours(0, 0, 0, 0); // Normalizar al inicio del día
      return semanaExistente.getTime() === inicioSemana.getTime();
    });

    if (rankingIndividual) {
      rankingIndividual.puntos += kilosRecolectados;
    } else {
      usuario.usuario.actividad.rankingIndividual.push({ semana: inicioSemana, puntos: kilosRecolectados });
    }

    // Actualizar ranking del grupo en el documento del usuario
    const grupoUsuario = usuario.usuario.grupos.find(g => g.idGrupo === idGrupo);
    if (grupoUsuario) {
      grupoUsuario.rankingGrupo += kilosRecolectados;
    }

    // Guardar los cambios en el usuario
    usuario.usuario.puntosTotales += kilosRecolectados; // Actualizar puntos totales del usuario
    await usuario.save();

    res.status(200).json({ message: 'Ranking actualizado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el ranking.', error: error.message });
  }
};

module.exports = { calculateRanking };
