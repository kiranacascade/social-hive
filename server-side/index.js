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

const { authRouter } = require("./routers");
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  // db.sequelize.sync({ alter: true });
  console.log(`Server is running at port : ${process.env.PORT}`);
});
