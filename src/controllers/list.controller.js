const List = require("../models/list.model");
const Board = require("../models/board.model");

module.exports = {
  list(req, res) {
    List.find()
      .then((lists) => {
        res.status(200).json({ message: "Lists found", data: lists });
      })
      .catch((err) => {
        res.status(404).json({ message: "Lists not found" });
      });
  },

  show(req, res) {
    const { listId } = req.params;

    List.findById(listId)
      .populate({
        path: "board",
        select: "name"
      })
      .populate("cards","name")
      .then((list) => {
        res.status(200).json({ message: "Lists found", data: list });
      })
      .catch((err) => {
        res.status(404).json({ message: "Lists not found" });
      });
  },

  async create(req, res) {
    try{
      const {boardId} = req.params;
      const board = await Board.findById(boardId);
      if(!board){
        throw new Error("Board not found");
      }
      const list = await List.create({...req.body, board: boardId});
      board.lists.push(list);
      await board.save({validateBeforeSave: false})
      res.status(201).json({ message: "List created", data: list });
    }catch(err){
      res
      .status(400)
      .json({ message: "List could not be created", data: err });
    }

    // const data = req.body;
    // const newList = {
    //   ...data,
    // };
    // List.create(newList)
    //   .then((list) => {
    //     res.status(201).json({ message: "List created", data: list });
    //   })
    //   .catch((err) => {
    //     res
    //       .status(400)
    //       .json({ message: "List could not be created", data: err });
    //   });
  },

  update(req, res) {
    const { listId } = req.params;

    List.findByIdAndUpdate(listId, req.body, { new: true })
      .then((list) => {
        res.status(200).json({ message: "List updated", data: list });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "List could not be updated", data: err });
      });
  },

  destroy(req, res) {
    const { listId } = req.params;

    List.findByIdAndDelete(listId)
      .then((list) => {
        res.status(200).json({ message: "List destroyed", data: list });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "List could not be destroyed", data: err });
      });
  },
};
