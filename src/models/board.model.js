const { Schema, model } = require("mongoose");
const lettersRegex = new RegExp("[a-zA-Z]");

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
      match: [lettersRegex, "Invalid characters"],
    },
    marked: {
      type: Boolean,
      required: true,
    },
    closed: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "List",
        },
      ],
    },
    tags: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Tag",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Board = model("Board", boardSchema);

module.exports = Board;
