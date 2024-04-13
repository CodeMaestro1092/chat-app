import express from 'express';
import config from '../config'

const app = express();
const PORT = config.port || 3000

app.listen(PORT, () => {
    console.log(`your server running on port: ${PORT}`);
})