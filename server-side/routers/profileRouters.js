const router = require("express").Router();
const { profileControllers } = require("../controllers");
const auth = require("../middleware/auth");

router.patch("/edit/:id", auth.verifyToken, profileControllers.updateProfile);
router.get("/:id", auth.verifyToken, profileControllers.fetchProfile);
router.get("/picture/:user_id", profileControllers.fetchProfPic);

module.exports = router;
