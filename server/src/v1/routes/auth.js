const router = require("express").Router();
const { body } = require("express-validator");
const CryptoJS = require("crypto-js");
require("dotenv").config();

const User = require("../models/user");
const { validate } = require("../handlers/validation");
const { register, login } = require("../controllers/user");
const { verifyToken } = require("../handlers/tokenHandler");



// ユーザー新規登録API
router.post(
  "/register",
  body("username").isLength({ min: 8 }).withMessage("ユーザー名は8文字以上である必要があります"),
  body("password").isLength({ min: 8 }).withMessage("パスワードは8文字以上である必要があります"),
  body("confirmPassword").isLength({ min: 8 }).withMessage("確認用パスワードは8文字以上である必要があります"),
  body("username").custom(async username => {
    const user = await User.findOne({ username }).exec();
    if (user) throw new Error('このユーザーはすでに使われています');
  }),
  validate,
  register
);

// ユーザーログイン用API
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要があります")
    .custom(async username => {
      const user = await User.findOne({ username }).exec();
      if (!user) throw new Error("ユーザーは存在しません");
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります")
    .custom(async (_, { req }) => {
      const { username, password } = req.body;
      const user = await User.findOne({ username }).exec();
      if (!user) return;
      // パスワードの復号化
      const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
      if (password !== decryptedPassword) throw new Error("正しいパスワードを入力してください");
    }),
  validate,
  login
);

// JWT認証API
router.post(
  "/verify-token",
  verifyToken,
  (req, res) => {
    return res.status(200).json({ user: req.user });
  }
);

module.exports = router;
