const express = require('express');
const cors = require('cors');
const db = require('./db/conexion');
const authRoutes = require('./routes/auth');
const registerRoutes = require('./routes/register');
const imageRoutes = require('./routes/imagesprofile');
const create_group = require('./routes/create_group');
const join_group = require('./routes/join_group');
const solicitudes = require('./routes/applications_sent');
const enviar_message = require('./routes/send_message');
const calculate_ranking = require('./routes/calculate_rankign');
const create_post = require('./routes/create_post');
const give_like = require('./routes/give_like');
const activities = require('./routes/activities');
const finishTour = require('./routes/finish_tour');
// Conectar a la base de datos
db();
// Crear instancia de Express
const app = express();
// Configuración de CORS
app.use(cors());
// Middleware para parsear JSON
app.use(express.json());
// Integrar enrutadores
app.use('/auth', authRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/groups/create', create_group);
app.use('/api/join/group', join_group);
app.use('/api/solicitudes/enviadas/grupos', solicitudes);
app.use('/api/enviar/mensajes/grupos', enviar_message);
app.use('/api/calculate/ranking/users', calculate_ranking);
app.use('/api/create/post/user', create_post);
app.use('/api/give/likes/publications', give_like);
app.use('/api/activitie/group/start', activities);
app.use('/api/finalizar/recorrido', finishTour);
app.use('/api/images', imageRoutes);
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
