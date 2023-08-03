const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const {
  findProviderById,
} = require("../../repositories/providersRepositories");

const getProvidersById = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await findProviderById(id);

    if (!provider) {
      throwJsonError("400", `No existe ningun proveedor para esa busqueda`);
    }

    res.status(200);
    res.send(provider);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getProvidersById;
