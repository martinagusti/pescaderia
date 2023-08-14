const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");

const Joi = require("joi");
const { updateNewExpense } = require("../../repositories/expensesRepositories");

const schema = Joi.object().keys({
  idPointsOfSale: Joi.number().positive().integer().required(),
  idProvider: Joi.number().positive().integer().required(),
  expenseDate: Joi.date().required(),
  code: Joi.string(),
  amount: Joi.number().positive().required(),
  concept: Joi.string(),
  status: Joi.valid("pagado", "no pagado"),
  paydate: Joi.date(),
});

const updateExpense = async (req, res) => {
  try {
    const { body } = req;

    const { id } = req.params;

    console.log(body);

    await schema.validateAsync(body);

    const {
      idPointsOfSale,
      idProvider,
      expenseDate,
      code,
      amount,
      concept,
      status,
      paydate,
    } = body;

    console.log(idPointsOfSale);

    const data = {
      idPointsOfSale,
      idProvider,
      expenseDate,
      code,
      amount,
      concept,
      status,
      paydate,
    };

    const updateExpense = await updateNewExpense(data, id);

    console.log(updateExpense);

    if (updateExpense.affectedRows === 1) {
      res.status(200);
      res.send([data]);
    } else {
      throwJsonError("400", `Error al guardar los cambios`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = updateExpense;
