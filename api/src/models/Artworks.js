const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "artwork",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
      },
      collecting_institution: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      creator: {
        type: DataTypes.STRING,
      },
      dimensions: {
        type: DataTypes.STRING,
      },
      medio: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      show:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true,
      },
      createdinDB: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );
};