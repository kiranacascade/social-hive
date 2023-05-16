const db = require("../models");
const comment = db.Comment;
const post = db.Post;

module.exports = {
  commentPost: async (req, res) => {
    try {
      const existingPost = await post.findOne({
        where: {
          id: req.params.id,
          is_active: 1,
        },
      });

      if (!existingPost) {
        return res.status(404).send({
          message: "Post not found",
        });
      }

      const { comment_text } = req.body;

      const result = await comment.create({
        post_id: req.params.id,
        user_id: req.user.id,
        comment_text: comment_text,
      });

      res.status(200).send({
        message: "Post successfully commented",
        result,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        message: "Error commenting post",
      });
    }
  },
  fetchAllCommentsFromPost: async (req, res) => {
    try {
      const query = `SELECT comments.id AS comment_id, comments.comment_text, comments.createdAt as comment_date,
        comments.post_id,  users.id as user_id, users.username
        FROM comments
        INNER JOIN users ON comments.user_id = users.id
        WHERE comments.post_id = ${req.params.id};
        `;
      const [results] = await db.sequelize.query(query);

      res.status(200).json({
        message: "Successfully retrieved all comment(s) ",
        results,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        message: "Error fetching comments",
      });
    }
  },
};
