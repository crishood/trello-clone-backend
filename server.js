const express = require("express");
const cors = require("cors");
const { connect } = require("./src/db");
const userRouter = require("./src/routes/user");
const boardRouter = require("./src/routes/board");
const cardRouter = require("./src/routes/card");
const listRouter = require("./src/routes/list");
const tagRouter = require("./src/routes/tag");
const { auth } = require("./src/utils/auth");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.js");
require("dotenv").config();


const port = process.env.port;


const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/cards", cardRouter);
app.use("/lists", listRouter);
app.use("/tags", tagRouter);
app.get("/", auth, (req, res) => {
  console.log(req.user);
  res.sendStatus(200);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log("Estamos al aire");
});
