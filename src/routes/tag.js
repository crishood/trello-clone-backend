const router = require("express").Router();
const tagController = require("../controllers/tag.controller");

router.route("/:cardId").get(tagController.list);
router.route("/:tagId").get(tagController.show);
router.route("/:cardId").post(tagController.create);
router.route("/:tagId").put(tagController.update);
router.route("/:tagId").delete(tagController.destroy);

module.exports = router;
