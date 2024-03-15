const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Celebration = db.define("celebrationoficial", {
  id: {
    primaryKey: true,
    type : DataTypes.INTEGER,
    allownull : false,
    autoIncrement : true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imgURL:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  idDepartament: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
})

module.exports = Celebration;