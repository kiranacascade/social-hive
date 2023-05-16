const express = require("express");
const dotenv = require("dotenv");
const app = express();
const db = require("./models");
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is my API");
});

const { authRouters, postRouters, commentRouters, likeRouters, profileRouters } = require("./routers");
app.use("/auth", authRouters);
app.use("/post", postRouters);
app.use("/comment", commentRouters);
app.use("/like", likeRouters);
app.use("/profile", profileRouters);

app.get("/posts/:name", (req, res) => {
  const path = __dirname + "/public/posts/" + req.params.name;
  res.sendFile(path);
});
app.get("/profiles/:name", (req, res) => {
  const path = __dirname + "/public/profiles/" + req.params.name;
  res.sendFile(path);
});

app.listen(process.env.PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log(`Server is running at port : ${process.env.PORT}`);
});
