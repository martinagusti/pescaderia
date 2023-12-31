const Joi = require("joi");

const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const {
  findProviderByName,
  updateProviderRepository,
  findProviderById,
} = require("../../repositories/providersRepositories");

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(120).required(),
  businessName: Joi.string().required(),
  cif: Joi.string().required(),
  address: Joi.string(),
  postalCode: Joi.number().positive().integer(),
  city: Joi.string(),
});

const updateProvider = async (req, res) => {
  try {
    const { body } = req;

    const { id } = req.params;

    const provider = await findProviderById(id);

    if (!provider) {
      throwJsonError("400", `No existe ningun proveedor para esa busqueda`);
    }

    await schema.validateAsync(body);

    const { name, businessName, cif, address, postalCode, city } = body;

    console.log("*****");
    console.log(name);

    const providerName = await findProviderByName(name);
    if (providerName) {
      if (providerName?.ID != id) {
        throwJsonError("409", `El nombre ${name} ya ha sido utilizado`);
      }
    }

    console.log(id);
    console.log(provider);

    const data = {
      name,
      businessName,
      cif,
      address,
      postalCode,
      city,
    };

    const updated = await updateProviderRepository(data, id);

    if (updated.affectedRows === 1) {
      res.status(201);
      res.send([data]);
    } else {
      throwJsonError("400", `Error al modificar el proveedor`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = updateProvider;
