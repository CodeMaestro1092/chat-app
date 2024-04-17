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