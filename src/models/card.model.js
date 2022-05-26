const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
    {
      name: String,
      description: String,
      date: Date,
      members: [String]
    },
    {
      timestamps: true,
    }
  );
  
  //Recibe dos argumentos
  //-- String con el nombre del model
  //-- Schema que creamos arriba
  
  const Card = model("Card", cardSchema);
  
  module.exports = Card;