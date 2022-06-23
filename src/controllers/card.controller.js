const Card = require("../models/card.model");
const List = require("../models/list.model");

module.exports = {
  async list(req, res) {
    try {
      const cards = await Card.find();
      res.status(200).json({ message: "Cards found", data: cards });
    } catch (err) {
      res.status(404).json({ message: "Cards not found" });
    }
  },

  async show(req, res) {
    try {
      const { cardId } = req.params;
      const card = await Card.findById(cardId).populate("tags");
      res.status(200).json({ message: "Card found", data: card });
    } catch (err) {
      res.status(404).json({ message: "Card not found" });
    }
  },

  async create(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findById(listId);
      if (!list) {
        throw new Error("List not found");
      }
      const card = await Card.create({ ...req.body, list: listId });
      list.cards.push(card);
      await list.save({ validateBeforeSave: false });
      res.status(201).json({ message: "Card created", data: card });
    } catch (err) {
      res.status(400).json({ message: "Card failed", data: err });
    }
  },

  async update(req, res) {
    try {
      const { cardId } = req.params;
      const card = await Card.findByIdAndUpdate(cardId, req.body, {
        new: true,
      });
      res.status(200).json({ message: "Card updated", data: card });
    } catch (err) {
      res.status(400).json({ message: "Card could not be updated", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { cardId } = req.params;
      const card = Card.findByIdAndDelete(cardId);
      res.status(200).json({ message: "Card destroyed", data: card });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Card could not be destroyed", data: err });
    }
  },
};
