import React from "react";
import Button from "@mui/material/Button";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Tooltip from "@mui/material/Tooltip";

const ImageBundle = ({ showimage, setShowimage, setShowimagePuzzle }) => {
  function imageshowlist() {
    if (showimage === false) {
      setShowimage(true);
      setShowimagePuzzle(false);
    } else {
      setShowimage(false);
    }
  }
  return (
    <Tooltip title="이미지 모음">
      <Button
        key="image"
        type="button"
        className="navBtn"
        name="imageaddeee"
        onClick={imageshowlist}
      >
        <ImageSearchIcon />
      </Button>
    </Tooltip>
  );
};

export default ImageBundle;
