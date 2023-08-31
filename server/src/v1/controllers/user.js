const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");



// ユーザー新規登録
exports.register = async (req, res) => {
  try {
    // パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    // ユーザーの新規作成
    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    // JWTの発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// ユーザーログイン
exports.login = async (req, res) => {
  const { username } = req.body;
  try {
    // ユーザー取得
    const user = await User.findOne({ username }).exec();
    // JWTの発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
