const { Schema, model } = require("mongoose");
const nameRegex = new RegExp("[a-zA-Z0-9]");
const descriptionRegex = new RegExp("[a-zA-Z0-9]");

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 15,
      match: [nameRegex, "Invalid characters"],
    },
    description: {
      type: String,
      required: false,
      maxlength: 120,
      match: [descriptionRegex, "Invalid characters"],
    },
    date: Date,
    members: [String],
  },
  {
    timestamps: true,
  }
);

const Card = model("Card", cardSchema);

module.exports = Card;
