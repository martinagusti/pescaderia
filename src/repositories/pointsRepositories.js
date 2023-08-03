const { getConnection } = require("../infraestructure/database");

const findPointsByName = async (name) => {
  const pool = await getConnection();
  const sql = `SELECT *  FROM pointsofsale WHERE name = ?`;
  const [points] = await pool.query(sql, name);

  return points[0];
};

const createNewPoint = async (data) => {
  const { name, address, postalCode, city, date } = data;

  const pool = await getConnection();
  const sql = `INSERT INTO pointsofsale (name, address, postalCode, city, date) VALUES (?,?,?,?,?)`;
  const [create] = await pool.query(sql, [
    name,
    address,
    postalCode,
    city,
    date,
  ]);

  return create;
};

const updateNewPoint = async (data, id) => {
  const { name, address, postalCode, city } = data;

  const pool = await getConnection();
  const sql = `UPDATE pointsofsale SET name = ?, address = ?, postalCode = ?, city = ? WHERE ID = ?`;
  const [update] = await pool.query(sql, [name, address, postalCode, city, id]);

  return update;
};

const findPoints = async () => {
  const pool = await getConnection();
  const sql = `SELECT * FROM pointsofsale`;
  const [points] = await pool.query(sql);

  return points;
};

module.exports = {
  findPointsByName,
  createNewPoint,
  updateNewPoint,
  findPoints,
};
