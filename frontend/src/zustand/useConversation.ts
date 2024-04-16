import {create} from 'zustand'

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation: any) => set({selectedConversation}),
    messages: [],
    setMessages: (messages: string[]) => set({messages})
}))

export default useConversation;