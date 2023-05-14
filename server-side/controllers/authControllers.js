const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const dotenv = require("dotenv");
const user = db.User;
const profile = db.Profile;
const { Op } = require("sequelize");
const transporter = require("../helper/transporter");
const fs = require("fs");
const handlebars = require("handlebars");
dotenv.config();

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, passwordConfirmation } = req.body;

      console.log(req.body);

      if (!username || !email || !password || !passwordConfirmation) {
        return res.status(400).send({
          status: false,
          message: "Please complete your data",
        });
      }

      const isEmailExist = await user.findOne({
        where: {
          email,
        },
      });

      if (isEmailExist) {
        return res.status(400).send({
          status: false,
          message: "Email has been used",
        });
      }

      const isUsernameExist = await user.findOne({
        where: {
          username,
        },
      });

      if (isUsernameExist) {
        return res.status(400).send({
          status: false,
          message: "Username has been used",
        });
      }

      if (password !== passwordConfirmation) {
        {
          return res.status(400).send({
            status: false,
            message: "Password doesn't match",
          });
        }
      }

      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).send({
          status: false,
          message: "Password must contain at least 8 characters including an uppercase letter, a symbol, and a number",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const data = await user.create({
        username,
        email,
        password: hashPass,
      });

      await profile.create({
        user_id: data.id,
      });

      const payload = { id: data.id };
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "5h" });

      const verificationLink = `http://localhost:3000/verification/${token}`;

      const tempEmail = fs.readFileSync("./template/email.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({ username, verificationLink });

      await transporter.sendMail(
        {
          from: `SocialHive <${process.env.NODEMAILER_USER}>`,
          to: email,
          subject: "Verify Your Account",
          html: tempResult,
        },
        (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        }
      );

      res.status(200).send({
        status: true,
        message: "Register success. Please click on the link that has just been sent to your email address to verify your account!",
        data: data,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  login: async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;

      if (!emailOrUsername || !password) {
        return res.status(400).send({
          status: false,
          message: "Please complete your data",
        });
      }

      const userExist = await user.findOne({
        where: {
          [Op.or]: [
            {
              username: emailOrUsername,
            },
            {
              email: emailOrUsername,
            },
          ],
        },
      });

      if (!userExist) {
        return res.status(400).send({
          status: false,
          message: "User not found",
        });
      }

      if (!userExist.is_verified) {
        return res.status(400).send({
          status: false,
          message: "Please verify your account",
        });
      }

      //mengcompare password yang diinput dengan password yang ada di database
      const isvalid = await bcrypt.compare(password, userExist.password);

      if (!isvalid) {
        return res.status(400).send({
          status: false,
          message: "Wrong password",
        });
      }

      const payload = { id: userExist.id, is_verified: userExist.is_verified };
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

      res.status(200).send({
        status: true,
        message: "login success",
        data: userExist,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  verification: async (req, res) => {
    try {
      // const id = req.user.id;
      const userExist = await user.findOne({
        where: {
          id: req.user.id,
        },
      });

      await user.update(
        { is_verified: true },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).send({
        status: true,
        message: "Your account is verified",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
