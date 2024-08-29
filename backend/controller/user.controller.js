const User = require("../models/user.model");
const ApiFeatures = require("../utils/apiFeatures");
const sendEmail = require("../utils/sendEmail");
const sendToken = require("../utils/sendToken");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// const createUser = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const isemail = await User.findOne({ email });

//     if (isemail) {
//       return res.status(401).json({
//         success: false,
//         message: "Email is already in use",
//       });
//     }

//     const user = await User.create(req.body);
//     return res.status(200).json({
//       success: true,
//       message: "User created successfully",
//       data: user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "An error occurred while creating the user",
//       error: error.message,
//     });
//   }
// };

const createUser = async (req, res) => {
  try {
    const user = await User.create({ ...req.body, image: req.files });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the user",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      next: true,
    });
    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
const getAllUser = async (req, res) => {
  try {
    const resultPerPage = req.query.resultPerPage || 10;

    const countPage = await User.countDocuments();

    let pageCount = Math.ceil(countPage / resultPerPage);
    const apiFeatures = new ApiFeatures(User.find({}), req.query)
      .reverse()
      .pagination(resultPerPage);

    const result = await apiFeatures.query;

    if (result?.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    if (apiFeatures.getCurrentPage() > pageCount) {
      apiFeatures.setCurrentPage(pageCount);
      const updatedResult = await apiFeatures.pagination(resultPerPage).query;
      return res.status(200).json({
        success: true,
        result: updatedResult,
        pageCount: pageCount,
      });
    }
    return res.status(200).json({
      success: true,
      result: result,
      pageCount: pageCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "user deleted successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "user find successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "invalid creadential",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "invalid creadential",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user find successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
const otpGenerate = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "invalid credentials",
        data: user,
      });
    }
    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpireAt = Date.now();
    await user.save();
    await sendEmail({
      email: user.email,
      subject: `Otp creation`,
      message: `your otp code is:-${user.otp} .`,
    });
    return res.status(200).json({
      success: true,
      message: "otp generate successfully",
      status: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findOne({ otp });
    if (!user) {
      return res.status(401).json({
        message: "invalid details",
      });
    }
    // if (user.otp === otp) {
    const current = Date.now();
    const expires = new Date(user.otpExpireAt).getTime();
    const differnece = (current - expires) / 60000;
    if (differnece > 1) {
      return res.status(401).json({
        message: "otp is expired",
      });
      ``;
    }
    await sendToken(user, 200, res);
    // }
    // return res.status(401).json({
    //   message: "otp is invalid",
    // });
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isOldPassword = await user.comparePassword(oldPassword);

    if (!isOldPassword) {
      return res.status(404).json({
        success: "false",
        message: "old password is not matched",
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
const newPassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: "false",
        message: "invalid credential",
      });
    }
    // this is commented code

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "user password updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const isemailVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email",
      });
    }
    const refreshToken = await jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    const isRefreshTokenCreatedAt = new Date();
    user.refreshToken = refreshToken;
    user.isRefreshTokenCreatedAt = isRefreshTokenCreatedAt;

    await user.save();

    await sendEmail({
      email: user.email,
      subject: `Otp creation`,
      message: `your Reset Password Token is:-${`http://localhost:5173/reset/${user.refreshToken}`} .`,
    });
    return res.status(200).json({
      success: true,
      message: "user verified successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const user = await User.findOne({ refreshToken: req.params.refreshToken });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (user) {
      const current = Date.now();
      const expires = new Date(user.isRefreshTokenCreatedAt).getTime();
      const differnece = (current - expires) / 60000;
      if (differnece > 1) {
        return res.status(404).json({
          success: false,
          message: "your token has been expired please try again",
        });
      }
      user.password = newPassword;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
        status: 200,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUser,
  loginUser,
  otpGenerate,
  verifyOtp,
  updatePassword,
  resetPassword,
  newPassword,
  isemailVerify,
};
