const express = require("express");

const validateAuth = require("../middlewares/validateAuth");
const getProviders = require("../controllers/providers/getProviders");
const createProvider = require("../controllers/providers/createProvider");
const deleteProvider = require("../controllers/providers/deleteProvider");
const updateProvider = require("../controllers/providers/updateProvider");
const getProvidersById = require("../controllers/providers/getProvidersById");

const providersRoutes = express.Router();

//endpoints publicos

//endpoints privados
providersRoutes.route("/").all(validateAuth).get(getProviders);
providersRoutes.route("/:id").all(validateAuth).get(getProvidersById);
providersRoutes.route("/create").all(validateAuth).post(createProvider);
providersRoutes.route("/delete/:id").all(validateAuth).delete(deleteProvider);
providersRoutes.route("/update/:id").all(validateAuth).patch(updateProvider);

module.exports = {
  providersRoutes,
};
