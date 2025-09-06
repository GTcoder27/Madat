import React, { useRef, useState, useEffect } from "react";
import { Send, Loader, Mic, MicOff, Waves, Volume2 } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


const RecordEMessage = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioLevel, setAudioLevel] = useState(0);
    
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const streamRef = useRef(null);
    const intervalRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            
            // Setup audio context for visualization
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            analyserRef.current.fftSize = 256;
            
            const recorder = new MediaRecorder(stream);
            const chunks = [];
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };
            recorder.onstop = async () => {
                setAudioChunks(chunks);
            };
            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
            setRecordingTime(0);
            
            // Start timer
            intervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
            
            // Start audio level animation
            animateAudioLevel();
            
        } catch (err) {
            alert("Microphone permission denied");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            
            setAudioLevel(0);
        }
    };

    const animateAudioLevel = () => {
        if (!analyserRef.current || !isRecording) return;
        
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        setAudioLevel(average / 255);
        
        animationRef.current = requestAnimationFrame(animateAudioLevel);
    };

    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    const handleSendMessage = async () => {
        setIsSendingMessage(true);
        const audioBlob = new Blob(audioChunks, { type: "audio/flac" });
        let message_base64 = await blobToBase64(audioBlob);
        try {

            let body = { message_base64: message_base64 };
            
            const res = await axiosInstance.post('/sos/send', body);
            
            console.log(res)
            setAudioChunks([]);
            setRecordingTime(0);
            toast.success("message sent successfully")
        } catch (error) {
            console.log(error);
            alert("Failed to send message");
        } finally {
            setIsSendingMessage(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-emerald-950">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Digital particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-30 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 10}s`,
                            animationDuration: `${15 + Math.random() * 10}s`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{
                    backgroundImage: `
                        linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-6">
                {/* Main Container */}
                <div className="backdrop-blur-xl bg-black/40 border border-emerald-500/30 rounded-3xl p-12 shadow-2xl max-w-2xl w-full relative overflow-hidden">
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-3xl blur-sm"></div>
                    
                    <div className="relative z-10 text-center space-y-8">
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="relative inline-block">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent">
                                    Record Message
                                </h1>
                                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg blur-lg"></div>
                            </div>
                            <p className="text-gray-300 text-lg">Secure Voice Communication</p>
                            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto"></div>
                        </div>

                        {/* Recording Status */}
                        {isRecording && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-center space-x-3 text-emerald-300">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    <span className="text-2xl font-mono font-bold">{formatTime(recordingTime)}</span>
                                    <Waves className="w-6 h-6 animate-bounce" />
                                </div>
                                
                                {/* Audio level indicator */}
                                <div className="flex justify-center space-x-1">
                                    {[...Array(12)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-2 bg-emerald-400 rounded-full transition-all duration-100"
                                            style={{
                                                height: `${8 + (audioLevel * 50 * Math.random())}px`,
                                                opacity: audioLevel > i * 0.08 ? 1 : 0.3
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons Container */}
                        <div className="flex justify-center items-center space-x-8">
                            {/* Recording Button */}
                            <div className="relative">
                                {/* Pulsing rings during recording */}
                                {isRecording && (
                                    <>
                                        <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping" 
                                             style={{ width: '120px', height: '120px', left: '-30px', top: '-30px' }}></div>
                                        <div 
                                            className="absolute inset-0 rounded-full border border-emerald-300 opacity-60 transition-all duration-100"
                                            style={{ 
                                                width: `${60 + audioLevel * 40}px`, 
                                                height: `${60 + audioLevel * 40}px`,
                                                left: `${-15 - audioLevel * 20}px`,
                                                top: `${-15 - audioLevel * 20}px`
                                            }}
                                        ></div>
                                    </>
                                )}
                                
                                <button
                                    type="button"
                                    onClick={isRecording ? stopRecording : startRecording}
                                    disabled={isSendingMessage}
                                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300 transform hover:scale-110 shadow-lg relative ${
                                        isRecording 
                                            ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-red-500/40' 
                                            : 'bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 shadow-emerald-500/40'
                                    } ${isSendingMessage ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isRecording ? (
                                        <MicOff className="w-7 h-7" />
                                    ) : (
                                        <Mic className="w-7 h-7" />
                                    )}
                                    
                                    {/* Glowing effect */}
                                    <div className={`absolute inset-0 rounded-full ${
                                        isRecording ? 'bg-red-500' : 'bg-emerald-500'
                                    } opacity-20 blur-lg scale-150`}></div>
                                </button>
                            </div>

                            {/* Send Button */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={handleSendMessage}
                                    disabled={!audioChunks.length || isRecording || isSendingMessage}
                                    className={`w-16 h-16 rounded-full flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-110 shadow-lg relative ${
                                        (!audioChunks.length || isRecording || isSendingMessage)
                                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed shadow-gray-600/20' 
                                            : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/40'
                                    }`}
                                >
                                    {isSendingMessage ? (
                                        <Loader className="w-7 h-7 animate-spin" />
                                    ) : (
                                        <Send className="w-7 h-7" />
                                    )}
                                    
                                    {/* Glowing effect for active state */}
                                    {(!audioChunks.length || isRecording || isSendingMessage) ? null : (
                                        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 blur-lg scale-150"></div>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Status Messages */}
                        <div className="space-y-2">
                            <p className="text-gray-400 text-lg">
                                {isRecording 
                                    ? 'Recording in progress... Click mic to stop' 
                                    : audioChunks.length > 0 
                                        ? 'Recording ready - Click send to transmit' 
                                        : 'Click microphone to start recording'}
                            </p>
                            
                            {isSendingMessage && (
                                <div className="flex items-center justify-center space-x-2 text-blue-400">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-0"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-200"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-400"></div>
                                    <span className="ml-2">Transmitting secure message...</span>
                                </div>
                            )}
                        </div>

                        {/* Instructions Panel */}
                        <div className="mt-8 p-6 bg-black/20 border border-emerald-500/20 rounded-xl">
                            <h3 className="text-emerald-300 font-semibold mb-3 flex items-center gap-2">
                                <Volume2 className="w-5 h-5" />
                                Quick Guide
                            </h3>
                            <div className="text-gray-300 text-sm space-y-2 text-left">
                                <p>• <span className="text-emerald-400">Green Mic:</span> Click to start recording</p>
                                <p>• <span className="text-red-400">Red Mic:</span> Click to stop recording</p>
                                <p>• <span className="text-blue-400">Blue Send:</span> Transmit your voice message</p>
                                <p>• <span className="text-emerald-400">Visual Bars:</span> Show real-time audio levels</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg); 
                        opacity: 0.3;
                    }
                    50% { 
                        transform: translateY(-25px) rotate(180deg); 
                        opacity: 0.6;
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

                .animation-delay-0 {
                    animation-delay: 0ms;
                }

                .animation-delay-200 {
                    animation-delay: 200ms;
                }

                .animation-delay-400 {
                    animation-delay: 400ms;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 6px;
                }
                
                ::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.3);
                }
                
                ::-webkit-scrollbar-thumb {
                    background: rgba(34, 197, 94, 0.5);
                    border-radius: 3px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(34, 197, 94, 0.7);
                }

                /* Button glow effects */
                button:not(:disabled):hover {
                    filter: brightness(1.1);
                }
            `}</style>
        </div>
    );
};

export default RecordEMessage;