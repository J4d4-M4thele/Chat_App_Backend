const sockets = (socket) => {
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
} 

export default sockets; 