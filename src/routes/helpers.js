import { Router } from "express";
import getApiKey from  '../controllers/getApiKey.js'

const router = Router(); 

router.get('/getKey', getApiKey);

export default router;