const { getConnection } = require("../infraestructure/database");

const findProviders = async () => {
  const pool = await getConnection();
  const sql = `SELECT * FROM providers`;
  const [providers] = await pool.query(sql);

  return providers;
};

const findProviderByName = async (name) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM providers where name = ?`;
  const [providers] = await pool.query(sql, [name]);

  return providers[0];
};

const createNewProvider = async (data) => {
  let { name, businessName, cif, address, postalCode, city } = data;

  const pool = await getConnection();
  const sql = `INSERT INTO providers ( name,
    businessName,
    cif,
    address,
    postalCode,
    city) VALUES (?,?,?,?,?,?)`;
  const [created] = await pool.query(sql, [
    name,
    businessName,
    cif,
    address,
    postalCode,
    city,
  ]);

  return created;
};

const deleteProviderRepository = async (id) => {
  const pool = await getConnection();
  const sql = `DELETE FROM providers WHERE ID = ?`;
  const [deleted] = await pool.query(sql, [id]);

  return deleted;
};

const updateProviderRepository = async (data, id) => {
  const { name, businessName, cif, address, postalCode, city } = data;

  const pool = await getConnection();
  const sql = `UPDATE providers SET name = ?, businessName = ?, cif = ?, address = ?, postalCode = ?, city = ? WHERE ID = ? `;
  const [deleted] = await pool.query(sql, [
    name,
    businessName,
    cif,
    address,
    postalCode,
    city,
    id,
  ]);

  return deleted;
};

const findProviderById = async (id) => {
  const pool = await getConnection();
  const sql = `SELECT * FROM providers WHERE ID = ?`;
  const [provider] = await pool.query(sql, [id]);

  return provider[0];
};

module.exports = {
  findProviders,
  findProviderByName,
  createNewProvider,
  deleteProviderRepository,
  updateProviderRepository,
  findProviderById,
};
