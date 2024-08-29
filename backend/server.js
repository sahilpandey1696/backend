const app = require("./app");
const startDatabase = require("./config/db");
require("dotenv").config();
const startServer = async () => {
  try {
    await startDatabase();
    app.listen(process.env.PORT, () => {
      console.log(`server is connected to port : ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
