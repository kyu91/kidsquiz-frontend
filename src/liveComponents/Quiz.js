import React, { useState, useEffect } from "react";
import { getSocket } from '../controller/MediasoupController'
import './css/quiz.css';
const socket = getSocket()

// let question = "다음 중 ?"
// let choice1 = "https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/quiz/%E1%84%80%E1%85%A9%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%8B%E1%85%B5.png"
// let choice2 = "https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/quiz/%E1%84%92%E1%85%A9%E1%84%85%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B5.png"

// function startQuiz(num,id) {
//     socket.emit("startQuiz", num, id, (q, c1, c2)=>{
//         setquestion(q)
//         setchoice1(c1)
//         setchoice2(c2)
//     })
// }

function finishQuiz() {
    console.log("퀴즈 종료")
}

function Quiz () {
    const [quizStarted, setquizStarted] = useState(false);
    const [question, setquestion] = useState(null);
    const [choice1, setchoice1] = useState(null);
    const [choice2, setchoice2] = useState(null);

    //todo: 아래 question은 백엔드에서 받아와야 함

    if (quizStarted) return (
        <div className='quizWrapper'>
            <p id="ques"> {question}  </p>
            <div id="imgAnswersWrapper">
                <img src= {choice1}></img>
                <img src= {choice2}></img>
            </div>            
        <button onClick={finishQuiz}>퀴즈 종료</button>
        </div> 
    )
    socket.on("startQuiz")
    return (
        <>
            <button onClick={()=>{
                //todo: 아래 quizId는 퀴즈 objectId여야 함 
                let quizId = 1
                socket.emit("startQuiz", quizId, socket.id, (q, c1, c2)=>{
                    setquestion(q)
                    setchoice1(c1)
                    setchoice2(c2)
                })
                setquizStarted(true)
            }}> 퀴즈 시작 </button>
        </>
    )
    
}

export default Quiz