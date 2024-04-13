import { Request, Response } from "express";
import User from "../models/user.model";
import argon2 from "argon2";
import { hashingPassword, verifyPassword } from "../utils/passwordHashing";
import generateTokenAndSetCookie from "../utils/generateToken";

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        const isPasswordCorrect = await verifyPassword(user?.password as string, password);
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (error) {

    }
}
export const signup = async (req: Request, res: Response) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password don't match" })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "Username already exists" })
        }

        //password hashing
        const hashedPassword = await hashingPassword(password);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: "Invalid user data" })
        }
    } catch (e: any) {
        console.log("Error in signUp controller ", e.message)
        res.status(500).json({ e: "internal server error" })
    }
}
export const logout = (req: Request, res: Response) => {
    console.log('logoutUser');
}