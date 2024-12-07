const mongoose = require('mongoose');

// Subesquema para las actividades de recolección
const recoleccionSchema = new mongoose.Schema({
  idActividad: { type: String, required: true },
  fechaInicio: { type: Date, default: Date.now },
  horaInicio: { type: String, default: () => new Date().toLocaleTimeString('es-MX') },
  direccion: { type: String, required: true }, // Dirección obligatoria
  fechaFin: { type: Date },
  horaFin: { type: String },
  estado: { type: String, default: 'iniciada' } // Estado por defecto: iniciada
}, { _id: false });

// Subesquema para historial de recompensas
const recompensaSchema = new mongoose.Schema({
  cantidad: { type: Number, required: true }, // Cantidad de recompensas otorgadas
  fecha: { type: Date, default: Date.now }    // Fecha en que se otorgó la recompensa
}, { _id: false });

// Subesquema para miembros del grupo
const miembroSchema = new mongoose.Schema({
  idUsuario: { type: String, required: true },
  nombre: { type: String, required: true },
  ranking: { type: Number, default: 0 }, // Ranking individual del miembro en el grupo
  estadoSolicitud: { type: String, required: true }, // "pendiente", "aceptada", etc.
  historialRecompensas: [recompensaSchema] // Historial de recompensas del miembro
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
  rutasRecoleccion: [recoleccionSchema]   // Detalles de las actividades de recolección
});

const Group = mongoose.model('Groups', groupSchema);

module.exports = Group;
