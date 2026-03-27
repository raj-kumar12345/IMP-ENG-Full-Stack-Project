import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, User, Cpu, Sparkles, Languages, Mic } from "lucide-react";

const TalkAI = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom whenever a new message arrives
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [chat, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChat((prev) => [...prev, userMessage]);
    setLoading(true);
    const currentMsg = message;
    setMessage("");

    try {
      // Replace with your actual backend endpoint
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: currentMsg,
      });
      setChat((prev) => [...prev, { sender: "ai", text: res.data.reply }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: "Language server is currently offline. Please check your connection." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-[120px] pb-32 px-4 md:px-10 relative overflow-x-hidden font-sans">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#f06525]/5 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-zinc-800/20 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto z-10 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6 border-b border-zinc-800/50 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-[#f06525]/10 rounded-lg">
                <Languages size={16} className="text-[#f06525]" />
              </div>
              <span className="text-zinc-500 uppercase tracking-[0.5em] text-[10px] font-black">
                Fluent AI Interface
              </span>
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-black tracking-tighter leading-none">
              Elite <span className="text-[#f06525]">Bhashavid</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-4 font-medium tracking-wide">
              Master English communication with real-time AI guidance.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800">
            <div className="w-2 h-2 rounded-full bg-[#f06525] animate-ping"></div>
            <span className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest">Live Engine</span>
          </div>
        </div>

        {/* Dynamic Message Stack */}
        <div className="flex flex-col gap-10">
          {chat.length === 0 && (
            <div className="py-24 flex flex-col items-center justify-center text-center group">
              <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-center justify-center mb-6 group-hover:border-[#f06525]/50 transition-colors duration-500">
                <Cpu size={32} className="text-zinc-700 group-hover:text-[#f06525] transition-colors" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2 tracking-tight">System Initialized</h3>
              <p className="text-zinc-500 text-sm max-w-xs leading-relaxed italic">
                "Explain the difference between 'Since' and 'For' in English."
              </p>
            </div>
          )}

          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-6 duration-700`}
            >
              <div className={`flex gap-4 md:gap-6 max-w-[95%] md:max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                
                {/* Avatar with dynamic styling */}
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 
                  ${msg.sender === "user" 
                    ? "bg-white border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                    : "bg-zinc-900 border-zinc-800 shadow-[0_0_20px_rgba(240,101,37,0.1)]"}`}
                >
                  {msg.sender === "user" ? (
                    <User size={20} className="text-black" />
                  ) : (
                    <Cpu size={22} className="text-[#f06525]" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`relative p-6 md:p-8 rounded-[2.5rem] text-base md:text-xl leading-relaxed tracking-tight shadow-2xl
                  ${msg.sender === "user" 
                    ? "bg-[#f06525] text-white rounded-tr-none font-bold" 
                    : "bg-zinc-900/40 text-zinc-100 border border-zinc-800 backdrop-blur-xl rounded-tl-none font-medium"}`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900/40 border border-zinc-800 px-8 py-5 rounded-full flex gap-3 items-center backdrop-blur-md">
                <div className="w-2 h-2 bg-[#f06525] rounded-full animate-bounce [animation-duration:0.8s]"></div>
                <div className="w-2 h-2 bg-[#f06525] rounded-full animate-bounce [animation-delay:0.2s] [animation-duration:0.8s]"></div>
                <div className="w-2 h-2 bg-[#f06525] rounded-full animate-bounce [animation-delay:0.4s] [animation-duration:0.8s]"></div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Sticky Global Input Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 md:p-10 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent z-50">
          <form 
            onSubmit={sendMessage} 
            className="relative group flex items-center max-w-4xl mx-auto"
          >
            {/* Left side accessory (Optional Mic) */}
            <div className="absolute left-4 hidden md:flex items-center justify-center text-zinc-600 hover:text-[#f06525] cursor-pointer transition-colors">
              <Mic size={20} />
            </div>

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-zinc-900/80 border-2 border-zinc-800/80 text-white pl-8 md:pl-14 pr-24 py-5 md:py-6 rounded-[3rem] outline-none focus:border-[#f06525] transition-all duration-500 placeholder:text-zinc-700 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-lg"
            />
            
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 p-4 md:p-5 bg-white text-black rounded-[2.5rem] hover:bg-[#f06525] hover:text-white transition-all duration-500 disabled:opacity-20 flex items-center justify-center shadow-2xl active:scale-90 group-hover:shadow-[#f06525]/20"
            >
              <Send size={24} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TalkAI