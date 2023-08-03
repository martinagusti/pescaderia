const Joi = require("joi");
const bcrypt = require("bcrypt");

const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const {
  findUserByName,
  findUserByEmail,
  createUser,
} = require("../../repositories/userRepositories");

const schema = Joi.object().keys({
  name: Joi.string().min(4).max(120).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  verifyPassword: Joi.string().required().valid(Joi.ref("password")),
});

const registerUser = async (req, res) => {
  try {
    const { body } = req;

    await schema.validateAsync(body);

    const { name, email, password } = body;

    const user = await findUserByEmail(email);

    if (user) {
      throwJsonError("409", `El usuario ${email} no esta disponible`);
    }

    const validName = await findUserByName(name);
    if (validName) {
      throwJsonError("409", `El usuario ${name} no esta disponible`);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const date = new Date();

    const userDB = {
      name,
      email,
      passwordHash,
      date,
    };

    const userId = await createUser(userDB);

    res.status(201);
    res.send([userDB]);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = registerUser;
