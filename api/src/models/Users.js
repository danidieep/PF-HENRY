const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      favId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      dateBorn: {
        type: DataTypes.DATEONLY,
      },
      idAuth: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      ban: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
      },
      isSuscribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );
};
