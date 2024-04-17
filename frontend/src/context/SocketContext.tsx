import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { Socket, io } from "socket.io-client";
import { SocketContextProps } from "../types/socket";


const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // Update type to allow null
  const { authUser } = useAuthContext();

  useEffect(() => {
    let newSocket: Socket | undefined = undefined;

    if (authUser) {
      newSocket = io("http://localhost:6969", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [authUser]);

  const contextValue: SocketContextProps = {
    socket,
    onlineUsers,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
