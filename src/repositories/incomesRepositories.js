const { getConnection } = require("../infraestructure/database");

const findIncomes = async () => {
  const pool = await getConnection();
  const sql = `SELECT *  FROM income `;
  const [incomes] = await pool.query(sql);

  return incomes;
};

const createNewIncome = async (data) => {
  const { idPointsOfSale, amount, type, concept, date } = data;

  const pool = await getConnection();
  const sql = `INSERT INTO income (idPointsOfSale,amount, type, concept, date ) VALUES (?,?,?,?,?) `;
  const [newIncome] = await pool.query(sql, [
    idPointsOfSale,
    amount,
    type,
    concept,
    date,
  ]);

  return newIncome;
};

const deleteIncomeRepository = async (id) => {
  const pool = await getConnection();
  const sql = `DELETE FROM income WHERE id = ?`;
  const [deleted] = await pool.query(sql, [id]);

  return deleted;
};

const updateFileRepository = async (name) => {
  const pool = await getConnection();
  const sql = `UPDATE income SET document = ? WHERE id = 4`;
  const [updated] = await pool.query(sql, [name]);

  return updated;
};

const updateIncomeRepository = async (data, id) => {
  const { idPointsOfSale, amount, type, concept } = data;

  const pool = await getConnection();
  const sql = `UPDATE income SET idPointsOfSale = ?, amount = ?, type = ?, concept = ? WHERE id = ?`;
  const [income] = await pool.query(sql, [
    idPointsOfSale,
    amount,
    type,
    concept,
    id,
  ]);

  return income;
};

module.exports = {
  findIncomes,
  createNewIncome,
  deleteIncomeRepository,
  updateFileRepository,
  updateIncomeRepository,
};
