const router = require("express").Router();
const { likeControllers } = require("../controllers");
const auth = require("../middleware/auth");

router.post("/like/:id", auth.verifyToken, likeControllers.likePost);
router.delete("/unlike/:id", auth.verifyToken, likeControllers.unlikePost);

module.exports = router;
