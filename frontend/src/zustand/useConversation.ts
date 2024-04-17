import { create } from 'zustand'
import { MessageT } from '../types/messages';
import { ConversationT } from '../types/conversation';

type useConversationT = {
    selectedConversation: null | ConversationT;
    setSelectedConversation: (selectedConversation: ConversationT | null) => void;
    messages: MessageT[];
    setMessages: (messages: MessageT[]) => void;

}

const useConversation = create<useConversationT>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages })
}))

export default useConversation;

