const express = require("express");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const cors = require("cors");
const { userRoutes } = require("./src/routes/userRoutes");
const { pointsRoutes } = require("./src/routes/pointsRoutes");
const { providersRoutes } = require("./src/routes/providersRoutes");
const { incomeRoutes } = require("./src/routes/incomeRoutes");

const app = express();
const multer = require("multer");
const mimeTypes = require("mime-types");
const newIncome = require("./src/controllers/incomes/newIncome");
const insertFile = require("./src/controllers/incomes/insertFile");
const updateFile = require("./src/controllers/incomes/updateFile");
const { expensesRoutes } = require("./src/routes/expensesRoutes");
app.use(express.json());
app.use(cors());

app.use(express.static("public"));
/* app.use(fileUpload()); */

/* const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb("", Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}); */

const { PORT } = process.env;

const port = PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

/* app.post("/files", upload.single("avatar"), updateFile); */

app.use("/users", userRoutes);
app.use("/pointsofsale", pointsRoutes);
app.use("/providers", providersRoutes);
app.use("/incomes", incomeRoutes);
app.use("/expenses", expensesRoutes);

app.use((req, res) =>
  res.status(404).send({
    status: "error",
    message: "Not Found",
  })
);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
