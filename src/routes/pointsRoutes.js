const express = require("express");

const validateAuth = require("../middlewares/validateAuth");
const createPointsOfSale = require("../controllers/pointsOfSale/createPoints");
const updatePointsOfSale = require("../controllers/pointsOfSale/updatePointsOfSale");
const getPointsOfSale = require("../controllers/pointsOfSale/getPointsOfSale");

const pointsRoutes = express.Router();

//endpoints publicos

//endpoints privados
pointsRoutes.route("/").all(validateAuth).get(getPointsOfSale);
pointsRoutes.route("/create").all(validateAuth).post(createPointsOfSale);
pointsRoutes.route("/update/:id").all(validateAuth).patch(updatePointsOfSale);

module.exports = {
  pointsRoutes,
};
