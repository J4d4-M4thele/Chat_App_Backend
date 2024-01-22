import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import sockets from "./socket/sockets.js"; 

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

io.on("connection", sockets);

httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:4000`)
});