const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const { findIncomes } = require("../../repositories/incomesRepositories");

const getIncomes = async (req, res) => {
  try {
    const incomes = await findIncomes();

    if (!incomes) {
      throwJsonError("400", `Se produjo un error...`);
    }

    res.status(200);
    res.send(incomes);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getIncomes;
