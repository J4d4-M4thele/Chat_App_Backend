export default class RoomController {
    constructor(socket) {
        this.socket = socket;
    }

    joinRoom = ({ roomId }) => {
        this.socket.join(roomId);
    }
}