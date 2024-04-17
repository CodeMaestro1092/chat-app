import { Response, Request } from "express";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import { getReceiverSocketId, io } from "../socket/socket";

export interface UserIdT extends Request {
    user?: {
        _id: any;
    };
}

const sendMessage = async (req: UserIdT, res: Response) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user?._id;

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await newMessage.save();
        await conversation.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage);
    } catch (e: any) {
        console.log("Error in sendMessage controller:", e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getMessages = async (req: UserIdT, res: Response) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user?._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages")


        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (e: any) {
        console.log("Error in getMessages controller:", e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { sendMessage, getMessages };