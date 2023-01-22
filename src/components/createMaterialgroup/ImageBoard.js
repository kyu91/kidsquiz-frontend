import React from "react";
import { Grid, Button, Typography, Stack } from "@mui/material";
import { onhandlePostImages } from "./createMaterialPost";

const ImageBoard = ({ radio, inputRef, imageFiles, setImageFiles }) => {
  const handleSubmitJustImage = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("image", imageFiles);
    onhandlePostImages(data);
  };
  // const imageRef = React.useRef();
  const handleChangeImageFile = (event) => {
    setImageFiles(event.target.files[0]);
    console.log("그냥 이미지 업로드 입니다");
  };
  return (
    <Grid
      container
      spacing={3}
      component="form"
      encType="multipart/form-data"
      onSubmit={handleSubmitJustImage}
    >
      {/* 교구 이미지 업로드 환경 */}
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center">
          <Typography variant="p" mt={2}>
            {console.log("들어갔나요 ?", imageFiles)}
            {imageFiles
              ? imageFiles.name
              : "수업에 사용할 이미지를 업로드해주세요."}
          </Typography>
          <Button variant="contained" component="label">
            Upload File
            <input
              hidden
              accept="image/*"
              name="image"
              type="file"
              ref={inputRef}
              onChange={handleChangeImageFile}
            />
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" href="/material">
            취소
          </Button>
          <Button
            //href='/material'
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            등록
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ImageBoard;
