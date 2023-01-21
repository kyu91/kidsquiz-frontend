import React from 'react'
import { Grid, Typography, TextField, Button, Stack } from '@mui/material'
import { onhandlePostPuzzle } from './createMaterialPost'


const PuzzleBoard = ({ puzzleFile, setPuzzleFile, inputRef }) => {
    const handlePuzzleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("title", event.target.title.value);
        data.append("image", puzzleFile);
        console.log("12312123123123", data);
        onhandlePostPuzzle(data);
      };
      const handleChangePuzzleFile = (event) => {
        setPuzzleFile(event.target.files[0]);
    }
  return (
    <Grid
    container
    spacing={0}
    component="form"
    encType="multipart/form-data"
    onSubmit={handlePuzzleSubmit}
  >
    <Typography variant="h5" mt={2}>
      퍼즐 제목*
    </Typography>
    <TextField
      required
      id="title"
      name="title"
      label="퍼즐제목을 입력해주세요."
      fullWidth
      autoComplete="given-name"
      variant="standard"
      style={{ marginBottom: '2rem' } }
    />
     {/* 나중에 밑에 지우면 됨 */}
    <TextField

      id="columns"
      name="columns"
      label="행을 입력해주세요."
      fullWidth
      autoComplete="given-name"
      variant="standard"
      style={{ marginBottom: '2rem' } }
    />
    <TextField
  
      id="rows"
      name="row"
      label="열을 입력해주세요."
      fullWidth
      autoComplete="given-name"
      variant="standard"
      style={{ marginBottom: '2rem' } }
    />

    
    {/* 퍼즐 이미지 업로드 */}
    <Grid item xs={12}>
      
      <Typography variant="h5" mt={2}>
        퍼즐 이미지 업로드
      </Typography>
      <Stack direction="row" alignItems="center" style={{ marginBottom: '1em'  }}>
        <Button variant="contained" component="label">
          Upload File
          <input
            hidden
            accept="image/*"
            name="image"
            type="file"
            ref={inputRef}
            onChange={handleChangePuzzleFile}
          />
        </Button>
        <Typography variant="h6" mt={2} style={{color: '#c0c0c0', marginLeft: '1em'}}>
        { puzzleFile ? puzzleFile.name : "퍼즐로 사용할 이미지를 업로드해주세요."}
      </Typography>
      </Stack>
    </Grid>

    {
      <Grid item xs={12}>
        <Stack spacing={2} direction="row">
        <Button 
          variant="outlined" 
          href="/material"
          type='submit'
          fullWidth
          style={{fontSize: '1.2rem'}}>
          취소
        </Button>
        <Button
          //href='/material'
          variant="contained" 
          type='submit'
          fullWidth
          style={{fontSize: '1.2rem'}}
        >
          등록
        </Button>
        </Stack>
      </Grid>
    }
  </Grid>
  )
}

export default PuzzleBoard