// router.ts
import { Router } from "express";
import {register}  from "../controllers/user/registration.js"
import {login} from '../controllers/user/login.js'
import logout from '../controllers/user/logout.js'
import createTokenMiddleware from "../middleware/createTokenMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
import updateTokenMiddleware from "../middleware/updateTokenMiddleware.js";

const router = Router(); // создали роутер

router.post('/register', register);
router.post('/login', createTokenMiddleware, login);
router.get('/logout', authMiddleware, updateTokenMiddleware, logout);

export default router;