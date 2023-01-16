import io from "socket.io-client";

const socket = io.connect("/sock")

export default socket;
