const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
class Shift extends Model {}
Shift.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shift_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "shift",
  }
);

module.exports = Shift;