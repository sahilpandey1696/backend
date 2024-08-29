require("dotenv").config();
const sendToken = async (user, statusCode, res) => {
  try {
    const token = await user.getToken();
    const options = {
      expiresIn: new Date(
        Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpsOnly: true,
    };
    return res.status(statusCode).cookie(`access_token`, token, options).json({
      status: 200,
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = sendToken;
