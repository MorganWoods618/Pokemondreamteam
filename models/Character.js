const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// MOST OF THIS WAS STOLEN OFF THE ORM 4TH AND 5TH ASSIGNMENT AND CHANGED TO FIT OUR NEEDS

class Character extends Model {}

Character.init(
  {
    character_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      //not sure the above data type works, they can have up to two types
    },
    generation: {
      type: DataTypes.INTEGER,
    },
    catchrate: {
      type: DataTypes.DECIMAL,
    },
    // is active may or may not be a viable input
    is_active: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    // COULD USE TABLE NAME OR LEAVE UNFROZEN(WILL AUTO PLURALIZE)
    freezeTableName: true,
    modelName: "character",
  }
);

module.exports = Character;
