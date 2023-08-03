const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const { findProviders } = require("../../repositories/providersRepositories");

const getProviders = async (req, res) => {
  try {
    const providers = await findProviders();

    if (!providers) {
      throwJsonError("400", `Se produjo un error...`);
    }

    res.status(200);
    res.send(providers);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getProviders;
