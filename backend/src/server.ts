import express from 'express';
import config from '../config'
import authRoutes from './routes/auth.routes'
import connectToMongoDB from './db/connectToDB';

const app = express();
const PORT = config.port || 4000

//middleware
app.use(express.json())

//routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`your server running on port: ${PORT}`);
})