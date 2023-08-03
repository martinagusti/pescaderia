const Joi = require("joi");

const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const {
  findPointsByName,
  createNewPoint,
} = require("../../repositories/pointsRepositories");

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(120).required(),
  address: Joi.string().required(),
  postalCode: Joi.number().positive().integer().required(),
  city: Joi.string().required(),
});

const createPointsOfSale = async (req, res) => {
  try {
    const { body } = req;

    await schema.validateAsync(body);

    const { name, address, postalCode, city } = body;

    const point = await findPointsByName(name);

    console.log("******");

    if (point) {
      throwJsonError("409", `El nombre ${name} ya ha sido utilizado`);
    }

    const date = new Date();

    const data = {
      name,
      address,
      postalCode,
      city,
      date,
    };

    const newPoint = await createNewPoint(data);

    console.log(newPoint);

    if (newPoint.affectedRows === 1) {
      res.status(201);
      res.send([data]);
    } else {
      throwJsonError("400", `Error al crear un nuevo punto de venta`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = createPointsOfSale;
