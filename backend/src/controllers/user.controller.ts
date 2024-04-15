import { Request, Response } from "express";
import { UserIdT } from "./message.controller";
import User from "../models/user.model";

const getUsersForSidebar = async (req: UserIdT, res: Response) => {
    try {
        const loggedInUserId = req.user?._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (e: any) {
        console.log("Error in getUsersForSidebar controller:", e.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export { getUsersForSidebar }