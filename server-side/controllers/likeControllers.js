const db = require("../models");
const like = db.Like;
const post = db.Post;

module.exports = {
  likePost: async (req, res) => {
    try {
      const existingPost = await post.findOne({
        where: {
          id: req.params.id,
          is_active: 1,
        },
      });

      if (!existingPost) {
        return res.status(404).json({
          message: "Post not found",
        });
      }

      // mengecek apakah user sudah like postnya
      const existingLike = await like.findOne({
        where: {
          post_id: req.params.id,
          user_id: req.user.id,
        },
      });

      if (existingLike) {
        return res.status(400).json({
          message: "You have already liked this post",
        });
      }

      // menambah likes ke database
      const result = await like.create({
        post_id: req.params.id,
        user_id: req.user.id,
      });

      res.status(200).json({
        message: "Successfully liked the post",
        result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error liking post",
      });
    }
  },
  unlikePost: async (req, res) => {
    try {
      await like.destroy({
        where: {
          post_id: req.params.id,
          user_id: req.user.id,
        },
      });

      res.status(200).send({
        status: true,
        message: "Successfully unlike the post",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
