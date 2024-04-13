import jwt from 'jsonwebtoken';
import config from '../../config';
import { Response } from 'express';

const generateTokenAndSetCookie = (userId: object, res: Response) => {
    const token = jwt.sign({ userId }, config.jwtSecret as string, { expiresIn: "15d" });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: config.nodeEnv as string !== "development"
    })
}

export default generateTokenAndSetCookie;