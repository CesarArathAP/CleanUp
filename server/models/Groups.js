const mongoose = require('mongoose');

// Subesquema para miembros del grupo
const miembroSchema = new mongoose.Schema({
  idUsuario: { type: String, required: true },
  nombre: { type: String, required: true },
  ranking: { type: Number, default: 0 }, // Ranking individual del miembro en el grupo
  estadoSolicitud: { type: String, required: true } // "pendiente", "aceptada", etc.
}, { _id: false });

// Subesquema para mensajes en el grupo
const mensajeSchema = new mongoose.Schema({
  idUsuario: { type: String, required: true },
  nombreUsuario: { type: String, required: true },
  contenido: { type: String, required: true },
  fechaEnvio: { type: Date, default: Date.now }
}, { _id: false });

// Subesquema para historial de puntos del grupo
const historialPuntosSchema = new mongoose.Schema({
  semana: { type: Date, required: true }, // Inicio de la semana
  puntos: { type: Number, default: 0 }   // Puntos acumulados esa semana
}, { _id: false });

const groupSchema = new mongoose.Schema({
  nombreGrupo: { type: String, required: true },
  descripcion: { type: String, required: true },
  tipo: { type: String, required: true }, // "privado" o "público"
  administrador: {
    idUsuario: { type: String, required: true },
    nombre: { type: String, required: true }
  },
  miembros: [miembroSchema],
  mensajes: [mensajeSchema],
  fechaCreacion: { type: Date, default: Date.now },
  rankingGrupo: [historialPuntosSchema], // Historial de puntos del grupo por semana
  puntos: { type: Number, default: 0 },  // Puntos totales del grupo
  rutasRecoleccion: [{ type: String }]   // Rutas asignadas al grupo
});

const Group = mongoose.model('Groups', groupSchema);

module.exports = Group;
