const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const { findExpenses } = require("../../repositories/expensesRepositories");

const getExpenses = async (req, res) => {
  try {
    const expenses = await findExpenses();

    if (!expenses) {
      throwJsonError("400", `Se produjo un error...`);
    }

    res.status(200);
    res.send(expenses);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getExpenses;
