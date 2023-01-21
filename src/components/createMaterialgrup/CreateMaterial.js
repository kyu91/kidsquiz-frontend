import * as React from "react";
import Typography from "@mui/material/Typography";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//board component
import TextQuizBoard from "./TextQuizBoard";
import ImageQuizBoard from "./ImageQuizBoard";
import PuzzleBoard from "./PuzzleBoard";
import ImageBoard from "./ImageBoard";

export default function CreateMaterial() {
  //라디오 버튼 value
  const [radioValue] = React.useState(["1", "2", "3", '4']);
  const [radioLabel] = React.useState(["텍스트 퀴즈", "이미지 퀴즈", "퍼즐", '이미지']);

  //라디오 버튼
  const [radio, setRadio] = React.useState("");
  const radioChangeHandle = (event) => {
    setRadio(event.target.value);
  };

  //이미지 퀴즈 파일 업로드
  const [files, setFiles] = React.useState([]);
  //퍼즐 이미지 저장
  const [puzzleFile, setPuzzleFile] = React.useState([]);
  //그냥 이미지업로드 추가요
  const [imageFiles, setImageFiles] = React.useState('');

  const inputRef = React.useRef();
  return (
    <>
      <FormControl>
        <Typography variant="h4" mt={6}>
          교구 생성
        </Typography>
        <Typography variant="h6" mt={2} style={{marginBottom: '20px', color: '#808080'}}>
          강의를 위한 교구를 생성해 주세요.
        </Typography>

        {/* 교구 종류라디오 */}
          <FormLabel id="demo-row-radio-buttons-group-label">교구 종류 선택</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={radioChangeHandle}
          >
            {
              radioValue.map((item, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={item}
                    name={item}
                    control={<Radio />}
                    label={radioLabel[index]}
                  />
                )
              })
            }
          </RadioGroup>
          {/* 퀴즈놀이 */}
          {radio === "1" ?
            <TextQuizBoard
              radio={radio}
              /> :
            null} 
          {radio === "2" ?
            <ImageQuizBoard
              radio={radio}
              inputRef= {inputRef}
              files= {files}
              setFiles={setFiles}
              /> :
            null}  
          {
            radio === "3" ?
              <PuzzleBoard
                puzzleFile={puzzleFile}
                setPuzzleFile={setPuzzleFile}
                inputRef={inputRef}
              />: null
          }  
          {
            radio === "4" ?
              <ImageBoard
              imageFiles= {imageFiles}
              setImageFiles={setImageFiles}
              radio={radio}
                />: null
          }              
      </FormControl>
    </>
  );
}