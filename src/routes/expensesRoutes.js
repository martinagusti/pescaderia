const express = require("express");

const validateAuth = require("../middlewares/validateAuth");
const getExpenses = require("../controllers/expenses/getExpenses");
const newExpenses = require("../controllers/expenses/newExpenses");
const deleteExpense = require("../controllers/expenses/deleteExpense");
const updateExpense = require("../controllers/expenses/updateExpense");

const expensesRoutes = express.Router();

//endpoints publicos

//endpoints privados
expensesRoutes.route("/").all(validateAuth).get(getExpenses);
expensesRoutes.route("/create").all(validateAuth).post(newExpenses);
expensesRoutes.route("/delete/:id").all(validateAuth).delete(deleteExpense);
expensesRoutes.route("/update/:id").all(validateAuth).patch(updateExpense);

module.exports = {
  expensesRoutes,
};
