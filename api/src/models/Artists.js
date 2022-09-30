const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "artist",
    {
      id: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hometown: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );
};
