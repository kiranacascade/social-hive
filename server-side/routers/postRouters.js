const router = require("express").Router();
const { postControllers } = require("../controllers");
const auth = require("../middleware/auth");

router.post("/create", auth.verifyToken, postControllers.createNewPost);
router.get("/get", auth.verifyToken, postControllers.fetchAllPosts);
router.get("/get/:id", auth.verifyToken, postControllers.fetchPostDetail);
router.delete("/delete/:id", auth.verifyToken, postControllers.deletePost);
router.patch("/edit/:id", auth.verifyToken, postControllers.editPost);

module.exports = router;
