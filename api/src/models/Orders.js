const { DataTypes, UUIDV4 } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderid:{
        type:DataTypes.BIGINT,
        allowNull: false
      },
       paymentID:{
         type:DataTypes.BIGINT,
         allowNull: false
       },
      paymentStatus:{
        type:DataTypes.STRING,
        allowNull: false
      },
      paymentAmount:{
        type:DataTypes.INTEGER,
        allowNull: false
      },
      payId:{
        type: DataTypes.STRING,
        allowNull: false
      },
      payEmail:{
        type: DataTypes.STRING,
         allowNull: true
      },
      cancelled:{
        type: DataTypes.BOOLEAN,
      },
      order_status:{
        type: DataTypes.STRING,
      },
      adress:{
        type:DataTypes.STRING
      }
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );
};