const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

exports.checkJWT = (token = "") => {
  try {
    const { id } = jwt.verify(token, process.env.ORION);
    return [true, id];
  } catch (error) {
    return [false, null];
  }
};
