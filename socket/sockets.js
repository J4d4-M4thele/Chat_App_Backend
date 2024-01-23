import TypingController from "../controllers/TypingController.js";
import RoomController from "../controllers/RoomController.js";
import MessageController from "../controllers/MessageController.js";
import fs from "fs";

const sockets = (socket) => {
    const typingController = new TypingController(socket);
    const roomController = new RoomController(socket);
    const messageController = new MessageController(socket);

    socket.on("send-message", messageController.sendMessage);

    //checks to see if user is typing their message
    socket.on("typing-started", typingController.typingStarted);
    socket.on("typing-stopped", typingController.typingStopped);

    socket.on("join-room", roomController.joinRoom);
    socket.on("new-room-created", roomController.newRoomCreated);
    socket.on("room-removed", roomController.roomRemoved);

    socket.on("upload", ({ data, roomId }) => {
        fs.writeFile(
            "upload/" + "test.png",
            data,
            { encoding: "base64" },
            () => { }
        );
        
        socket.to(roomId).emit('uploaded', { buffer: data.toString('base64') })
    });

    socket.on("disconnect", (socket) => {
        console.log("User left");
    });
}

export default sockets; 