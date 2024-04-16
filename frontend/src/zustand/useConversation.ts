import { create } from 'zustand'
import { ConversationT } from '../components/sidebar/Conversations';

type useConversationT = {
    selectedConversation: null | ConversationT;
    setSelectedConversation: (selectedConversation: ConversationT | null) => void;
    messages: string[];
    setMessages: (messages: string[]) => void;

}

const useConversation = create<useConversationT>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages: string[]) => set({ messages })
}))

export default useConversation;

