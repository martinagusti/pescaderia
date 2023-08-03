const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");

const Joi = require("joi");
const { createNewExpense } = require("../../repositories/expensesRepositories");

const schema = Joi.object().keys({
  idPointsOfSale: Joi.number().positive().integer().required(),
  idProvider: Joi.number().positive().integer().required(),
  expenseDate: Joi.date().required(),
  code: Joi.string(),
  amount: Joi.number().positive().required(),
  concept: Joi.string(),
  status: Joi.valid("pagado", "no pagado"),
  payDate: Joi.date(),
});

const newExpenses = async (req, res) => {
  try {
    const { body } = req;

    await schema.validateAsync(body);

    const {
      idPointsOfSale,
      idProvider,
      expenseDate,
      code,
      amount,
      concept,
      status,
      payDate,
    } = body;

    const date = new Date();

    const data = {
      idPointsOfSale,
      idProvider,
      expenseDate,
      code,
      amount,
      concept,
      status,
      payDate,
      date,
    };

    const newExpense = await createNewExpense(data);

    console.log(newExpense);

    if (newExpense.affectedRows === 1) {
      res.status(201);
      res.send([data]);
    } else {
      throwJsonError("400", `Error al crear un nuevo ingreso`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = newExpenses;
