const express = require("express");
const user = require("./routes/user.routes");
const cors = require("cors");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", express.static(path.join(__dirname, "./public/users")));
app.use("/api/v1", user);
app.get("/", (req, res) => {
  console.log("hello ashish");
  res.send(`hello world`);
});

module.exports = app;
