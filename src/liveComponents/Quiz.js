import React, { useState, useEffect } from "react";
import { getSocket, getSocketName } from "../controller/MediasoupController";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import "./css/quiz.css";

//석규
import QuizIcon from "@mui/icons-material/Quiz";
import Box from "@mui/material/Box";
import { ClassSharp } from "@mui/icons-material";

const socket = getSocket();

function Quiz({ classMaterials }) {
  const [quizStarted, setquizStarted] = useState(false);
  const [ansChosen, setansChosen] = useState(false);
  const [question, setquestion] = useState(null);
  const [choice1, setchoice1] = useState(null);
  const [choice2, setchoice2] = useState(null);
  const [rightAnswer, setrightAnswer] = useState(null);
  const [result, setresult] = useState(null);
  const [name, setname] = useState(getSocketName());
  const [hostSocket, sethostSocket] = useState(null);
  //////////////////////////////////////////////////////////////테스트용 임시//////////////////////////////////////////////
  const [tempdiv, settempdiv] = useState(false);

  const setdiv = () => {
    if (tempdiv == true) {
      settempdiv(false);
    } else {
      settempdiv(true);
    }
  };

  // console.log("처음 들어올때", classMaterials)
  // console.log("처음 들어올때2", classMaterials.imageMultipleChoiceList)
  //퀴즈 첫번쨰 사진 두번째 사진 저장할 state
  const [firstImage, setfirstImage] = useState(
    "https://src.hidoc.co.kr/image/lib/2022/5/12/1652337370806_0.jpg"
  );
  const [secondImage, setsecondImage] = useState(
    "https://src.hidoc.co.kr/image/lib/2022/5/12/1652337370806_0.jpg"
  );
  const [answer, setAnswer] = useState("1");
  const [questionText, setQuestionText] = useState("문제가 없습니다.");

  if (classMaterials) {
    if (classMaterials.imageMultipleChoiceList) {
      if (classMaterials.imageMultipleChoiceList[0]) {
        firstImage ===
          "https://src.hidoc.co.kr/image/lib/2022/5/12/1652337370806_0.jpg" &&
          setfirstImage(classMaterials.imageMultipleChoiceList[0].firstChoice);
        secondImage ===
          "https://src.hidoc.co.kr/image/lib/2022/5/12/1652337370806_0.jpg" &&
          setsecondImage(
            classMaterials.imageMultipleChoiceList[0].secondChoice
          );
        answer === "1" &&
          setAnswer(classMaterials.imageMultipleChoiceList[0].answer);
        questionText === "문제가 없습니다." &&
          setQuestionText(classMaterials.imageMultipleChoiceList[0].question);
      }
    }
  }

  //////////////////////////////////////////////////////////////테스트용 임시//////////////////////////////////////////////

  // 이 방의 호스트 인가 아닌가 확인 -> isHost 변수 설정 (근데 어차피 퀴즈 시작은 선생님만 할 수 있으니까 꼭 안해도 될듯..?)
  const hostBool = localStorage.getItem("hostBool");
  let isHost;
  if (hostBool) {
    //
    isHost = true;
  } else {
    isHost = false;
  }

  function makeAnsChosenFalse() {
    setansChosen(false);
  }

  function finishQuiz() {
    console.log("퀴즈 종료");
    setquizStarted(false);
    //!todo: 해당 퀴즈에 대해서만! 종료할 수 있도록..!
    socket.emit("finishQuiz");
  }
  function checkAnswer(idx, a, name) {
    console.log("고른 답은 ", idx);
    console.log("정답은 ", a);
    if (idx == a) {
      socket.emit("correct", name, hostSocket);
      setresult(`${name}님! 정답입니다 🎉`);
      setansChosen(true);
      setTimeout(makeAnsChosenFalse, 1000);
    } else {
      socket.emit("wrong", name, hostSocket);
      setresult(`${name}님, 다시 생각해보세요 🤔`);
      setansChosen(true);
      setTimeout(makeAnsChosenFalse, 1000);
    }
  }
  socket.on("startQuiz", (q, c1, c2, rightAnswer, hostSocket) => {
    setquestion(q);
    setchoice1(c1);
    setchoice2(c2);
    setrightAnswer(rightAnswer);
    console.log("🚀", rightAnswer);
    console.log("선생님 socket", hostSocket);
    sethostSocket(hostSocket);
    setquizStarted(true);
  });

  socket.on("correctNotice", (name) => {
    setresult(`${name}이(가) 정답을 맞췄어요!  🎉`);
    setansChosen(true);
    setTimeout(makeAnsChosenFalse, 1000);
  });

  socket.on("wrongNotice", (name) => {
    setresult(`${name}이(가) 틀렸어요 🥺`);
    setansChosen(true);
    setTimeout(makeAnsChosenFalse, 1000);
  });
  socket.on("finishQuiz", () => {
    setquizStarted(false);
  });

  localStorage.getItem("guestName");

  if (quizStarted)
    return (
      <div className="quizWrapper">
        <p id="ques"> {question} </p>
        <div id="imgAnswersWrapper">
          <img
            id="answerImg1"
            onClick={() => {
              checkAnswer(1, rightAnswer, name);
            }}
            src={choice1}
            alt=""
          ></img>
          <img
            id="answerImg2"
            onClick={() => {
              checkAnswer(2, rightAnswer, name);
            }}
            src={choice2}
            alt=""
          ></img>
        </div>
        {ansChosen ? <div id="resultMsg"> {result} </div> : <div> </div>}
        <button id="finishQuiz" onClick={finishQuiz}>
          퀴즈 종료
        </button>
      </div>
    );
  // if (ansChosed) return ()
  return (
    <>
      {hostBool ? (
        <div>
          <Button id="btnnn" onClick={setdiv}>
            <QuizIcon fontSize="large" />
          </Button>

          {tempdiv && (
            <Box
              sx={{
                width: "100px",
                maxWidth: 180,
                bgcolor: "orange",
                borderRadius: "15%",
              }}
            >
              <div>
                <Button 
                  className="quizFindBtn"
                  primary="동물 퀴즈"
                  onClick={() => {
                    socket.emit(
                      "startQuiz",
                      questionText,
                      firstImage,
                      secondImage,
                      answer,
                      socket.id,
                      (q, c1, c2, ans) => {
                        setquestion(q);
                        setchoice1(c1);
                        setchoice2(c2);
                        setrightAnswer(ans);
                      }
                    );
                    setquizStarted(true);
                  }}
                >
                  퀴즈
                </Button>
              </div>
            </Box>
          )}
        </div>
      ) : null}
    </>
  );
}

export default Quiz;
