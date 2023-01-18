import React, { useState, useEffect } from "react";
import { getSocket, getSocketName } from '../controller/MediasoupController'
import './css/quiz.css';
const socket = getSocket()

function Quiz () {


    const [quizStarted, setquizStarted] = useState(false);
    const [ansChosen, setansChosen] = useState(false);
    const [question, setquestion] = useState(null);
    const [choice1, setchoice1] = useState(null);
    const [choice2, setchoice2] = useState(null);
    const [rightAnswer, setrightAnswer] = useState(null);
    const [result, setresult] = useState(null);
    const [name, setname] = useState(getSocketName());
    const [hostSocket, sethostSocket] = useState(null);

    // 이 방의 호스트 인가 아닌가 확인 -> isHost 변수 설정 (근데 어차피 퀴즈 시작은 선생님만 할 수 있으니까 꼭 안해도 될듯..?)
    const hostBool = localStorage.getItem('hostBool');
    let isHost ; 
    if (hostBool) { // 
        isHost = true ;
    }
    else {
        isHost = false ;
    }

    function makeAnsChosenFalse () {
        setansChosen(false)
    }

    function finishQuiz() {
        console.log("퀴즈 종료")
        setquizStarted(false)
        //!todo: 해당 퀴즈에 대해서만! 종료할 수 있도록..! 
        socket.emit("finishQuiz")
    }
    function checkAnswer(idx, a, name) {
        console.log("고른 답은 ", idx)
        console.log("정답은 ", a)
        if (idx == a) {
            socket.emit("correct", name, hostSocket)
            setresult(`${name}님! 정답입니다 🎉`)
            setansChosen(true)
            setTimeout(makeAnsChosenFalse, 1000)
        }
        else {
            socket.emit("wrong", name, hostSocket)
            setresult(`${name}님, 다시 생각해보세요 🤔`)
            setansChosen(true)
            setTimeout(makeAnsChosenFalse, 1000)
        }
    }
    socket.on("startQuiz", (q, c1, c2, rightAnswer, hostSocket)=>{
        setquestion(q)
        setchoice1(c1)
        setchoice2(c2)
        setrightAnswer(rightAnswer)
        console.log("🚀", rightAnswer)
        console.log("선생님 socket", hostSocket)
        sethostSocket(hostSocket)
        setquizStarted(true)
    })

    socket.on("correctNotice", (name)=> {
        setresult(`${name}이(가) 정답을 맞췄어요!  🎉`)
        setansChosen(true)
        setTimeout(makeAnsChosenFalse, 1000)
    })

    socket.on("wrongNotice", (name)=> {
        setresult(`${name}이(가) 틀렸어요 🥺`)
        setansChosen(true)
        setTimeout(makeAnsChosenFalse, 1000)
    })
    socket.on("finishQuiz", ()=> {
        setquizStarted(false)
    })
    
    localStorage.getItem('guestName');


    if (quizStarted) return (
        <div className='quizWrapper'>
            <p id="ques"> {question}  </p>
            <div id="imgAnswersWrapper">
                <img id="answerImg1" onClick={() => {checkAnswer(1, rightAnswer, name)}} src= {choice1}></img>
                <img id="answerImg2" onClick={() => {checkAnswer(2, rightAnswer, name)}} src= {choice2}></img>
            </div>         
        {ansChosen ? (<div id="resultMsg"> {result} </div>) : (<div> </div>)} 
        <button id="finishQuiz" onClick={finishQuiz}>퀴즈 종료</button>
        </div> 
    )
    // if (ansChosed) return ()
    return (
        <>
        {hostBool?
            <button id="btnnn" onClick={()=>{
                //todo: 아래 quizId는 퀴즈 objectId여야 함 
                let quizId = 1
                socket.emit("startQuiz", quizId, socket.id, (q, c1, c2, ans)=>{
                    setquestion(q)
                    setchoice1(c1)
                    setchoice2(c2)
                    setrightAnswer(ans)
                })
                setquizStarted(true)
            }}> 퀴즈 시작 </button>
            : null}
        </>
    )
    
}

export default Quiz