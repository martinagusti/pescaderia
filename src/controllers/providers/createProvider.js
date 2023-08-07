const Joi = require("joi");

const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const {
  findProviderByName,
  createNewProvider,
} = require("../../repositories/providersRepositories");

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(120).required(),
  businessName: Joi.string().required(),
  cif: Joi.string().required(),
  address: Joi.string(),
  postalCode: Joi.number().positive().integer(),
  city: Joi.string(),
});

const createProvider = async (req, res) => {
  try {
    const { body } = req;

    await schema.validateAsync(body);

    const { name, businessName, cif, address, postalCode, city } = body;

    const provider = await findProviderByName(name);

    if (provider) {
      throwJsonError("409", `El nombre ${name} ya ha sido utilizado`);
    }

    const data = {
      name,
      businessName,
      cif,
      address,
      postalCode,
      city,
    };

    const newProvider = await createNewProvider(data);

    if (newProvider.affectedRows === 1) {
      data.ID = newProvider.insertId;
      res.status(201);
      res.send([data]);
    } else {
      throwJsonError("400", `Error al crear un nuevo proveedor`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = createProvider;
