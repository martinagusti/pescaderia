const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const path = require("path");
const fs = require("fs").promises;
const {
  updateFileRepository,
} = require("../../repositories/incomesRepositories");

const updateFile = async (req, res) => {
  try {
    const { id } = req.params;

    const document = req.file;

    console.log(document);

    const updated = await updateFileRepository(document.filename, id);

    if (updated.affectedRows === 0) {
      throwJsonError("400", `Se produjo un error...`);
    } else {
      res.status(201);
      res.send(`Archivo ${id} cargado correctamente`);
    }
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = updateFile;
