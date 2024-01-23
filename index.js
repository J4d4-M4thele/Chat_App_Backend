import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import sockets from "./socket/sockets.js";
import mongoose from "mongoose"; 
import router from "./api/routes.js";
import cors from "cors";

const app = express();
const port = 4000;

await mongoose.connect("mongodb+srv://JadaMathele:kPfIAdYSqOfix3ap@testcluster1.wxdgvkq.mongodb.net/chatapp");

const httpServer = http.createServer(app);
const io = new Server(httpServer,
    {
        cors: {
            origin: ["https://localhost:3000"]
        }
    });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.get("/", (req, res) => {
    // res.json({data: "Hello from socket!"});
    res.sendFile(__dirname + "/index.html");
});

app.use('/', router);

io.on("connection", sockets);

httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:4000`)
});