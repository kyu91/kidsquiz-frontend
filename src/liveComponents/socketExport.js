import io from "socket.io-client";

//const socket = io.connect("http://localhost:4000/sock")
const socket = io.connect("wss://kidsquiz.kr/sock", {reconnect: true,transports: ['websocket']})

export default socket;