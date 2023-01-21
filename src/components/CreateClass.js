import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import dayjs from "dayjs";
import "dayjs/locale/fr";
import "dayjs/locale/ru";
import "dayjs/locale/de";
import "dayjs/locale/ar-sa";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import axios from "axios";

export default function CreateClass() {
  //날짜
  let today = new Date();
  // const [datePickerValue, setDatePickerValue] = React.useState(dayjs('2021-01-01'));
  const [datePickerValue, setDatePickerValue] = React.useState(dayjs(today));
  const [timePickerValue, setTimePickerValue] = React.useState(
    dayjs("2021-01-01")
  );
  const date = datePickerValue
    .set("hour", timePickerValue.hour())
    .set("minute", timePickerValue.minute())
    .set("second", timePickerValue.second());

  const formattedDate = date.format("YYYY-MM-DD HH:mm:ss");

  //라디오 버튼 value
  const [radioValue] = React.useState(["1", "2", "3", '4']);
  //라디오 버튼
  const [radio, setRadio] = React.useState("1");


  //비밀번호
  const [password, setPassword] = React.useState("");
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  //교구선택
  const [materials, setMaterial] = React.useState("");
  const handleChangeMaterial = (event) => {
    setMaterial(event.target.value);
  };

  //파일 업로드
  const [files, setFiles] = React.useState([]);
  const inputRef = React.useRef();
  const handleChangeFile = (event) => {
    setFiles(event.target.files[0]);
  };

  //교구선택 데이터 get
  const [materialList, setMaterialList] = React.useState([]); //데이터 받아오기

  const getMaterialList = async () => {
    const config = {
      method: "get",
      url: `/api/classMaterial`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    };
    await axios(config)
      .then((response) => {
        setMaterialList(response.data.classMaterial);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  React.useEffect(() => {
    getMaterialList();
  }, []);

  //서브밋
  const onhandleClassPost = async (data) => {
    const config = {
      method: "post",
      url: `/api/class/new`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("token")}`,
      },
      data: data,
    };

    await axios(config)
      .then((response) => {
        console.log('포스트 하고 온거',response)
        alert("강의가 생성되었습니다.");
        window.location.href = "/class";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    console.log("33333333", materialList[materials]);
    event.preventDefault();
    const data = new FormData();
    data.append("title", event.target.title.value);
    data.append("startDateTime", formattedDate);
    data.append("classKey", password);
    if (materialList[materials]) {
      data.append("classMaterial", materialList[materials]._id);
      // console.log(materiallistId);
    } else {
      data.append("classMaterial", null);
    }
    data.append("studentMaxNum", radio);
    data.append("image", files);

    onhandleClassPost(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <React.Fragment>
        <Typography variant="h4" mt={2}>
          라이브 생성
        </Typography>
        <Typography
          variant="h6"
          mt={2}
          style={{ marginBottom: "20px", color: "#808080" }}
        >
          강의를 위한 라이브 방을 생성해 주세요.
        </Typography>
        <Grid
          container
          spacing={3}
          component="form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <Grid item xs={12}>
            <Typography variant="h5" mt={2}>
              강의제목*
            </Typography>
            <TextField
              required
              id="title"
              name="title"
              label="강의 제목을 입력해주세요."
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>

          {/* 날짜 선택 툴 */}
          <Grid item xs={12}>
            <Stack spacing={3}>
              <Typography variant="h5" mt={2}>
                날짜선택*
              </Typography>
              <DatePicker
                value={datePickerValue}
                onChange={(newValue) => setDatePickerValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                value={timePickerValue}
                onChange={(newValue) => setTimePickerValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </Grid>

          {/* 입장인원선택 라디오 */}
          <Grid item xs={12}>
            <Typography variant="h5" mt={2}>
              입장인원*
            </Typography>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {
                  radioValue.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={item}
                        control={<Radio />}
                        label={item}
                        onChange={(e) => setRadio(e.target.value)}
                      />
                    );
                  })
                }
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* 입장 비밀번호 */}
          <Grid item xs={12}>
            <Typography variant="h5" mt={2}>
              입장비밀번호
            </Typography>
            <TextField
              id="classKey"
              name="classKey"
              label="입장 비밀번호"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              onChange={handleChangePassword}
            />
          </Grid>

          {/* 교구 선택 */}
          <Grid item xs={12}>
            <Typography variant="h5" mt={2} style={{ marginBottom: "20px" }}>
              교구선택
            </Typography>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">교구선택</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={materials}
                  label="Age"
                  onChange={handleChangeMaterial}
                >
                  {materialList.map((material, index) => {
                    return (
                      <MenuItem key={index} value={index}>
                        {material.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* 섬네일 이미지 업로드 */}
          <Grid item xs={12}>
            <Typography variant="h5" mt={2}>
              섬네일 이미지 업로드
            </Typography>
            <Stack direction="row" alignItems="center">
              <Button
                variant="contained"
                component="label"
                style={{ fontSize: "1rem", marginRight: "1em" }}
              >
                Upload File
                <input
                  hidden
                  accept="image/*"
                  name="image"
                  type="file"
                  ref={inputRef}
                  onChange={handleChangeFile}
                />
              </Button>
              <Typography variant="h6" mt={2} style={{ color: "#c0c0c0" }}>
                {files.name
                  ? files.name
                  : "버튼을 눌러 이미지를 업로드해주세요."}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                href="/class"
                type="submit"
                fullWidth
                style={{ fontSize: "1.2rem" }}
              >
                취소
              </Button>
              <Button
                // href='/class'
                variant="contained"
                type="submit"
                fullWidth
                style={{ fontSize: "1.2rem" }}
              >
                등록
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </React.Fragment>
    </LocalizationProvider>
  );
}
