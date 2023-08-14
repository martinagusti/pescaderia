const Joi = require("joi");

const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const { createNewIncome } = require("../../repositories/incomesRepositories");

const schema = Joi.object().keys({
  idPointsOfSale: Joi.number().positive().integer().required(),
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("efectivo", "tarjeta", "transferencia"),
  concept: Joi.string(),
});

const newIncome = async (req, res) => {
  try {
    const { body } = req;

    console.log(body);
    const { idPointsOfSale, amount, type, concept } = body;

    await schema.validateAsync(body);

    const date = new Date();

    const data = {
      idPointsOfSale,
      amount,
      type,
      concept,
      date,
    };

    const newIncome = await createNewIncome(data);

    console.log(newIncome);

    if (newIncome.affectedRows === 1) {
      data.id = newIncome.insertId;
      res.status(201);
      res.send([data]);
    } else {
      throwJsonError("400", `Error al crear un nuevo ingreso`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = newIncome;
