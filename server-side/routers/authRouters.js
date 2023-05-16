const router = require("express").Router();
const { authControllers } = require("../controllers");
const { verifyToken, verification } = require("../middleware/auth");
const { body } = require("express-validator");

router.post("/register", body("email").isEmail(), authControllers.register);
router.post("/login", authControllers.login);
router.post("/verification", verifyToken, authControllers.verification);

module.exports = router;
