const router = require("express").Router();
const cardController = require("../controllers/card.controller");

router.route("/").get(cardController.list);
router.route("/:cardId").get(cardController.show);
router.route("/:listId").post(cardController.create);
router.route("/:cardId").put(cardController.update);
router.route("/:cardId").delete(cardController.destroy);

module.exports = router;
