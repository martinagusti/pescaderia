const express = require("express");
const multer = require("multer");

const validateAuth = require("../middlewares/validateAuth");
const getExpenses = require("../controllers/expenses/getExpenses");
const newExpenses = require("../controllers/expenses/newExpenses");
const deleteExpense = require("../controllers/expenses/deleteExpense");
const updateExpense = require("../controllers/expenses/updateExpense");
const updateExpenseFile = require("../controllers/expenses/updateExpenseFile");

const expensesRoutes = express.Router();

const storage = multer.diskStorage({
  destination: "public/expensesFiles",
  filename: function (req, file, cb) {
    const date = new Date();
    cb(
      "",
      `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}` +
        file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
});

//endpoints publicos

//endpoints privados
expensesRoutes.route("/").all(validateAuth).get(getExpenses);
expensesRoutes.route("/create").all(validateAuth).post(newExpenses);
expensesRoutes.route("/delete/:id").all(validateAuth).delete(deleteExpense);
expensesRoutes.route("/update/:id").all(validateAuth).patch(updateExpense);

expensesRoutes
  .route("/files/:id")
  .post(upload.single("avatar"), updateExpenseFile);

module.exports = {
  expensesRoutes,
};
