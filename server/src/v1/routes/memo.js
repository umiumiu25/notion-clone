const router = require("express").Router();

const { create, getAll, update, getOne, deleteOne } = require("../controllers/memo");
const { verifyToken } = require("../handlers/tokenHandler");

// メモを作成
router.post("/", verifyToken, create);

// ログインしているユーザーが投稿したメモを全て取得
router.get("/", verifyToken, getAll);

// ログインしているユーザーが投稿したメモを１つ取得
router.get("/:memoId", verifyToken, getOne);

// ログインしているユーザーが投稿したメモを１つ削除
router.delete("/:memoId", verifyToken, deleteOne);

// ログインしているユーザーが投稿したメモを１つ更新
router.put("/:memoId", verifyToken, update);

module.exports = router;