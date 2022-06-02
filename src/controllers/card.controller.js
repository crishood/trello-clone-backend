const Card = require("../models/card.model");
const List = require("../models/list.model");

module.exports = {
  list(req, res) {
    Card.find()
      .then((cards) => {
        res.status(200).json({ message: "Cards found", data: cards });
      })
      .catch((err) => {
        res.status(404).json({ message: "Cards not found" });
      });
  },

  show(req, res) {
    const { cardId } = req.params;

    Card.findById(cardId)
      .populate("currentList","name")
      .populate("tags","name")
      .then((card) => {
        res.status(200).json({ message: "Card found", data: card });
      })
      .catch((err) => {
        res.status(404).json({ message: "Card not found" });
      });
  },

  async create(req, res) {
    try{
      const { currentListId } = req.params;
      const list = await List.findById(currentListId);
      if(!list){
        throw new Error("List not found");
      }
      const card = await Card.create({ ...req.body, list: currentListId });
      list.cards.push(card);
      await list.save({validateBeforeSave: false});
      res.status(201).json({ message: "Card created", data: card });
    }catch(err){
      res
      .status(400)
      .json({ message: "Card could not be created", data: err });
    } 
  },

  async update(req, res) {
    // const { cardId, previousListId, currentListId } = req.body;
    // const previousList = await List.findById(previousListId)
    // const currentList = await List.findById(currentListId)
    // const previousUpdated =  previusList.cards.filter((item) => item._id ==! cardId);
    // previousList.cards = previousUpdated;
    // currentList.cards.push(cardId)
    // await previousList.save({ validateBeforeSave: false })
    // await currentList.save({ validateBeforeSave: false })

    try{
      const { cardId } = req.params;
      const { nextListId, currentListId } = req.body;
      const nextList = await List.findById(nextListId);
      const currentList = await List.findById(currentListId);
      const currentUpdated =  currentList.cards.filter((item) => item._id ==! cardId);
      currentList.cards = currentUpdated;
      nextList.cards.push(cardId);
      await currentList.save({validateBeforeSave:false});
      await nextList.save({validateBeforeSave:false});
      const card = await Card.findByIdAndUpdate(cardId, req.body, { new: true });
      res.status(200).json({ message: "Card updated", data: card});


    }catch(err){
      res
          .status(400)
          .json({ message: "Card could not be updated", data: err });
    }

  },

  destroy(req, res) {
    const { cardId } = req.params;

    Card.findByIdAndDelete(cardId)
      .then((card) => {
        res.status(200).json({ message: "Card destroyed", data: card });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Card could not be destroyed", data: err });
      });
  },
};
