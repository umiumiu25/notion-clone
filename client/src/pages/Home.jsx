import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import memoApi from "../api/memoApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createMemo = async () => {
    let res;
    try {
      setLoading(true);
      res = await memoApi.create();
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
      navigate(`/memo/${res._id}`);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton variant="outlined" onClick={createMemo} loading={loading}>
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
};

export default Home;
