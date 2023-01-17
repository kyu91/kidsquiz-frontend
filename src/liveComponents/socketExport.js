import io from "socket.io-client";

//const socket = io.connect("http://localhost:4000/sock")
const socket = io.connect("wss://kidsquiz.kr/sock", {reconnect: true,transports: ['websocket']})




// const socket = io.connect("ws://10.0.0.49:4000/sock") // 이건 소켓 통신은 되는데 secure가 아니라서 webrtc가 안 됨 
// const socket = io.connect("/sock") // 이건 소켓 통신은 되는데 secure가 아니라서 webrtc가 안 됨 




// const socket = io("https://live.kidsquiz.kr/sock")

const socket = io.connect("http://localhost:4000/sock")


export default socket;
