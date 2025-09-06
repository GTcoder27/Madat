import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { useDispatch,useSelector } from "react-redux";
import { signup } from "../redux/slice/AuthSlice";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const {isSigningUp} = useSelector((state) => state.auth);

  
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true){
      dispatch(signup(formData));
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-emerald-950">
      {/* Matrix-style background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Digital rain effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${20 + Math.random() * 15}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* Left Side - Signup Form */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            {/* Cyberpunk Glass Container */}
            <div className="backdrop-blur-xl bg-black/40 border border-emerald-500/30 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-3xl blur-sm"></div>
              <div className="relative z-10">
                
                {/* Logo Section */}
                <div className="text-center mb-8">
                  <div className="flex flex-col items-center gap-4 group">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-400 flex items-center justify-center group-hover:from-emerald-400 group-hover:to-green-300 transition-all duration-300 shadow-lg shadow-emerald-500/25">
                        <MessageSquare className="w-8 h-8 text-black" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                    </div>
                    <div className="space-y-2">
                      <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                        Create Account
                      </h1>
                      <p className="text-gray-300 text-sm">Get started with your free account</p>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-emerald-300">
                      Full Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <User className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors duration-200" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-12 pr-4 py-4 bg-black/30 backdrop-blur-md border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 hover:bg-black/40 hover:border-emerald-500/50"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-emerald-300">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors duration-200" />
                      </div>
                      <input
                        type="email"
                        className="w-full pl-12 pr-4 py-4 bg-black/30 backdrop-blur-md border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 hover:bg-black/40 hover:border-emerald-500/50"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-emerald-300">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-400 transition-colors duration-200" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full pl-12 pr-12 py-4 bg-black/30 backdrop-blur-md border border-emerald-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 hover:bg-black/40 hover:border-emerald-500/50"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-black font-bold rounded-xl shadow-lg shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 hover:shadow-emerald-500/40"
                    disabled={isSigningUp}
                    onClick={handleSubmit}
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>
                </div>

                {/* Sign In Link */}
                <div className="text-center mt-6 pt-6 border-t border-emerald-500/20">
                  <p className="text-gray-300 text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200 hover:underline">
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Section */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 relative">
          <div className="text-center space-y-6 max-w-lg">
            <div className="relative">
              <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
                Enter The
                <span className="block bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                  Digital Future
                </span>
              </h2>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg blur-lg"></div>
            </div>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Join the next generation platform where innovation meets cutting-edge technology in a secure digital environment.
            </p>

            {/* Feature Cards */}
            <div className="grid gap-4 mt-8">
              {[
                { icon: "⚡", title: "Lightning Speed", desc: "Blazing fast performance" },
                { icon: "🛡️", title: "Cyber Security", desc: "Military-grade protection" },
                { icon: "🔮", title: "Future Ready", desc: "Next-gen technology" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-sm bg-black/20 border border-emerald-500/20 rounded-xl p-4 hover:bg-black/30 hover:border-emerald-500/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl filter drop-shadow-lg">{feature.icon}</span>
                    <div>
                      <h3 className="font-semibold text-emerald-300">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Glowing accent */}
            <div className="mt-8 relative">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto opacity-60"></div>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto opacity-60 absolute top-0 animate-pulse"></div>
            </div>
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute border border-emerald-500/20 rotate-45 animate-float"
                style={{
                  width: `${20 + Math.random() * 30}px`,
                  height: `${20 + Math.random() * 30}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${20 + Math.random() * 10}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-30px) rotate(180deg) scale(1.1); 
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

        /* Glowing input effect */
        input:focus {
          box-shadow: 0 0 0 1px rgb(34 197 94 / 0.5), 0 0 20px rgb(34 197 94 / 0.1);
        }

        /* Button glow effect */
        button[type="submit"]:not(:disabled):hover {
          box-shadow: 0 0 30px rgb(34 197 94 / 0.4);
        }
      `}</style>
    </div>
  );
};

export default SignupPage;