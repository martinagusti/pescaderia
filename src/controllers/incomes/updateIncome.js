const Joi = require("joi");

const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const {
  updateIncomeRepository,
} = require("../../repositories/incomesRepositories");

const schema = Joi.object().keys({
  idPointsOfSale: Joi.number().positive().integer().required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("efectivo", "tarjeta", "transferencia"),
  concept: Joi.string(),
});

const updateIncome = async (req, res) => {
  try {
    const { body } = req;

    const { id } = req.params;

    await schema.validateAsync(body);

    const { idPointsOfSale, amount, type, concept } = body;

    const data = {
      idPointsOfSale,
      amount,
      type,
      concept,
    };

    const updated = await updateIncomeRepository(data, id);

    if (updated.affectedRows === 1) {
      res.status(201);
      res.send([data]);
    } else {
      throwJsonError("400", `Error al modificar el ingreso`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = updateIncome;
