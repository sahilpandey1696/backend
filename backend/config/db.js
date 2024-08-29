const mongoose = require("mongoose");

mongoose.connection.on("open", () => {
  console.log("db is connected");
});
mongoose.connection.on("end", () => {
  console.log("db is not connected");
});
const startDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/interview");
  } catch (error) {
    console.log(error);
  }
};
module.exports = startDatabase;
