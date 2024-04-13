import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    console.log('loginUser');
}
export const signup = async (req: Request, res: Response) => {
    try {
        const { fullName, password, confirmPassword, gender } = req.body;
        
    } catch (e) {

    }
}
export const logout = (req: Request, res: Response) => {
    console.log('logoutUser');
}