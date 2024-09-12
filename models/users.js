const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [3, "name must be at least 3 characters"],
    maxlength: [30, "name must be at least 30 characters"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z]{3,8}@(gmail|yahoo|outlook)(.com)$/.test(value);
      },
      message: "Invalid email or password From validate",
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [8, "password must be at least 8 characters"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ],
  },
});

// middleware for hashing password 
userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(10);

  let passwordHashed = await bcrypt.hash(this.password, salt);
  this.password = passwordHashed;
  next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
