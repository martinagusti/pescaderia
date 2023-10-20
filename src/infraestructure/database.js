const mysql = require("mysql2/promise");

const { MYSQL_HOST, MYSQL_USER, MYSQL_PORT, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;

let pool;

const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: "martin.mysql.database.azure.com",
      user: "martin",
      port: 3306,
      password: "$Agustincho20",
      database: "pescaderia",
      timezone: "Z",
    });
  }

  return pool;
};

module.exports = {
  getConnection,
};

getConnection();
