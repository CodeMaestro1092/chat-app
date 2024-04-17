import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import notification from '../assets/sounds/notification.mp3'
import { MessageT } from '../types/messages'

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        const handleNewMessage = (newMessage: MessageT) => {
            newMessage.shouldShake = true
            const sound = new Audio(notification);
            sound.play();
            setMessages([...messages, newMessage]);
        };

        if (socket) {
            socket.on("newMessage", handleNewMessage);
        }

        return () => {
            if (socket) {
                socket.off("newMessage", handleNewMessage); // Remove the event listener
            }
        };
    }, [socket, setMessages, messages]);

}

export default useListenMessages