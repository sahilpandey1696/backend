const express = require("express");
const {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  otpGenerate,
  verifyOtp,
  updatePassword,
  resetPassword,
  newPassword,
  isemailVerify,
} = require("../controller/user.controller");
// const { verifyToken } = require("../utils/verifyToken");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const imageUpload = multer({
  limits: 1000000000 * 2000000,
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, "../public/users"));
    },
    //   fileFilter(file, cb) {
    //     if (!file.originalname.match(/\.(jpg|jpeg|png|gif|eps|raw|cr2|nef|orf|sr2|bmp|tif|tiff)$/)) {
    //         return cb(new Error('Please upload a valid image file'))
    //     }
    //     cb(undefined, true)
    // },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

router.post("/create", imageUpload.array("image", 10), createUser);
router.get("/get-all", getAllUser);
router.get("/get/:id", getUser);
router.post("/otp", otpGenerate);
router.post("/reset/:refreshToken", resetPassword);
router.post("/new", newPassword);
router.post("/otp-verify", verifyOtp);
router.post("/login", loginUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.put("/update", updatePassword);
router.post("/verify-email", isemailVerify);

module.exports = router;
