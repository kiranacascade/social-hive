const profile = db.Profile;

module.exports = {
  updateProfile: async (req, res) => {
    try {
      const { fullName, bio, username } = req.body;
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  getProfile: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
