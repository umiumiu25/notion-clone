import { Box, IconButton, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import memoApi from "../api/memoApi";
import { setMemos } from "../redux/features/memoSlice";
import EmojiPicker from "../components/common/EmojiPicker";

const Memo = () => {
  const { memoId } = useParams();
  const [memo, setMemo] = useState({});
  const [icon, setIcon] = useState("");
  const memos = useSelector((states) => states.memo.values);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // メモの初期セット
  useEffect(() => {
    const getMemo = async () => {
      try {
        const memo = await memoApi.get(memoId);
        setMemo(memo);
        setIcon(memo.icon);
      } catch (err) {
        console.error(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer;
  const timeout = 500;

  // メモの更新
  // useEffect(() => {
  //   const updateMemo = async () => {
  //     if (!memo) return;
  //     await memoApi.update(memoId, memo);
  //   };
  //   clearTimeout(timer);
  //   timer = setTimeout(updateMemo, timeout);
  // }, [memo, memoId]);
  const updateMemo = async () => {
    if (!memo) return;
    await memoApi.update(memoId, memo);
  };
  clearTimeout(timer);
  timer = setTimeout(updateMemo, timeout);

  const updateMemoByTitle = (e) => {
    const newTitle = e.target.value;
    setMemo((prevMemo) => ({ ...prevMemo, title: newTitle }));
  };
  const updateMemoByDescription = (e) => {
    const newDescription = e.target.value;
    setMemo((prevMemo) => ({ ...prevMemo, description: newDescription }));
  };

  const deleteMemo = async () => {
    try {
      await memoApi.delete(memoId);
      const newMemos = memos.filter((_memo) => _memo._id !== memoId);
      dispatch(setMemos(newMemos));
      if (newMemos.length === 0) {
        navigate("/");
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }
    } catch (err) {
      alert(err);
    }
  };

  const iconChange = async (newIcon) => {
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemos(temp));
    try {
      await memoApi.update(memoId, { icon: newIcon });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPicker icon={icon} onChange={iconChange} />
          <TextField
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
            }}
            value={memo.title ?? ""}
            onChange={updateMemoByTitle}
          />
          <TextField
            placeholder="追加"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "1rem" },
            }}
            value={memo.description ?? ""}
            onChange={updateMemoByDescription}
          />
        </Box>
      </Box>
    </>
  );
};

export default Memo;
