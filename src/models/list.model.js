const { Schema, model } = require("mongoose");
const lettersRegex = new RegExp("[a-zA-Z]");

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
      match: [lettersRegex, "Invalid characters"]
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true
    }

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
