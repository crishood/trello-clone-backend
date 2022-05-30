const express = require("express");
const cors = require("cors");
const { connect } = require("./src/db");
const userRouter = require("./src/routes/user");
const boardRouter = require("./src/routes/board");

const port = 8080;
const app = express();
connect();


app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/boards", boardRouter);

app.listen(port, ()=>{
    console.log("Estamos al aire");
})
