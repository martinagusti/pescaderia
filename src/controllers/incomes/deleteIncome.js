const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const {
  deleteIncomeRepository,
} = require("../../repositories/incomesRepositories");

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteIncomeRepository(id);

    if (deleted.affectedRows === 0) {
      throwJsonError("400", `Se produjo un error...`);
    } else {
      res.status(201);
      res.send(`Ingreso ${id} eliminado correctamente`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = deleteIncome;
