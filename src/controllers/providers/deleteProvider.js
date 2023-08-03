const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const {
  deleteProviderRepository,
} = require("../../repositories/providersRepositories");

const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteProviderRepository(id);

    if (!deleted) {
      throwJsonError("400", `Se produjo un error...`);
    }

    if (deleted.affectedRows === 1) {
      res.status(201);
      res.send(deleted);
    } else {
      throwJsonError("400", `Se produjo un error...`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = deleteProvider;
