const Card = require("../models/card.model");

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
      .then((card) => {
        res.status(200).json({ message: "Card found", data: card });
      })
      .catch((err) => {
        res.status(404).json({ message: "Card not found" });
      });
  },

  create(req, res) {
    const data = req.body;
    const newCard = {
      ...data,
    };

    Card.create(newCard)
      .then((card) => {
        res.status(201).json({ message: "Card created", data: card });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Card could not be created", data: err });
      });
  },

  update(req, res) {
    const { cardId } = req.params;

    Card.findByIdAndUpdate(cardId, req.body, { new: true })
      .then((card) => {
        res.status(200).json({ message: "Card updated", data: card });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ message: "Card could not be updated", data: err });
      });
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
