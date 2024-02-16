const mongoose = require("mongoose");

const dbConnection = async () => {
  /**
   * Conexión a la base de datos
   * @param {String} process.env.DB_CONNECTION - URL de la base de datos
   * @returns {Promise} - Promesa de conexión a la base de datos
   */
  
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("BD Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base datos - Hable con el administrador");
  }
};

module.exports = {
  dbConnection,
};