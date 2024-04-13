import express, { Response, Request } from 'express';
import { login, logout, signup } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

export default router;