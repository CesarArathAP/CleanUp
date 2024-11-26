const express = require('express');
const cors = require('cors');
const db = require('./db/conexion');
const authRoutes = require('./routes/auth');
const registerRoutes = require('./routes/register');
const imageRoutes = require('./routes/imagesprofile');
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
app.use('/api/images', imageRoutes);
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
