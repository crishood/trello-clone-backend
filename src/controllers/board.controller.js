const Board = require("../models/board.model");

module.exports = {

  list(req, res) {
    Board.find()
      .then((boards) => {
        res.status(200).json({ message: "Boards found", data: boards });
      })
      .catch((err) => {
        res.status(404).json({ message: "Boards not found" });
      });
  },

  show(req, res) {
    const { boardId } = req.params;

    Board.findById(boardId)
      .then((user) => {
        res.status(200).json({ message: "board found", data: board });
      })
      .catch((err) => {
        res.status(404).json({ message: "board not found" });
      });
  },

  create(req, res) {
    const data = req.body;
    const newBoard = {
      ...data,
    };

    Board.create(newBoard)
      .then((board) => {
        res.status(201).json({ message: "board created", data: board });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Board could not be created", data: err });
      });
  },

  update(req, res) {
    const { boardId } = req.params;

    Board.findByIdAndUpdate(boardId, req.body, { new: true })
      .then((board) => {
        res.status(200).json({ message: "board updated", data: board });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "board could not be updated", data: err });
      });
  },

  destroy(req, res) {
    const { boardId } = req.params;

    Board.findByIdAndDelete(boardId)
      .then((board) => {
        res.status(200).json({ message: "board destroyed", data: board});
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "board could not be destroyed", data: err });
      });
  },

};
