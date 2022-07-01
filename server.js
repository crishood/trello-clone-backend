const express = require("express");
const cors = require("cors");
const { connect } = require("./src/db");
const userRouter = require("./src/routes/user");
const boardRouter = require("./src/routes/board");
const cardRouter = require("./src/routes/card");
const listRouter = require("./src/routes/list");
const Socket = require("./src/models/socket.model");
const http = require("http");
const SocketIO = require("socket.io");
const tagRouter = require("./src/routes/tag");
const { auth } = require("./src/utils/auth");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.js");
require("dotenv").config({ path: "./.env" });
const { transporter, verify } = require("./src/utils/mailer");

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = SocketIO(server, {});
connect();
verify(transporter);

app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/cards", cardRouter);
app.use("/lists", listRouter);
app.use("/tags", tagRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

Socket(io);

server.listen(port, () => {
  console.log("Estamos al aire");
});
