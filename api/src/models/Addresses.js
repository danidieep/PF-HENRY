const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "adress",
    {
      email: {
        type: DataTypes.STRING,
      },
      street: {
        type: DataTypes.STRING,
      },
      number: {
        type: DataTypes.STRING,
      },
      postalCode: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
