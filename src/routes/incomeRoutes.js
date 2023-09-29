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
  destination: "public/incomeFiles",
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
/* C:\Users\Usuario\Documents\OnlineValles\Peixateria Riembau\Peixateria Backend\public\incomeFiles\1691524766037Certificate.pdf */
//endpoints publicos

//endpoints privados
incomeRoutes.route("/").all(validateAuth).get(getIncomes);
incomeRoutes.route("/create").all(validateAuth).post(newIncome);
incomeRoutes.route("/update/:id").all(validateAuth).patch(updateFile);
incomeRoutes.route("/delete/:id").all(validateAuth).delete(deleteIncome);
incomeRoutes.route("/updateIncome/:id").all(validateAuth).patch(updateIncome);

incomeRoutes.route("/files/:id").post(upload.single("avatar"), updateFile);

module.exports = {
  incomeRoutes,
};
