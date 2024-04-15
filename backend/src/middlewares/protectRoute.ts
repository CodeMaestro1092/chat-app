import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import config from '../../config';
import User from '../models/user.model';


const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" })
        }

        const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        (req as any).user = user

        next()
    } catch (e: any) {
        console.log("Error in protectRoute middleware:", e.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export default protectRoute;