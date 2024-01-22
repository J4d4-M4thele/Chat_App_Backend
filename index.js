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
    socket.on("send-message", (data) => {
        //sending message to all connected client windows
        socket.broadcast.emit("message-from-server", data);
    });

    //checks to see if user is typing their message
    socket.on("typing-started", ({roomId}) => {
        let skt = socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("typing-started-from-server");
    });

    socket.on("typing-stopped", () => {
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