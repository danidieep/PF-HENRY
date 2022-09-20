// const { DataTypes } = require("sequelize");

// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define(
//     "user",
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         primaryKey: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//         lastname: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//       //   email: {
//       //     type: DataTypes.STRING,
//       //     allowNull: false,
//       //   },
//       //   password: {
//       //     type: DataTypes.STRING,
//       //     allowNull: false,
//       //   },
//       //   dateBorn: {
//       //     type: DataTypes.DATEONLY
//       //   },
//     },
//     { timestamps: false, createdAt: false, updatedAt: false }
//   );
// };

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

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
<<<<<<< HEAD

=======
>>>>>>> 3f7dbeadc2bbf365021c0fc4ad3d668f681a65d0
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
<<<<<<< HEAD

=======
>>>>>>> 3f7dbeadc2bbf365021c0fc4ad3d668f681a65d0
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
<<<<<<< HEAD

=======
>>>>>>> 3f7dbeadc2bbf365021c0fc4ad3d668f681a65d0
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
<<<<<<< HEAD

      dateBorn: {
       type: DataTypes.DATEONLY
      },  
      
=======
      dateBorn: {
        type: DataTypes.DATEONLY,
      },
      role: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
>>>>>>> 3f7dbeadc2bbf365021c0fc4ad3d668f681a65d0
    },
    { timestamps: false, createdAt: false, updatedAt: false }
  );
};
