import io from "socket.io-client";

const socket = io.connect("https://3.39.0.224:4000")

export default socket;
