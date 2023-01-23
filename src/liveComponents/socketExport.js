import io from "socket.io-client";

const socket = io.connect("http://localhost:4000/sock") // 로컬에서 할 때÷
// const socket = io.connect("https://live.kidsquiz.kr/sock")


export default socket;
