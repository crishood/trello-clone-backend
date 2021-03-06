const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });
const {
  transporter,
  welcome,
  mailChangePassword,
  mailRecoveredPassword,
} = require("../utils/mailer");

module.exports = {
  async register(req, res) {
    try {
      const { email, password, name, nickname } = req.body;
      const encPassword = await bcrypt.hash(
        password,
        Number(process.env.RENNALLA)
      );
      const user = await User.create({
        name,
        nickname,
        email,
        password: encPassword,
        premium: false,
        picture:
          "https://res.cloudinary.com/clontrello/image/upload/v1654708527/samples/animals/reindeer.jpg",
      });

      const token = jwt.sign({ id: user._id }, process.env.ORION, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User created",
        data: {
          token,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
          picture: user.picture,
          premium: user.premium,
        },
      });

      await transporter.sendMail(welcome(user));
    } catch (err) {
      res.status(400).json({ message: "User could not be registered" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User or password not valid");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("User or password not valid !");
      }
      const token = jwt.sign({ id: user._id }, process.env.ORION, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User logged",
        data: {
          token,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
          picture: user.picture,
          premium: user.premium,
        },
      });
    } catch (err) {
      res.status(400).json({ message: `User could not login: error: ${err}` });
    }
  },

  async list(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ message: "Users found", data: users });
    } catch (err) {
      res.status(404).json({ message: "Users not found" });
    }
  },

  async show(req, res) {
    try {
      const userId = req.user;
      const user = await User.findById(userId).populate("boards", "name");
      res.status(200).json({ message: "User found", data: user });
    } catch (err) {
      res.status(404).json({ message: "User not found" });
    }
  },

  async update(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.status(200).json({ message: "User update" });
    } catch (err) {
      res.status(400).json({ message: "User could not be updated", data: err });
    }
  },

  async changepassword(req, res) {
    try {
      const { actualPassword, newPassword } = req.body;
      const userId = req.user;
      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      const isValid = await bcrypt.compare(actualPassword, user.password);
      if (!isValid) {
        res.status(403).json({ message: "Password do not match" });
      }
      const newEncPassword = await bcrypt.hash(newPassword, 8);
      user.password = newEncPassword;
      await user.save({ validateBeforeSave: false });
      res.status(200).json({ message: "Password update", user });

      await transporter.sendMail(mailChangePassword(user));
    } catch (err) {
      res
        .status(400)
        .json({ message: "Password could not be updated", data: err });
    }
  },

  async getemail(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      const token = jwt.sign({ id: user._id }, process.env.ORION, {
        expiresIn: 60 * 5,
      });

      await transporter.sendMail(mailRecoveredPassword(user, token));

      res.status(200).json({ message: "Email send", user });
    } catch (err) {
      res.status(400).json({ message: "Email could not be send", data: err });
    }
  },

  async recoveredpassword(req, res) {
    try {
      const { email, newPassword } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      const newEncPassword = await bcrypt.hash(newPassword, 8);
      user.password = newEncPassword;
      await user.save({ validateBeforeSave: false });

      res.status(201).json({ message: "Password changed successfully", user });

      await transporter.sendMail(mailChangePassword(user));
    } catch (err) {
      res
        .status(400)
        .json({ message: "Password could not be changed", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User destroyed", data: user });
    } catch (err) {
      res
        .status(400)
        .json({ message: "User could not be destroyed", data: err });
    }
  },
};
