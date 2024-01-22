import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 4000;

const httpServer = http.createServer(app);
const io = new Server(httpServer,
    {
        cors: {
            origin: ["https://localhost:3000"]
        }
    });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    // res.json({data: "Hello from socket!"});
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    socket.on("send-message", ({message, roomId}) => {
        //sending message to all connected client windows
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("message-from-server", {message});
    });

    //checks to see if user is typing their message
    socket.on("typing-started", ({roomId}) => {
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("typing-started-from-server");
    });

    socket.on("typing-stopped", ({roomId}) => {
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("typing-stopped-from-server");
    });

    socket.on("join-room", ({roomId}) => {
        console.log('Joining room');
        socket.join(roomId);
    });

    socket.on("disconnect", (socket) => {
        console.log("User left");
   });
});

httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:4000`)
});