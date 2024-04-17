import express from 'express';
import config from '../config'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes'
import messageRoutes from './routes/message.routes';
import userRoutes from './routes/user.routes'

import connectToMongoDB from './db/connectToDB';
import cors from 'cors';
import { app, server } from './socket/socket';

const PORT = config.port || 4000

//middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)
app.use('/api/users', userRoutes)

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`your server running on port: ${PORT}`);
})