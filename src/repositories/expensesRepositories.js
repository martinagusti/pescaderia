const { getConnection } = require("../infraestructure/database");

const findExpenses = async () => {
  const pool = await getConnection();
  const sql = `SELECT expenses.*, providers.name as providerName, pointsofsale.name as pointName FROM pescaderia.expenses left join providers on providers.id = expenses.idProvider left join pointsofsale on pointsofsale.id = expenses.idPointOfSale `;
  const [expenses] = await pool.query(sql);

  return expenses;
};

const createNewExpense = async (data) => {
  const {
    idPoint,
    idProvider,
    expenseDate,
    code,
    amount,
    concept,
    status,
    paydate,
    date,
  } = data;

  const pool = await getConnection();
  const sql = `INSERT INTO expenses ( 
    idPointOfSale,
    idProvider,
    expenseDate,
    code,
    amount,
    concept,
    status,
    paydate,
    date) VALUES (?,?,?,?,?,?,?,?,?) `;
  const [expenses] = await pool.query(sql, [
    idPoint,
    idProvider,
    expenseDate,
    code,
    amount,
    concept,
    status,
    paydate,
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

const updateNewExpense = async (data, id) => {
  const {
    idPointsOfSale,
    idProvider,
    expenseDate,
    code,
    amount,
    concept,
    status,
    paydate,
  } = data;

  const pool = await getConnection();
  const sql = `UPDATE expenses SET idPointOfSale = ?, idProvider = ?, expenseDate = ?, code = ?,
  amount = ?,
  concept = ?,
  status = ?,
  payDate = ? WHERE id = ?`;
  const [expenses] = await pool.query(sql, [
    idPointsOfSale,
    idProvider,
    expenseDate,
    code,
    amount,
    concept,
    status,
    paydate,
    id,
  ]);

  return expenses;
};

const updateExpenseFileRepository = async (name, id) => {
  const pool = await getConnection();
  const sql = `UPDATE expenses SET document = ? WHERE id = ?`;
  const [updated] = await pool.query(sql, [name, id]);

  return updated;
};

module.exports = {
  findExpenses,
  createNewExpense,
  deleteExpenseRepository,
  updateNewExpense,
  updateExpenseFileRepository,
};
