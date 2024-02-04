const mongoose = require("mongoose");

// define schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "CREATOR"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema, "users");

module.exports = UserModel;
