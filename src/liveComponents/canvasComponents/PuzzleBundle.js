import React from "react";
import Button from "@mui/material/Button";
import ExtensionIcon from "@mui/icons-material/Extension";
import ExtensionOffIcon from "@mui/icons-material/ExtensionOff";
import Tooltip from "@mui/material/Tooltip";

const PuzzleBundle = ({
  setShowimage,
  showimagePuzzle,
  setShowimagePuzzle,
  setShowimagePuzzlediv,
}) => {
  function imageshowlistPuzzle() {
    if (showimagePuzzle === false) {
      setShowimagePuzzle(true);
      setShowimage(false);
    } else {
      setShowimagePuzzle(false);
    }
    handlePuzzle();
  }

  function imageshowlistPuzzledivexit() {
    setShowimagePuzzlediv(false);
    handlePuzzle();
  }

  //퍼즐 버튼 토글로 변경
  const [showPuzzle, setShowPuzzle] = React.useState(false);
  const handlePuzzle = () => {
    setShowPuzzle(!showPuzzle);
  };

  return (
    <div>
      {showPuzzle ? (
        <Tooltip title="퍼즐 닫기">
          <Button
            key="imagepuzzleexit"
            type="button"
            className="navBtn"
            name="imageaddeee2ddd"
            onClick={imageshowlistPuzzledivexit}
          >
            <ExtensionOffIcon />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title="퍼즐 모음">
          <Button
            key="imagepuzzle"
            type="button"
            className="navBtn"
            name="imageaddeee2"
            onClick={imageshowlistPuzzle}
          >
            <ExtensionIcon />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export default PuzzleBundle;
