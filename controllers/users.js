const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.find();
    if (users.length == 0) {
      res.status(404).json({ message: "No Users Found!" });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const newUserBody = req.body;
  try {
    const newUser = await usersModel.create(newUserBody);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password is required" });
    }

    // check if email is correct
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "invalid email or password!!" });
    }

    // check if password is correct
    let isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "invalid email or password!!" });
    }

    // generate token
    let token = jwt.sign(
        { data: { email: user.email, id: user._id } },
        "hello im a secret string",
        {expiresIn:"1h"}
    );

    res.status(200).json({message: "logged successfully", token: token});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllUsers, createUser, login };
