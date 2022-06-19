const List = require("../models/list.model");
const Card = require("../models/card.model");
const Board = require("../models/board.model");

module.exports = {
  async list(req, res) {
    try {
      const { boardId } = req.params;
      const lists = await List.find({ board: boardId });

      res.status(200).json({ message: "Lists found", data: lists });
    } catch (err) {
      res.status(404).json({ message: "Lists not found" });
    }
  },

  async show(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findById(listId)
        .populate({
          path: "board",
          select: "name",
        })
        .populate("cards", "name");
      res.status(200).json({ message: "Lists found", data: list });
    } catch (err) {
      res.status(404).json({ message: "Lists not found" });
    }
  },

  async create(req, res) {
    try {
      const { boardId } = req.params;
      const board = await Board.findById(boardId);
      if (!board) {
        throw new Error("Board not found");
      }
      const list = await List.create({ ...req.body, board: boardId });
      board.lists.push(list);
      await board.save({ validateBeforeSave: false });
      res.status(201).json({ message: "List created", data: list });
    } catch (err) {
      res.status(400).json({ message: "List could not be created", data: err });
    }
  },

  async update(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findByIdAndUpdate(listId, req.body, {
        new: true,
      });
      res.status(201).json({ message: "List updated", data: list });
    } catch (err) {
      res.status(400).json({ message: "List could not be updated", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findByIdAndDelete(listId);
    } catch (err) {
      res
        .status(400)
        .json({ message: "List could not be destroyed", data: err });
    }
  },
};
