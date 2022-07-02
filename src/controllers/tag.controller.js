const Tag = require("../models/tag.model");
const Board = require("../models/board.model");
const Card = require("../models/card.model");

module.exports = {
  async list(req, res) {
    try {
      const { cardId } = req.params;
      const tags = await Tag.find({ card: cardId });
      res.status(200).json({ message: "Tags found", data: tags });
    } catch (err) {
      res.status(404).json({ message: "Tags not found" });
    }
  },

  async show(req, res) {
    try {
      const { tagId } = req.params;
      const tag = await Tag.findById(tagId).populate("cards", "name");
      res.status(200).json({ message: "Tag found", data: tag });
    } catch (err) {
      res.status(404).json({ message: "Tags not found" });
    }
  },

  async create(req, res) {
    try {
      const { cardId } = req.params;
      const card = await Card.findById(cardId);
      if (!card) {
        throw new Error("Board or card not found");
      }
      const tag = await Tag.create({
        ...req.body,
        card: cardId,
      });
      card.tags.push(tag);
      await card.save({ validateBeforeSave: false });
      res.status(201).json({ message: "Tag created", data: tag });
    } catch (err) {
      res.status(400).json({ message: "Tag could not be created", data: err });
    }
  },

  async update(req, res) {
    try {
      const { tagId } = req.params;
      const tag = await Tag.findByIdAndUpdate(tagId, req.body, { new: true });
      res.status(200).json({ message: "Tag updated", data: tag });
    } catch (err) {
      res.status(400).json({ message: "Tag could not be updated", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { tagId } = req.params;
      const tag = await Tag.findByIdAndDelete(tagId);
      res.status(200).json({ message: "Tag destroyed", data: tag });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Tag could not be destroyed", data: err });
    }
  },
};
