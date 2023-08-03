const { getConnection } = require("../infraestructure/database");

const findExpenses = async () => {
  const pool = await getConnection();
  const sql = `SELECT *  FROM expenses `;
  const [expenses] = await pool.query(sql);

  return expenses;
};

const createNewExpense = async (data) => {
  const {
    idPointsOfSale,
    idProvider,
    expenseDate,
    code,
    amount,
    concept,
    status,
    payDate,
    date,
  } = data;

  const pool = await getConnection();
  const sql = `INSERT INTO expenses ( idPointsOfSale,
    idProvider,
    expenseDate,
    code,
    amount,
    concept,
    status,
    payDate,
    date) VALUES (?,?,?,?,?,?,?,?,?) `;
  const [expenses] = await pool.query(sql, [
    idPointsOfSale,
    idProvider,
    expenseDate,
    code,
    amount,
    concept,
    status,
    payDate,
    date,
  ]);

  return expenses;
};

const deleteExpenseRepository = async (id) => {
  const pool = await getConnection();
  const sql = `DELETE FROM expenses WHERE id = ?`;
  const [deleted] = await pool.query(sql, [id]);

  return deleted;
};

const updateNewExpense = async (data) => {
  const {
    idPointsOfSale,
    idProvider,
    expenseDate,
    code,
    amount,
    concept,
    status,
    payDate,
  } = data;

  const pool = await getConnection();
  const sql = `UPDATE expenses SET idPointsOfSale = ?, idProvider = ?, expenseDate = ?, code = ?,
  amount = ?,
  concept = ?,
  status = ?,
  payDate = ?`;
  const [expenses] = await pool.query(sql, [
    idPointsOfSale,
    idProvider,
    expenseDate,
    code,
    amount,
    concept,
    status,
    payDate,
  ]);

  return expenses;
};

module.exports = {
  findExpenses,
  createNewExpense,
  deleteExpenseRepository,
  updateNewExpense,
};
