const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Post = db.define("posts", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("enabled","disabled"),
    allowNull: true,
    defaultValue: "enabled",
  }
})

module.exports = Post;