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

    function makeAnsChosenFalse () {
        setansChosen(false)
    }

    function finishQuiz() {
        console.log("퀴즈 종료")
        setquizStarted(false)
    }
    function checkAnswer(idx, a, name) {
        console.log("고른 답은 ", idx)
        console.log("정답은 ", a)
        if (idx == a) {
            socket.emit("correct", name)
            setresult(`${name}님! 정답입니다 🎉`)
            setansChosen(true)
            setTimeout(makeAnsChosenFalse, 1000)
        }
        else {
            socket.emit("wrong", name)
            setresult(`${name}님, 다시 생각해보세요 🤔`)
            setansChosen(true)
            setTimeout(makeAnsChosenFalse, 1000)
        }
    }
    socket.on("startQuiz", (q, c1, c2, rightAnswer)=>{
        setquestion(q)
        setchoice1(c1)
        setchoice2(c2)
        setrightAnswer(rightAnswer)
        console.log("🚀", rightAnswer)
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

    console.dir(document.getElementById('btnnn'))

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
        </>
    )
    
}

export default Quiz