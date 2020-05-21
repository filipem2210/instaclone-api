require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  operatorAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
