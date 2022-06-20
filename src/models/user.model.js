const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
      name: String,
      nickname: String,
      mail: String,
      password: String,
    },
    {
      timestamps: true,
    }
  );
  
  //Recibe dos argumentos
  //-- String con el nombre del model
  //-- Schema que creamos arriba
  
  const User = model("User", userSchema);
  
  module.exports = User;