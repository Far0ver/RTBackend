import { Router } from "express";
import { updateUser } from "../controllers/user/updateUser.js";
import { findUser } from '../controllers/user/findUser.js'
import route from '../controllers/route/test.js'
import authMiddleware from "../middleware/authMiddleware.js";
import updateTokenMiddleware from "../middleware/updateTokenMiddleware.js";
import findRoutes from "../controllers/route/findRoutes.js";

const router = Router();

router.put('/update', updateUser);
router.get('/find', findUser);

export default router;