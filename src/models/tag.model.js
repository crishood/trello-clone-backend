const { Schema, model } = require("mongoose");
const lettersRegex = new RegExp("[a-zA-Z]");

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 10,
      match: [lettersRegex, "Invalid characters"],
    },
    color: {
      type: String,
      required: true,
    },
    card: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = model("Tag", tagSchema);

module.exports = Tag;
