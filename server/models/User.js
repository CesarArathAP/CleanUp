// models/User.js
const mongoose = require('mongoose');

// Esquema para datos personales
const datosPersonalesSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  genero: { type: String, required: true },
  fotoPerfil: { type: String, required: true },
  fechaRegistro: { type: Date, required: true }
}, { _id: false }); // Evitar _id en subdocumentos

// Esquema para credenciales
const credencialesSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  ultimoInicioSesion: { type: Date }
}, { _id: false }); // Evitar _id en subdocumentos

// Esquema para la ruta recorrida
const rutaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  zona: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  coordenadas: [{ lat: Number, lng: Number }],
  imagenes: {
    antes: { type: String },
    despues: { type: String }
  },
  puntos: { type: Number, required: true },
  resumen: {
    CantidadBolsas: { type: String },
    Comentarios: { type: String }
  }
}, { _id: false }); // Evitar _id en subdocumentos

// Esquema para actividad
const actividadSchema = new mongoose.Schema({
  rutasRecorridas: [rutaSchema],
  rankingIndividual: [{
    semana: { type: String, required: true },
    puntos: { type: Number, required: true }
  }],
  recompensas: [{
    idRecompensa: { type: String, required: true },
    monto: { type: Number, required: true },
    estado: { type: String, required: true },
    grupoOtorgante: {
      idGrupo: { type: String, required: true },
      nombreGrupo: { type: String, required: true }
    },
    fechaOtorgamiento: { type: Date, required: true },
    motivo: { type: String, required: true }
  }]
}, { _id: false }); // Evitar _id en subdocumentos

// Esquema para grupos
const grupoSchema = new mongoose.Schema({
  idGrupo: { type: String, required: true },
  fotoPerfil: { type: String, required: true },
  nombreAdministrador: { type: String, required: true },
  estadoSolicitud: { type: String, required: true },
  tipo: { type: String, required: true }
}, { _id: false }); // Evitar _id en subdocumentos

// Esquema para notificaciones
const notificacionSchema = new mongoose.Schema({
  idNotificacion: { type: String, required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, required: true },
  estado: { type: String, required: true }
}, { _id: false }); // Evitar _id en subdocumentos

// Esquema para publicaciones
const publicacionSchema = new mongoose.Schema({
  idPublicacion: { type: String, required: true },
  contenido: { type: String, required: true },
  imagenes: [{ type: String }],
  likes: [{ type: String }],
  fechaPublicacion: { type: Date, required: true }
}, { _id: false }); // Evitar _id en subdocumentos

// Esquema principal para el usuario
const userSchema = new mongoose.Schema({
  usuario: {
    id: { type: String, required: true },
    datosPersonales: datosPersonalesSchema,
    credenciales: credencialesSchema,
    actividad: actividadSchema,
    grupos: [grupoSchema],
    solicitudesEnviadas: [{ type: String }],
    notificaciones: [notificacionSchema],
    publicaciones: [publicacionSchema]
  }
});

// Crear el modelo
const User = mongoose.model('users', userSchema);

module.exports = User; // Exportar el modelo