const createJsonError = require("../../errors/createJsonError");

const throwJsonError = require("../../errors/throwJsonError");
const {
  deleteProfileRepositorie,
} = require("../../repositories/userRepositories");

const deleteProfile = async (req, res) => {
  try {
    const { ID } = req.auth;

    const affectedRows = await deleteProfileRepositorie(ID);

    if (affectedRows === 0) {
      throwJsonError(400, "No se ha podido eliminar el usuario");
    }

    res.status(200);
    res.send(`Usuario ${ID} eliminado correctamente`);
  } catch (error) {
    createJsonError(error, res);
  }
};
module.exports = deleteProfile;
