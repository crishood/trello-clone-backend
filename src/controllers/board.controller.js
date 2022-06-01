const Board = require("../models/board.model");
const User = require("../models/user.model");
const List = require("../models/list.model");

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
      .populate({
          path: "user",
          select: "nickname email"
        })
      .populate({
          path: "list",
          select: "name"
        })
      .then((board) => {
        res.status(200).json({ message: "board found", data: board });
      })
      .catch((err) => {
        res.status(404).json({ message: "board not found" });
      });
  },

  create(req, res) {
    const {userId} = req.params;
    Board.create(
        {...req.body,
        user: userId}
    ).then((board)=>{
        User.findById(userId).then((user)=>{
            user.boards.push(board),
            user.save({validateBeforeSave: false})
            .then(()=>{
                res.status(201).json({message: "board created", data: board})
            })
        })
    }).catch((err)=>{
        res
           .status(400)
           .json({message: "board could not be created", data: err });
    })
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
