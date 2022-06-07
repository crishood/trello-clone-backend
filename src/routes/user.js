const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { auth } = require("../utils/auth");

router.route("/").get(userController.list);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/").get(auth, userController.show);
router.route("/").put(auth, userController.update);
router.route("/").delete(auth, userController.destroy);
module.exports = router;
