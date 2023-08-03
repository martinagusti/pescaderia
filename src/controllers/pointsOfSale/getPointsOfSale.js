const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const { findPoints } = require("../../repositories/pointsRepositories");

const getPointsOfSale = async (req, res) => {
  try {
    const getPoints = await findPoints();

    if (!getPoints) {
      throwJsonError("400", `Se produjo un error...`);
    }

    res.status(200);
    res.send(getPoints);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = getPointsOfSale;
