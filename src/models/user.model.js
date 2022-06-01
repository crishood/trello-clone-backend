const { Schema, model, models } = require("mongoose");
const nameRegex = new RegExp("[a-zA-Z]");
const nickNameRegex = new RegExp("[a-zA-Z0-9]");
const emailRegex = new RegExp(
  "[a-zA-Z0-9!#$%&'*_+-]([.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$/()=?¿!.,:;]|d)+[a-zA-Z0-9][.][a-zA-Z]{2,4}([.][a-zA-Z]{2})?"
);
const passwordRegex = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: [nameRegex, "Invalid name"],
      maxlength: [15, "Name must have less than 15 characters"],
    },
    nickname: {
      type: String,
      required: true,
      match: [nickNameRegex, "Invalid nickname"],
      maxlength: [10, "Name must have less than 10 characters"],
    },
    email: {
      type: String,
      required: true,
      match: [emailRegex, "Invalid email"],
      validate: [
        {
          validator(value) {
            return models.User.findOne({ email: value })
              .then((user) => !user )
              .catch(() => false );
          },
          message: "This email already exists",
        },
      ],
    },
    password: {
      type: String,
      required: true,
      match: [passwordRegex, "Invalid password"],
    },
    boards: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref:"Board"
        }
      ]
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
