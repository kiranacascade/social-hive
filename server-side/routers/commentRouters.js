const router = require("express").Router();
const { commentControllers } = require("../controllers");
const auth = require("../middleware/auth");

router.get("/fetch/:id", auth.verifyToken, commentControllers.fetchAllCommentsFromPost);
router.post("/comment/:id", auth.verifyToken, commentControllers.commentPost);

module.exports = router;
