const { Sequelize } = require("sequelize");
const { Pool } = require("pg");

let db;

if (process.env.NODE_ENV === 'production') {
  db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    ssl: {
      require: true, // require SSL connections
      rejectUnauthorized: false, // optional, but recommended to avoid errors
    },
  });
} else {
  db = new Sequelize({
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: false,
      dialectOptions: {
        ssl: {
          require: true, // require SSL connections
          rejectUnauthorized: false, // optional, but recommended to avoid errors
        },
      },
  })

}


module.exports = { db }