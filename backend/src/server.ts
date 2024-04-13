import express from 'express';
import config from '../config'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import connectToMongoDB from './db/connectToDB';
import messageRoutes from './routes/message.routes';

const app = express();
const PORT = config.port || 4000

//middleware
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`your server running on port: ${PORT}`);
})