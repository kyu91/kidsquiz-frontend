import io from "socket.io-client";

const socket = io.connect("http://3.39.0.224:4000")

export default socket;
