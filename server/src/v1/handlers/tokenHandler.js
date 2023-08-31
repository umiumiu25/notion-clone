const JWT = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");



// クライアントから渡されたJWTを復号化
const tokenDecode = req => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
}

// JWT認証用ミドルウェア
exports.verifyToken = async (req, res, next) => {
  const decodedToken = tokenDecode(req);
  if (decodedToken) {
    // JWTと一致するユーザーを探してくる
    const user = await User.findById(decodedToken.id).exec();
    if (!user) {
      return res.status(401).json("権限がありません");
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
};