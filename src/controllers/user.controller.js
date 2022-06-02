const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try{
        const { email, password, name, nickname } = req.body;
        const encPassword = await bcrypt.hash(password, 8);
        const user = await User.create({email, password: encPassword, name, nickname});
        const token = jwt.sign({ id: user._id }, "tr3110", {expiresIn: 60 * 60 * 24});
        res.status(200).json({ token , message: "User created"});
    }catch(err){
      res.status(400).json({message: "User could not be registered"});
    }
  },

  async login(req, res) {
    try{
      const { email, password } = req.body;
      const user = await User.findOne({email});
      if(!user){
        throw new Error("User or password not valid");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if(!isValid){
        throw new Error("User or password not valid");
      }
      const token = jwt.sign({ id: user._id }, "tr3110", {expiresIn: 60 * 60 * 24});
      res.status(200).json({ token , message: "User logged"});
    }catch(err){
      res.status(400).json({message: "User could not login"});
    }

  },

  list(req, res) {
    User.find()
      .then((users) => {
        res.status(200).json({ message: "Users found", data: users });
      })
      .catch((err) => {
        res.status(404).json({ message: "Users not found" });
      });
  },

  show(req, res) {
    const { userId } = req.params;

    User.findById(userId)
      .populate("boards","name")
      .then((user) => {
        res.status(200).json({ message: "User found", data: user });
      })
      .catch((err) => {
        res.status(404).json({ message: "User not found" });
      });
  },

  create(req, res) {
    const data = req.body;
    const newUser = {
      ...data,
    };

    User.create(newUser)
      .then((user) => {
        res.status(201).json({ message: "User created", data: user });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "User could not be created", data: err });
      });
  },

  update(req, res) {
    const { userId } = req.params;

    User.findByIdAndUpdate(userId, req.body, { new: true })
      .then((user) => {
        res.status(200).json({ message: "User updated", data: user });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "User could not be updated", data: err });
      });
  },

  destroy(req, res) {
    const { userId } = req.params;

    User.findByIdAndDelete(userId)
      .then((user) => {
        res.status(200).json({ message: "User destroyed", data: user});
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "User could not be destroyed", data: err });
      });
  },

};
