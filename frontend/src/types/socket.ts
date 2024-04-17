import { Socket } from "socket.io-client";

export interface SocketContextProps {
    socket: Socket | null;
    onlineUsers: string[]; // Update type to allow null
}
