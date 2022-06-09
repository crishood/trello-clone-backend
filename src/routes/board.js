const router = require("express").Router();
const boardController = require("../controllers/board.controller");
const { auth } = require("../utils/auth");

router.route("/").get(auth, boardController.list);
router.route("/:boardId").get(boardController.show);
router.route("/").post(auth, boardController.create);
router.route("/:boardId").put(boardController.update);
router.route("/:boardId").delete(boardController.destroy);

module.exports = router;
