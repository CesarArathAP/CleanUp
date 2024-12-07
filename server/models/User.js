const mongoose = require('mongoose');

// Subesquema para datos personales
const datosPersonalesSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  genero: { type: String, required: true },
  fotoPerfil: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now }
}, { _id: false });

// Subesquema para credenciales
const credencialesSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  ultimoInicioSesion: { type: Date }
}, { _id: false });

// Subesquema para actividades del usuario
const actividadUsuarioSchema = new mongoose.Schema({
  idActividad: { type: String, required: true },
  direccion: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  horaInicio: { type: String, required: true },
  fechaFin: { type: Date },
  horaFin: { type: String },
  estado: { type: String, default: 'iniciada' }
}, { _id: false });

// Subesquema para actividad
const actividadSchema = new mongoose.Schema({
  rutasRecorridas: [actividadUsuarioSchema], // Aquí se corrige el arreglo con el subesquema
  rankingIndividual: [{
    semana: { type: Date, required: true }, // Inicio de la semana
    puntos: { type: Number, default: 0 }   // Puntos acumulados esa semana
  }],
  recompensas: [{ type: String }]
}, { _id: false });

// Subesquema para grupos
const grupoSchema = new mongoose.Schema({
  idGrupo: { type: String, required: true },
  nombreGrupo: { type: String, required: true },
  nombreAdministrador: { type: String, required: true },
  rankingGrupo: { type: Number, default: 0 }, // Ranking acumulado en este grupo
  estadoSolicitud: { type: String, required: true }, // "pendiente", "aceptada", etc.
  tipo: { type: String, required: true } // "privado" o "público"
}, { _id: false });

// Subesquema para notificaciones
const notificacionSchema = new mongoose.Schema({
  idNotificacion: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  estado: { type: String, required: true } // "leído", "pendiente", etc.
}, { _id: false });

// Subesquema para likes
const likeSchema = new mongoose.Schema({
  idUsuario: { type: String, required: true },
  nombre: { type: String, required: true }
}, { _id: false });

// Subesquema para publicaciones
const publicacionSchema = new mongoose.Schema({
  idPublicacion: { type: String, required: true },
  contenido: { type: String, required: true },
  imagenes: [{ type: String }],
  likes: [likeSchema], // Lista de objetos de likes
  fechaPublicacion: { type: Date, default: Date.now }
}, { _id: false });

// (Resto del modelo permanece igual)
const userSchema = new mongoose.Schema({
  usuario: {
    datosPersonales: datosPersonalesSchema,
    credenciales: credencialesSchema,
    actividad: actividadSchema,
    grupos: [grupoSchema],
    notificaciones: [notificacionSchema],
    publicaciones: [publicacionSchema],
    puntosTotales: { type: Number, default: 0 }
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
