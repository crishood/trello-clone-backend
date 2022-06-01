const { Schema, model } = require("mongoose");
const lettersRegex = new RegExp("[a-zA-Z]");

const boardSchema = new Schema(
    {
      name: {
            type: String,
            required: true,
            maxlength: 20,
            match: [lettersRegex, "Invalid characters"]
        },
      marked: Boolean,
      closed: Boolean,
      user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
      }
    },
    {
      timestamps: true,
    }
  );
  
  const Board = model("Board", boardSchema);
  
  module.exports = Board;