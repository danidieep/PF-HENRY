
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "artworkincart",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      artworkId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
    },
    {
      timestamps: false,
      underscored: true,
    }
  );
}