const express = require("express");
const loginUser = require("../controllers/users/loginUser");
const registerUser = require("../controllers/users/registerUser");
const validateAuth = require("../middlewares/validateAuth");
const updateProfile = require("../controllers/users/updateProfile");
const deleteProfile = require("../controllers/users/deleteProfile");
const getProfiles = require("../controllers/users/getProfiles");

const userRoutes = express.Router();

//endpoints publicos
userRoutes.post("/login", loginUser);
userRoutes.post("/register", registerUser);
userRoutes.get("/getprofiles", getProfiles);
/* userRoutes.get("/activation", activateUser);
userRoutes.get("/:id", getUserInfo); */

//endpoints privados
userRoutes.route("/updateprofile").all(validateAuth).patch(updateProfile);
userRoutes.route("/deleteprofile").all(validateAuth).delete(deleteProfile);
userRoutes.route("/getprofiles").all(validateAuth).get(getProfiles);

module.exports = {
  userRoutes,
};
