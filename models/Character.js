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
    },
    generation: {
      type: DataTypes.INTEGER,
    },
    catchrate: {
      type: DataTypes.DECIMAL,
    }
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
