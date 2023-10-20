const Joi = require("joi");
const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../../repositories/userRepositories");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
});

const loginUser = async (req, res) => {
  try {
    const { body } = req;

    await schema.validateAsync(body);

    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      throwJsonError(403, "No existe un usuario con ese email y/o contraseña");
    }

    const { ID, name, password: passwordHash, date } = user;
    console.log(user);

    const isValidPassword = await bcrypt.compare(password, passwordHash);

    if (!isValidPassword) {
      throwJsonError(403, "No existe un usuario con ese email y/o contraseña");
    }

    const { JWT_SECRET } = process.env;

    const tokenPayLoad = {
      ID,
      name,
      email,
      password,
    };

    const token = jwt.sign(tokenPayLoad, "asdf1234", {
      expiresIn: "1200d",
    });

    const response = {
      accesToken: token,
      expiresIn: "1200d",
    };

    res.status(200);
    res.send([response, user]);
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = loginUser;
