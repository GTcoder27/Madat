import express from "express";
import {voice_to_text , text_to_voice, text_to_text} from '../controllers/bhashini.js'
import {sos_send,get_sos} from '../controllers/sos.controller.js'


const router = express.Router();

router.get("/bhashini/voice_to_text",voice_to_text);
router.get("/bhashini/text_to_voice",text_to_voice);
router.post("/bhashini/text_to_text",text_to_text);
router.post("/sos/send",sos_send);
router.get("/sos/getall",get_sos);



export default router;

