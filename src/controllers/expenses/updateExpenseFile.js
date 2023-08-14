const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const {
  updateExpenseFileRepository,
} = require("../../repositories/expensesRepositories");

const updateExpenseFile = async (req, res) => {
  try {
    const { id } = req.params;

    const document = req.file;

    const updated = await updateExpenseFileRepository(document.filename, id);

    if (updated.affectedRows === 0) {
      throwJsonError("400", `Se produjo un error...`);
    } else {
      res.status(201);
      res.send(`Archivo ${id} cargado correctamente`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = updateExpenseFile;
