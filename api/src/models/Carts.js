const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cart", 
    {
    id: {
      type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    totalPrice: {
        type: DataTypes.STRING,
        defaultValue:1,
        // allowNull: false
    }
  }, { timestamps: false });
};
 