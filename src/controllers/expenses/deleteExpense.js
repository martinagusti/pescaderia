const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const {
  deleteExpenseRepository,
} = require("../../repositories/expensesRepositories");

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteExpenseRepository(id);

    if (deleted.affectedRows === 0) {
      throwJsonError("400", `Se produjo un error...`);
    } else {
      res.status(201);
      res.send(`Egreso ${id} eliminado correctamente`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = deleteExpense;
