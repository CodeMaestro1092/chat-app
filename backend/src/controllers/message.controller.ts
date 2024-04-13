import { Response, Request } from "express";

const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { id } = req.params;
        const senderId = req.userId
    } catch (e: any) {
        console.log("Error in sendMessage controller:", e.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export { sendMessage }