import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

export interface ConversationT {
  fullname: string;
  gender: string;
  profilePic: string;
  username: string;
  _id: string;
}
export interface ConversationsT {
  conversation: ConversationT;
  emoji: string;
  lastIndex: boolean;
}

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation: ConversationT, i: number) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex={i === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Conversations;
