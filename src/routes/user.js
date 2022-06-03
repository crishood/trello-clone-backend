const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.route("/").get(userController.list);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/:userId").get(userController.show);
router.route("/:userId").put(userController.update);
router.route("/:userId").delete(userController.destroy);
module.exports = router;
