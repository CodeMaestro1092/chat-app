import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";

export type MessageT = {
  _id: string;
  message: string;
  receiverId: string;
  senderId: string;
}

const Messages = () => {
  const { loading, messages } = useGetMessages();
  
  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && [...Array(4)].map((_, i) => <MessageSkeleton key={i} />)}
      {!loading &&
        messages.length > 0 &&
        messages.map((message: MessageT) => <Message key={message._id} message={message}/>)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
