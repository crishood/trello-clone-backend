const { Schema, model } = require("mongoose");

const listSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

//Recibe dos argumentos
//-- String con el nombre del model
//-- Schema que creamos arriba

const List = model("List", listSchema);

module.exports = List;
