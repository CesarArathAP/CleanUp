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

    // Verificar la contraseña (comparar directamente)
    if (user.usuario.credenciales.passwordHash === password) {
      // Reiniciar intentos al iniciar sesión exitosamente
      resetLoginAttempts(username);

      // Generar un token único de 32 caracteres
      const token = generateToken();

      // Establecer fecha de expiración (por ejemplo, 1 semana)
      const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días en milisegundos

      // Crear un nuevo objeto de token
      const tokenData = {
        token: token,
        expirationDate: expirationDate
      };

      // Actualizar el último inicio de sesión y agregar el token
      user.usuario.credenciales.ultimoInicioSesion = new Date();
      user.usuario.credenciales.tokens.push(tokenData); // Almacenar el token en el array de tokens

      // Guardar los cambios en el usuario
      await user.save();

      // Retornar el token al cliente
      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        user: user.usuario,
        token: token, // Enviar el token generado
        expiresIn: 604800 // El token es válido por una semana (en segundos)
      });
    } else {
      // Incrementar intentos si la contraseña es incorrecta
      trackLoginAttempt(username);
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error(error);
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

// Función para generar un token de 32 caracteres
const generateToken = () => {
  const timestamp = Date.now().toString(36); // Convertir el timestamp a base 36
  const randomString = Math.random().toString(36).substring(2, 18); // Cadena aleatoria de 16 caracteres
  return timestamp + randomString; // Combinar ambos para obtener un token de 32 caracteres
};

// Exportar las funciones
module.exports = { login };
