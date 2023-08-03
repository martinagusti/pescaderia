const express = require("express");
const multer = require("multer");

const validateAuth = require("../middlewares/validateAuth");
const getIncomes = require("../controllers/incomes/getIncomes");
const newIncome = require("../controllers/incomes/newIncome");
const insertFile = require("../controllers/incomes/insertFile");
const deleteIncome = require("../controllers/incomes/deleteIncome");
const updateFile = require("../controllers/incomes/updateFile");
const updateIncome = require("../controllers/incomes/updateIncome");

const incomeRoutes = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb("", Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

//endpoints publicos

//endpoints privados
incomeRoutes.route("/").all(validateAuth).get(getIncomes);
incomeRoutes.route("/create").all(validateAuth).post(newIncome);
incomeRoutes.route("/update/:id").all(validateAuth).patch(updateFile);
incomeRoutes.route("/delete/:id").all(validateAuth).delete(deleteIncome);
incomeRoutes.route("/updateIncome/:id").all(validateAuth).patch(updateIncome);

incomeRoutes.route("/files").post(upload.single("avatar"), updateFile);
/* incomeRoutes
  .route("/files", upload.single("avatar"))
  .all(validateAuth)
  .post(insertFile); */

module.exports = {
  incomeRoutes,
};
