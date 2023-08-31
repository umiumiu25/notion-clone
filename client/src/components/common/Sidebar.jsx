import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import assets from "../../assets";
import { useEffect, useState } from "react";
import memoApi from "../../api/memoApi";
import { setMemos } from "../../redux/features/memoSlice";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoId } = useParams();
  const user = useSelector((states) => states.user.value);
  const memos = useSelector((states) => states.memo.values);

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemos(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    const activeIndex = memos.findIndex((_memo) => _memo._id === memoId);
    setActiveIndex(activeIndex);
  }, [navigate, memoId, memos]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addMemo = async () => {
    try {
      const newMemo = await memoApi.create();
      const newMemos = [newMemo, ...memos];
      dispatch(setMemos(newMemos));
      navigate(`/memo/${newMemo._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: 250,
        height: "100vh",
      }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={"700"}>
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={"700"}>
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={"700"}>
              プライベート
            </Typography>
            <IconButton onClick={addMemo}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((item, index) => (
          <ListItemButton
            key={item._id}
            sx={{ pl: "20px" }}
            component={Link}
            to={`/memo/${item._id}`}
            selected={index === activeIndex}
          >
            <Typography>
              {item.icon} {item.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
