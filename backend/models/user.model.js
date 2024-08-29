const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = new mongoose.Schema(
  {
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    // password: {
    //   type: String,
    //   required: true,
    // },
    // otp: {
    //   type: String,
    // },
    // otpExpireAt: {
    //   type: Date,
    // },
    // refreshToken: {
    //   type: String,
    // },
    // isRefreshTokenCreatedAt: {
    //   type: Date,
    // },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    desc: {
      type: String,
    },
    data: {
      type: String,
    },
    image: [],
  },
  { timestamps: true }
);
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// userSchema.methods.getToken = async function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model("userDatabase", userSchema);
