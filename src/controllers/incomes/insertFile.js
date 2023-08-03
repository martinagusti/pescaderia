const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");

const insertFile = async (req, res) => {
  console.log(req.file);
  res.send("Todo bien!");
};

module.exports = insertFile;
