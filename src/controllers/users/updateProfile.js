const Joi = require("joi");
const createJsonError = require("../../errors/createJsonError");
const bcrypt = require("bcrypt");
const throwJsonError = require("../../errors/throwJsonError");
const { newProfile } = require("../../repositories/userRepositories");

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(120).required(),
  password: Joi.string().min(6).max(20).required(),
  verifyPassword: Joi.string().required().valid(Joi.ref("password")),
});

const updateProfile = async (req, res) => {
  try {
    const { body } = req;
    console.log(req.auth);
    const { ID } = req.auth;

    await schema.validateAsync(body);

    const { name, password } = body;

    const passwordHash = await bcrypt.hash(password, 12);

    const userData = {
      name,
      passwordHash,
    };

    const affectedRows = await newProfile(userData, ID);
    if (affectedRows === 0) {
      throwJsonError(400, "No se ha podido actualizar datos de usuario");
    }

    res.status(201);
    res.send([userData]);
  } catch (error) {
    createJsonError(error, res);
  }
};
module.exports = updateProfile;
