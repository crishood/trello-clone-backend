const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const { email, password, name, nickname } = req.body;
      const encPassword = await bcrypt.hash(password, process.env.rennalla);
      const user = await User.create({
        email,
        password: encPassword,
        name,
        nickname,
      });
      const token = jwt.sign({ id: user._id }, process.env.orion, {
        expiresIn: process.env.timeExpires,
      });
      res.status(200).json({
        message: "User created",
        data: {
          token,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
        },
      });
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
      const token = jwt.sign({ id: user._id }, process.env.orion, {
        expiresIn: process.env.timeExpires,
      });
      res.status(200).json({
        message: "User logged",
        data: {
          token,
          name: user.name,
          nickname: user.nickname,
          email: user.email,
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
      const { userId } = req.params;
      const user = await User.findById(userId).populate("boards", "name");
      res.status(200).json({ message: "User found", data: user });
    } catch (err) {
      res.status(404).json({ message: "User not found" });
    }
  },

  async update(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
    } catch (err) {
      res.status(400).json({ message: "User could not be updated", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User destroyed", data: user });
    } catch (err) {
      res
        .status(400)
        .json({ message: "User could not be destroyed", data: err });
    }
  },
};
