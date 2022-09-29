// var Sequelize = require("sequelize");
// var bcrpt = require("bcrypt");

// const sequelize = new Sequelize("ourDatabase", "root", "password", {
//   host: "localhost",
//   port: 3306,
//   dialect: "mysql",
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
//   operatorsAliases: false,
// });

// //set up User table
// var User = sequelize.define("users", {
//   id: {
//     type: Sequelize.INTEGER,
//     unique: true,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   username: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// User.beforeCreate((user, options) => {
//   const salt = bcrypt.genSaltSync();
//   user.password = bcrypt.hasSync(user.password, salt);
// });

// User.prototype.validPassword = function (password) {
//   return bcrpt.compareSync(password, this.password);
// };

// //create all defined tables in the specified database
// sequelize
//   .sync()
//   .then(() =>
//     console.log(
//       "user tables has been successfully created if one does not exist"
//     )
//   )
//   .catch((error) => console.log("this error occurred", error));

// // export User module for other files
// module.exports = User;

const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
// create our User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User'
  }
);
module.exports = User;