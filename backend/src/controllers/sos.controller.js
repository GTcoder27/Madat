import Message from "../models/message.model.js";
import bcrypt from "bcryptjs";
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const voice_to_text2 = async (base64)=>{  
  const payload = {
    pipelineTasks: [
      {
        taskType: 'asr',
        config: {
          language: { sourceLanguage: 'en' },
          serviceId: '',
          audioFormat: 'webm',
          samplingRate: 16000
        }
      }
    ],
    inputData: {
      audio: [
        {
          audioContent: base64
        }
      ]
    }
  };

  try {
    const response = await axios.post(
      'https://dhruva-api.bhashini.gov.in/services/inference/pipeline',
      payload,
      {
        headers: {
          'Accept': '*/*',
          'User-Agent': 'NodeBackend',
          'Authorization': process.env.BHASHINI_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    let api_transcript = response.data?.pipelineResponse?.[0]?.output?.[0].source || "";
    return api_transcript;
  } catch (error) {
    return "";
  }
};


const handleTranscription = async (message_base64) => {
    let base64 = message_base64;
    try {
      const response = await voice_to_text2(base64);
      // console.log("es",response);

      const transcript = response;

      if (transcript) {
        return transcript;
      } else {
        console.log("No transcript found.");
        return error("No transcript found.");
      }
    } catch (err) {
      console.error("Transcription failed:", err);
    }
};


export const sos_send = async (req,res)=>{
    const {message_base64} = req.body;

    try{
        let transcript = await handleTranscription(message_base64);

        if(!transcript) transcript = "temp";

        const newMessage = new Message({
            text: transcript,
            audio: message_base64,
        });
        
        if(transcript){
            await newMessage.save();
            res.status(201).json({
                message: "We will reach out to you soon",
            });

        }else{
            res.status(400).json({message:"No data found"});
        }

    }catch(error){
        console.log("error in message contrller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}


export const get_sos = async (req,res)=>{
    try{
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch(error){
        console.log("Error in getMessages Controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}


