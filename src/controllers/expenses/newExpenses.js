const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");

const Joi = require("joi");
const { createNewExpense } = require("../../repositories/expensesRepositories");

const schema = Joi.object().keys({
  idPoint: Joi.number().positive().integer().required(),
  idProvider: Joi.number().positive().integer().required(),
  expenseDate: Joi.date().required(),
  code: Joi.string(),
  amount: Joi.number().positive().required(),
  concept: Joi.string(),
  status: Joi.valid("pagado", "no pagado"),
  paydate: Joi.date().allow("").allow(null),
});

const newExpenses = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);

    await schema.validateAsync(body);

    const {
      idPoint,
      idProvider,
      expenseDate,
      code,
      amount,
      concept,
      status,
      paydate,
    } = body;

    const date = new Date();

    const data = {
      idPoint,
      idProvider,
      expenseDate,
      code,
      amount,
      concept,
      status,
      paydate,
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
