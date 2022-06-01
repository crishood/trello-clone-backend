const Tag = require("../models/tag.model");
const Board = require("../models/board.model");
const Card = require("../models/card.model");


module.exports = {
    async list(req, res) {
        try{
            const tags = await Tag.find();
            res.status(200).json({ message: "Tags found", data: tags });
        }catch(err){
            res.status(404).json({ message: "Tags not found" });
        }
    },
  
    async show(req, res) {
        try{
            const { tagId } = req.params;
            const tag = await Tag.findById(tagId)
                .populate("board","name")
                .populate("cards", "name");
            res.status(200).json({ message: "Tag found", data: tag });    
        }catch(err){
            res.status(404).json({ message: "Tags not found" });
        }
    },
  
    async create(req, res) {
      try{
        const {boardId, cardId} = req.params;
        const board = await Board.findById(boardId);
        const card = await Card.findById(cardId);
        if(!board || !card){
          throw new Error("Board or card not found");
        }
        const tag = await Tag.create({...req.body, board: boardId, cards: cardId});
        board.tags.push(tag);
        card.tags.push(tag);
        await board.save({validateBeforeSave: false});
        await card.save({validateBeforeSave: false});
        res.status(201).json({ message: "Tag created", data: tag });
      }catch(err){
        res
        .status(400)
        .json({ message: "Tag could not be created", data: err });
      }

    },
  
    async update(req, res) {
        try{
            const {tagId} = req.params;
            const tag = await Tag.findByIdAndUpdate(tagId, req.body, { new: true });
            res.status(200).json({ message: "Tag updated", data: tag });
        }catch(err){
            res
            .status(400)
            .json({ message: "Tag could not be updated", data: err });
        }
    },
  
    async destroy(req, res) {
        try{
            const {tagId} = req.params;
            const tag = await Tag.findByIdAndDelete(tagId);
            res.status(200).json({ message: "Tag destroyed", data: tag });
        }catch(err){
            res
            .status(400)
            .json({ message: "List could not be destroyed", data: err });
        }
    },
  };
  