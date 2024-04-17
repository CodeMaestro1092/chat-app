import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";

export type MessageT = {
  _id: string;
  message: string;
  receiverId: string;
  senderId: string;
  createdAt: string;
};

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && [...Array(4)].map((_, i) => <MessageSkeleton key={i} />)}
      {!loading &&
        messages.length > 0 &&
        messages.map((message: MessageT) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
