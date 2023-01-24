import React from "react";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";

const NewCanvas = ({ canvas, emitClear,showimagePuzzlediv,setShowimagePuzzlediv }) => {
  const [hover, setHover] = React.useState(false);
  const clearCanvas = () => {
    canvas.clear();
    emitClear(1);
    setShowimagePuzzlediv(false)
  };

  return (
    <div>
      <Tooltip title="전체 삭제">
        <Button
          key="clear"
          type="button"
          className="navBtn"
          name="clear"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={clearCanvas}
        >
          <RefreshIcon fontSize='large'/>
        </Button>
      </Tooltip>
    </div>
  );
};

export default NewCanvas;
