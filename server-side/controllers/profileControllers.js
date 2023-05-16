const db = require("../models");
const profile = db.Profile;
const multer = require("multer");
const path = require("path");

//setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profiles");
  },
  filename: function (req, file, cb) {
    cb(null, path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PNG, JPG, and JPEG allowed."));
    }
  },
}).single("profil_pic");

module.exports = {
  updateProfile: async (req, res) => {
    try {
      // upload image menggunakan multer
      upload(req, res, async (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            message: "Error uploading image",
          });
        }
        let imageUrl = req.protocol + "://" + req.get("host") + "/profiles/" + req.file.filename;
        const { full_name, bio } = req.body;

        const existingProfile = await profile.findOne({
          where: {
            user_id: req.user.id,
          },
        });

        const result = await profile.update(
          {
            profil_pic: imageUrl,
            full_name: full_name,
            bio: bio,
          },
          {
            where: {
              id: existingProfile.id,
            },
          }
        );

        res.status(200).json({
          message: "Successfully update profile ",
          result,
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error creating profile",
      });
    }
  },
  fetchProfile: async (req, res) => {
    try {
      const query = `SELECT profiles.id, profiles.full_name, profiles.bio, profiles.profil_pic, profiles.user_id, users.username, users.email from profiles
      JOIN users ON profiles.user_id = users.id
      where users.id = ${req.user.id};`;

      const [result] = await db.sequelize.query(query);

      res.status(200).send({
        status: true,
        message: "Successfully fetch profile",
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  fetchProfPic: async (req, res) => {
    try {
      const result = await profile.findOne({
        where: {
          user_id: req.params.user_id,
        },
      });
      // console.log(result);
      res.status(200).send(result.profil_pic);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
