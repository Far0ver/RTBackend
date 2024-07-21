import { Router } from "express";
import findRoutes from "../controllers/route/findRoutes.js";
import deleteRoute from "../controllers/route/deleteRoute.js";
import createRoute from "../controllers/route/createRoute.js";
import updateRoute from "../controllers/route/updateRoute.js";

const router = Router();

router.get('/findRoutes', findRoutes);
router.delete('/deleteRoute', deleteRoute);
router.post('/createRoute', createRoute);
router.put('/updateRoute', updateRoute);
export default router;