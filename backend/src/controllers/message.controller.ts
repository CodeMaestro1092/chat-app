import { Response, Request } from "express";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

interface sendMessageT extends Request {
    user?: {
        _id: string;
    };
}

const sendMessage = async (req: sendMessageT, res: Response) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;

        if (!req.user) return res.status(404).json({ error: "User not found" });
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save, newMessage.save()])

        res.status(201).json(newMessage);
    } catch (e: any) {
        console.log("Error in sendMessage controller:", e.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export { sendMessage }