import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();




// for voice to text
export const voice_to_text = async (req,res)=>{  
  const { base64 } = req.body; 
  const payload = {
    pipelineTasks: [
      {
        taskType: 'asr',
        config: {
          language: { sourceLanguage: 'mr' },
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
    res.json(response.data);
  } catch (error) {
    console.error('API Request Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to process audio' });
  }
};


// for text to voice
export const text_to_voice = async (req, res) => {
  const { text,user_language } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });
  const payload = {
    pipelineTasks: [
      {
        taskType: "tts",
        config: {
          language: { sourceLanguage: user_language },
          serviceId: "",
          gender: "female",
          samplingRate: 8000,
        },
      },
    ],
    inputData: {
      input: [{ source: text }],
    },
  };
  try {
    const response = await axios.post(
      "https://dhruva-api.bhashini.gov.in/services/inference/pipeline",
      payload,
      {
        headers: {
          Accept: "*/*",
          "User-Agent": "NodeBackend",
          Authorization: process.env.BHASHINI_API_KEY,
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("TTS Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch TTS audio." });
  }
};


// for text translation from english language to other
export const text_to_text = async(req,res) =>{
  const { audio_input,source_language} = req.body; 
  const payload = {
    pipelineTasks: [
      {
        taskType: 'asr',
        config: {
          language: { sourceLanguage: source_language },
          serviceId: '',
          audioFormat: 'webm',
          samplingRate: 16000
        }
      }
    ],
    inputData: {
      audio: [
        {
          audioContent: audio_input
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
    res.json(response.data);
  } catch (error) {
    console.error('API Request Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to process audio' });
  }
} 




