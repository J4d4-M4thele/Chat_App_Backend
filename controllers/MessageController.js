import BaseController from "./BaseController.js";

export default class MessageController extends BaseController{
    sendMessage = ({ message, roomId }) => {
        //sending message to all connected client windows
        let skt = this.socket.broadcast;
        skt = roomId ? skt.to(roomId) : skt;
        skt.emit("message-from-server", { message });
    };
}