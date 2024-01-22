import TypingController from "../controllers/TypingController.js";
import RoomController from "../controllers/RoomController.js";

const sockets = (socket) => {
    const typingController = new TypingController(socket);
    const roomController = new RoomController(socket);

    socket.on("send-message", ({ message, roomId }) => {
        //sending message to all connected client windows
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("message-from-server", { message });
    });

    //checks to see if user is typing their message
    socket.on("typing-started", typingController.typingStarted);
    socket.on("typing-stopped", typingController.typingStopped);

    socket.on("join-room", roomController.joinRoom);

    socket.on("disconnect", (socket) => {
        console.log("User left");
    });
}

export default sockets; 