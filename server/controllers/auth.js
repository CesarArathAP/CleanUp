// controllers/authController.js
const User = require('../models/User');

const loginAttempts = {}; // Objeto para rastrear intentos de inicio de sesión

// Autenticación del usuario
const login = async (req, res) => {
  const { username, password } = req.body;
  const currentTime = Date.now();
  const lockTime = 5 * 60 * 1000; // 5 minutos en milisegundos

  // Verificar si el usuario está bloqueado
  if (loginAttempts[username]) {
    const { attempts, lastAttempt } = loginAttempts[username];
    if (attempts >= 5 && currentTime - lastAttempt < lockTime) {
      return res.status(429).json({ message: 'Demasiados intentos fallidos. Vuelve a intentarlo en 5 minutos.' });
    }
  }

  try {
    // Buscar el usuario por nombre de usuario
    const user = await User.findOne({ 'usuario.credenciales.username': username });
    if (!user) {
      // Incrementar intentos si el usuario no se encuentra
      trackLoginAttempt(username);
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña (deberías usar hashing en producción)
    if (user.usuario.credenciales.passwordHash === password) {
      // Reiniciar intentos al iniciar sesión exitosamente
      resetLoginAttempts(username);
      return res.status(200).json({ message: 'Inicio de sesión exitoso', user: user.usuario });
    } else {
      // Incrementar intentos si la contraseña es incorrecta
      trackLoginAttempt(username);
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

// Función para rastrear intentos de inicio de sesión
const trackLoginAttempt = (username) => {
  if (!loginAttempts[username]) {
    loginAttempts[username] = { attempts: 0, lastAttempt: Date.now() };
  }
  loginAttempts[username].attempts += 1;
  loginAttempts[username].lastAttempt = Date.now();
};

// Función para reiniciar los intentos
const resetLoginAttempts = (username) => {
  delete loginAttempts[username];
};

// Exportar las funciones
module.exports = { login };