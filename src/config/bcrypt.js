import bcrypt from "bcrypt";

export const createHash = async (password) => {
  try {
    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    // Manejar el error, por ejemplo, registrar en un archivo de registro o enviar una respuesta de error al cliente
    throw new Error("Error al crear el hash de la contraseña: " + error.message);
  }
};

export const isValidPassword = async (password, hashPassword) => {
    try {
    const isValid = await bcrypt.compare(password, hashPassword);
    return isValid;
  } catch (error) {
    // Manejar el error, por ejemplo, registrar en un archivo de registro o enviar una respuesta de error al cliente
    throw new Error("Error al validar la contraseña: " + error.message);
  }
};
