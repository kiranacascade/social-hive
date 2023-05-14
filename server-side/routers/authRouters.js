const router = require("express").Router();
const { authControllers } = require("../controllers");
const { verifyToken, verification } = require("../middleware/auth");

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/verification", verifyToken, authControllers.verification);

module.exports = router;
