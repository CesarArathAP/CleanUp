
const path = require('path');
const fs = require('fs');

// Controlador para servir imágenes de perfil desde múltiples rutas
const getImageProfile = (req, res) => {
  const { id, imageName } = req.params;

  // Construir rutas absolutas para ambas ubicaciones
  const paths = [
    path.join(__dirname, '../uploads/profile', imageName),
    path.join(__dirname, '../uploads/profileUsers', imageName),
    path.join(__dirname, '../uploads/images', imageName),
  ];

  // Buscar la imagen en ambas rutas
  const imagePath = paths.find((filePath) => fs.existsSync(filePath));

  if (imagePath) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({
      message: `La imagen ${imageName} para el usuario con ID ${id} no fue encontrada en las rutas disponibles.`,
    });
  }
};

module.exports = {
  getImageProfile,
};
