import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiPicker = ({ icon, onChange }) => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  const showPicker = () => setIsShowPicker((prev) => !prev);

  const selectEmoji = (e) => {
    const emoji = e.native;
    onChange(emoji);
    setIsShowPicker(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={"700"}
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          left: 0,
          top: 56,
        }}
      >
        <Picker data={data} onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
