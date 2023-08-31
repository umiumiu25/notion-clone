const Memo = require("../models/memo");

exports.create = async (req, res) => {
  try {
    const memoCount = await Memo.find({}).countDocuments({});
    // メモ新規作成
    const memo = await Memo.create({
      user: req.user._id,
      position: memoCount,
    });
    res.status(201).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const memos = await Memo.find({ user: req.user._id }).sort("-position").exec();
    res.status(200).json(memos);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    const memo = await Memo.findById(req.params.memoId).exec();
    if (!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json(memo);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const memo = await Memo.findByIdAndDelete(req.params.memoId).exec();
    console.log(memo);
    if (!memo) return res.status(404).json("メモが存在しません");
    res.status(200).json("メモを削除しました");
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  const { memoId } = req.params;
  const title = req.body.title || "無題";
  const description = req.body.description || "ここに自由に記入してください。";
  try {
    const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
      title,
      description,
    }).exec();
    if (!updatedMemo) return res.status(404).json("メモが存在しません");
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
};