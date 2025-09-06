import express from "express";
import {signup,logout,login,checkAuth} from "../controllers/auth.controller.js" 
import {protectRoute} from '../middleware/auth.middleware.js';
import {voice_to_text , text_to_voice} from '../controllers/bhashini.js'
import {sos_send} from '../controllers/sos.controller.js'


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout);
router.get("/check",protectRoute,checkAuth);
router.get("/bhashini/voice_to_text",voice_to_text);
router.get("/bhashini/text_to_voice",text_to_voice);
router.post("/sos/send",sos_send);




export default router;

