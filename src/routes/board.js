const router = require("express").Router();
const boardController = require("../controllers/board.controller");

router.route("/").get(boardController.list);
router.route("/:boardId").get(boardController.show);
router.route("/").post(boardController.create);
router.route("/:boardId").put(boardController.update);
router.route("/:boardId").delete(boardController.destroy);

module.exports = router;
