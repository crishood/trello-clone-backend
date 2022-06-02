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
    currentList: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: true
    },
    nextList:{
      type: Schema.Types.ObjectId,
      ref: "List",
    },
    tags: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Tag"
        }
      ]
    }
  },
  {
    timestamps: true,
  }
);

const Card = model("Card", cardSchema);

module.exports = Card;
