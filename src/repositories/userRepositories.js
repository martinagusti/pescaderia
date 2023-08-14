const { getConnection } = require("../infraestructure/database");

const findUserByEmail = async (email) => {
  const pool = await getConnection();
  const sql = `SELECT *  FROM users WHERE email = ?`;
  const [user] = await pool.query(sql, email);

  return user[0];
};

const findUserByName = async (name) => {
  const pool = await getConnection();
  const sql = `SELECT *  FROM users WHERE name = ?`;
  const [user] = await pool.query(sql, name);

  return user[0];
};

const createUser = async (userDB) => {
  const { name, email, passwordHash, date } = userDB;

  const pool = await getConnection();
  const sql = `INSERT INTO users (name, email, password, date) VALUES ( ?, ?, ?, ?);`;
  const [created] = await pool.query(sql, [name, email, passwordHash, date]);
  console.log(created);
  return created.insertId;
};

const newProfile = async (userData, id) => {
  const { name, passwordHash } = userData;

  const pool = await getConnection();
  const sql = `UPDATE users SET name=?, password=? WHERE id = ?`;
  const [created] = await pool.query(sql, [name, passwordHash, id]);

  return created.affectedRows;
};

const deleteProfileRepositorie = async (id) => {
  const pool = await getConnection();
  const sql = `DELETE FROM users WHERE id = ?`;
  const [deleted] = await pool.query(sql, [id]);

  return deleted.affectedRows;
};

const getAllProfiles = async () => {
  const pool = await getConnection();
  const sql = `SELECT * from users`;
  const [profiles] = await pool.query(sql);

  return profiles;
};

module.exports = {
  findUserByEmail,
  findUserByName,
  createUser,
  newProfile,
  deleteProfileRepositorie,
  getAllProfiles,
};
