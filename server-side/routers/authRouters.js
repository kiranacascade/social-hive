const router = require("express").Router();
const { authControllers } = require("../controllers");
const { verifyToken, verification, onLoggedIn } = require("../middleware/auth");
const { body } = require("express-validator");

router.post("/register", body("email").isEmail(), onLoggedIn, authControllers.register);
router.post("/login", onLoggedIn, authControllers.login);
router.post("/verification", verifyToken, authControllers.verification);

module.exports = router;
