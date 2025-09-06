import React, { useState, useEffect } from "react";
import { MessageSquare, Volume2, User, Clock, Shield, Headphones, Play, Pause, Languages } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../redux/slice/AuthSlice.js';


const HomePage = () => {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    async function getData() {
      setLoadingMessages(true);
      try {
        const res = await axiosInstance.get("/sos/getall");
        setMessages(res.data.reverse());

        // await new Promise(resolve => setTimeout(resolve, 1000)); 

        console.log("Messages loaded");
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoadingMessages(false);
      }
    }
    getData();
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const toggleAudioPlayback = (messageId) => {
    if (playingAudio === messageId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(messageId);
      // In real implementation, you'd control actual audio playback here
    }
  };

  const translate_message = async (msg) => {
    let not_translated = msg.text;
    console.log("not_translated : ", not_translated);
    try {
      let res = await axiosInstance.post("/bhashini/text_to_text", {
        audio_input: msg.audio,
        source_language: selectedLang
      });
      let translated_text = res.data.pipelineResponse?.[0].output?.[0].source;
      console.log("translated : ", translated_text)

      setTranslation(translated_text);
    } catch (err) {
      console.error("Translation failed:", err);
    }
  };



  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-emerald-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-12 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-8 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Digital Rain Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 15}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <div className="pt-8 pb-6 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="text-center mb-8">
              <div className="backdrop-blur-xl bg-black/30 border border-emerald-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-green-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <Shield className="w-7 h-7 text-black" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent">
                      Emergency Dashboard
                    </h1>
                  </div>

                  <div className="flex items-center justify-center gap-3 text-gray-300">
                    <User className="w-5 h-5 text-emerald-400" />
                    <span className="text-xl">Welcome back, <span className="text-emerald-300 font-semibold">{authUser?.fullname}</span></span>
                  </div>

                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto mt-4"></div>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="backdrop-blur-sm bg-black/20 border border-emerald-500/20 rounded-xl p-4 hover:bg-black/30 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="text-emerald-300 font-semibold">Total Messages</p>
                    <p className="text-2xl font-bold text-white">{messages.length}</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-black/20 border border-emerald-500/20 rounded-xl p-4 hover:bg-black/30 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-8 h-8 text-blue-400" />
                  <div>
                    <p className="text-blue-300 font-semibold">Audio Messages</p>
                    <p className="text-2xl font-bold text-white">{messages.filter(msg => msg.audio).length}</p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-black/20 border border-emerald-500/20 rounded-xl p-4 hover:bg-black/30 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="text-purple-300 font-semibold">Status</p>
                    <p className="text-lg font-bold text-emerald-300">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Section */}
        <div className="px-6 pb-8">
          <div className="max-w-6xl mx-auto">
            {loadingMessages ? (
              <div className="flex justify-center items-center py-12">
                <div className="backdrop-blur-xl bg-black/30 border border-emerald-500/30 rounded-2xl p-8">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-emerald-300 text-lg">Loading messages...</span>
                  </div>
                </div>
              </div>
            ) : messages && messages.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-emerald-300 mb-6 flex items-center gap-3">
                  <MessageSquare className="w-7 h-7" />
                  Emergency Messages
                </h2>

                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={msg.id || index}
                      className="backdrop-blur-xl bg-black/30 border border-emerald-500/30 rounded-2xl p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Glowing border effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-2xl"></div>

                      <div className="relative z-10">
                        {/* Message Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-green-400 flex items-center justify-center">
                              {msg.audio ? (
                                <Headphones className="w-5 h-5 text-black" />
                              ) : (
                                <MessageSquare className="w-5 h-5 text-black" />
                              )}
                            </div>
                            <div>
                              <p className="text-emerald-300 font-semibold">
                                {msg.audio ? 'Voice Message' : 'Text Message'}
                              </p>
                              <p className="text-gray-400 text-sm">Message #{index + 1}</p>
                            </div>
                          </div>

                          {msg.timestamp && (
                            <div className="text-right">
                              <p className="text-gray-300 text-sm">{formatDate(msg.timestamp)}</p>
                              <p className="text-emerald-400 font-mono">{formatTime(msg.timestamp)}</p>
                            </div>
                          )}
                        </div>

                        {/* Message Content */}
                        <div className="space-y-4">
                          {msg.text && (
                            <div className="bg-black/20 border border-emerald-500/20 rounded-xl p-4">
                              <p className="text-gray-200 leading-relaxed">{msg.text}</p>
                            </div>
                          )}

                          {msg.audio && (
                            <div className="bg-black/20 border border-blue-500/20 rounded-xl p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {/* <button
                                    onClick={() => toggleAudioPlayback(msg.id || index)}
                                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 flex items-center justify-center text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
                                  >
                                    {playingAudio === (msg.id || index) ? (
                                      <Pause className="w-5 h-5" />
                                    ) : (
                                      <Play className="w-5 h-5 ml-0.5" />
                                    )}
                                  </button>
                                  
                                  <div className="flex-1">
                                    <p className="text-blue-300 font-medium">Audio Message</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="flex space-x-1">
                                        {[...Array(8)].map((_, i) => (
                                          <div
                                            key={i}
                                            className="w-1 bg-blue-400 rounded-full transition-all duration-200"
                                            style={{
                                              height: `${8 + Math.random() * 16}px`,
                                              opacity: playingAudio === (msg.id || index) ? 1 : 0.5
                                            }}
                                          ></div>
                                        ))}
                                      </div>
                                      <span className="text-gray-400 text-sm">~0:30</span>
                                    </div>
                                  </div> */}
                                </div>
                              </div>

                              <audio controls className="w-full mt-4 opacity-20 hover:opacity-100 transition-opacity duration-300">
                                <source
                                  src={`data:audio/wav;base64,${msg.audio}`}
                                  type="audio/wav"
                                />
                              </audio>

                              <div>
                                <select
                                  className="mt-2 p-2 border rounded bg-green-600"
                                  value={selectedLang}
                                  onChange={(e) => setSelectedLang(e.target.value)}
                                >
                                  <option value="en">English</option>
                                  <option value="hi">Hindi</option>
                                  <option value="mr">Marathi</option>
                                  <option value="gu">Gujarati</option>
                                  <option value="ne">Nepali</option>
                                  <option value="kn">Kannada</option>
                                  <option value="ml">Malayalam</option>
                                  <option value="pa">Punjabi</option>
                                  <option value="te">Telugu</option>
                                  <option value="bn">Bengali</option>
                                  <option value="ur">Urdu</option>
                                  <option value="bho">Bhojpuri</option>
                                  <option value="mni">Manipuri</option>
                                  <option value="mag">Magahi</option>
                                  <option value="ta">Tamil</option>
                                  <option value="or">Odia</option>
                                  <option value="mai">Maithili</option>
                                  <option value="brx">Bodo</option>
                                  <option value="gom">Goan Konkani</option>
                                  <option value="sa">Sanskrit</option>
                                  <option value="doi">Dogri</option>
                                </select>



                                <button
                                  className="ml-2 bg-amber-300 px-3 py-1 rounded hover:bg-amber-400"
                                  onClick={() => { translate_message(msg) }}
                                >
                                  Translate
                                </button>

                                {translation && (
                                  <p className="mt-2 p-2 bg-gray-100 rounded">Translated: {translation}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center py-16">
                <div className="backdrop-blur-xl bg-black/30 border border-emerald-500/30 rounded-2xl p-12 text-center max-w-md">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-600 to-gray-500 flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-300 mb-2">No Messages</h3>
                  <p className="text-gray-400">No emergency messages have been received yet.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style >{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-30px) rotate(180deg); 
            opacity: 0.4;
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.7);
        }

        /* Audio controls styling */
        audio::-webkit-media-controls-panel {
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        audio::-webkit-media-controls-play-button {
          background-color: rgba(34, 197, 94, 0.8);
          border-radius: 50%;
        }

        /* Hover glow effects */
        .backdrop-blur-xl:hover {
          box-shadow: 0 0 30px rgba(34, 197, 94, 0.1);
        }
      `}</style>
    </div>
  );
};

export default HomePage;