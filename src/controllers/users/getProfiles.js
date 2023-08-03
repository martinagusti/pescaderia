const createJsonError = require("../../errors/createJsonError");

const throwJsonError = require("../../errors/throwJsonError");
const { getAllProfiles } = require("../../repositories/userRepositories");

const getProfiles = async (req, res) => {
  try {
    const profiles = await getAllProfiles();

    if (!profiles) {
      throwJsonError(400, "Se produjo un error");
    }

    res.status(200);
    res.send(profiles);
  } catch (error) {
    createJsonError(error, res);
  }
};
module.exports = getProfiles;
