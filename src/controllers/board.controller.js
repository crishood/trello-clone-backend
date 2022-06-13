const Board = require("../models/board.model");
const User = require("../models/user.model");
const List = require("../models/list.model");

module.exports = {
  async list(req, res) {
    try {
      const boards = await Board.find();
      res.status(200).json({ message: "Boards found", data: boards });
    } catch (err) {
      res.status(404).json({ message: "Boards not found" });
    }
  },

  async show(req, res) {
    try {
      const { boardId } = req.params;
      const board = await Board.findById(boardId)
        .populate("user", "nickname email")
        .populate("lists", "name")
        .populate("tags", "name");
      res.status(200).json({ message: "board found", data: board });
    } catch (err) {
      res.status(404).json({ message: "board not found" });
    }
  },

  async create(req, res) {
    try {
      const userId = req.user;
      const board = await Board.create({ ...req.body, user: userId });
      const user = await User.findById(userId);
      user.boards.push(board);
      user.save({ validateBeforeSave: false });
      res.status(201).json({ message: "board created", data: board });
    } catch (err) {
      res
        .status(400)
        .json({ message: "board could not be created", data: err });
    }
  },

  async update(req, res) {
    try {
      const { boardId } = req.params;
      const board = await Board.findByIdAndUpdate(boardId, req.body, {
        new: true,
      });
      res.status(200).json({ message: "board updated", data: board });
    } catch (err) {
      res
        .status(400)
        .json({ message: "board could not be updated", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { boardId } = req.params;
      const board = await Board.findByIdAndDelete(boardId);
      res.status(200).json({ message: "board destroyed", data: board });
    } catch (err) {
      res
        .status(400)
        .json({ message: "board could not be destroyed", data: err });
    }
  },
};
