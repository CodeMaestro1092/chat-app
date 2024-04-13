import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import config from '../../config';

const protectRoute = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({ error: "Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token, config.jwtSecret as string);

        if(!decoded){
            return res.status(401).json({ error: "Unauthorized - Invalid Token"})
        }
    } catch (e:any) {
        console.log("Error in protectRoute middleware:", e.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export default protectRoute;