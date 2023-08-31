const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// const morgan = require("morgan");
require('express-async-errors');
const cors = require("cors");

const app = express();
const PORT = 5050;

app.use(cors({
  origin: "http://localhost:5173",
}));
// app.use(morgan);
app.use(express.json());
// localhost:5050/api/v1
app.use("/api/v1", require("./src/v1/routes"));

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中・・・");
} catch (error) {
  console.error(error);
}

// アクセス受付
app.listen(PORT, () => {
  console.log("ローカルサーバー起動中・・・");
  console.log(`http://localhost:${PORT}`);
});