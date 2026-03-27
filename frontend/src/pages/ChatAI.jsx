import React, { useState, useEffect, useRef } from "react";
import { Send, User, Cpu, Sparkles, AlertCircle } from "lucide-react";
import { axiosInstance } from "../config/axiosInstance";

const ChatAI = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  useEffect(() => {
    if (errorStatus) {
      const timer = setTimeout(() => setErrorStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorStatus]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const cleanMessage = message.trim();
    if (!cleanMessage || loading) return;

    setErrorStatus(null);
    const userMessage = { sender: "user", text: cleanMessage };
    setChat((prev) => [...prev, userMessage]);
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post("/ai/chat", { message: cleanMessage });
      if (res.data && res.data.reply) {
        setChat((prev) => [...prev, { sender: "ai", text: res.data.reply }]);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      const status = error.response?.status;
      setErrorStatus(status === 429 ? "API Limit reached." : "Connection error.");
      setChat((prev) => [...prev, { 
        sender: "ai", 
        text: "I'm having trouble connecting. Please try again later." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Fixed: Added h-screen and overflow-hidden to prevent body scroll
    <div className="bg-[#0a0a0a] h-screen overflow-hidden pt-30 pb-10 px-4 md:px-10 relative font-sans flex flex-col">
      
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#f06525]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto z-10 relative flex flex-col h-full w-full">
        
        {/* Header - Fixed height */}
        <div className="flex items-center justify-between mb-6 px-2 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-[#f06525]" />
              <span className="text-zinc-500 uppercase tracking-[0.4em] text-[9px] font-black">AI ASSISTANT</span>
            </div>
            <h1 className="text-white text-3xl md:text-5xl font-black tracking-tighter">
              IMP <span className="text-[#f06525]">Linguist</span> AI
            </h1>
          </div>
        </div>

        {/* --- MAIN CHAT WRAPPER (Fixed Height Container) --- */}
        <div className="bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl flex-1 mb-4">
          
          {/* Chat Area - Scrollable Section */}
          <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-5 custom-scrollbar">
            {chat.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center space-y-4">
                <div className="p-4 bg-zinc-800/50 rounded-3xl border border-zinc-700">
                  <Cpu size={32} className="text-[#f06525]" />
                </div>
                <p className="text-white text-xs tracking-widest uppercase font-bold">Secure Session Initialized</p>
              </div>
            )}

            {chat.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-500`}
              >
                <div className={`flex gap-3 max-w-[90%] md:max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center shrink-0 border 
                    ${msg.sender === "user" ? "bg-white border-white" : "bg-zinc-800 border-zinc-700"}`}>
                    {msg.sender === "user" ? <User size={16} className="text-black" /> : <Cpu size={16} className="text-[#f06525]" />}
                  </div>

                  <div className={`p-3.5 md:p-4 rounded-2xl text-[13px] md:text-[14px] leading-relaxed whitespace-pre-wrap
                    ${msg.sender === "user" 
                      ? "bg-[#f06525] text-white rounded-tr-none font-semibold" 
                      : "bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-tl-none font-medium"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800/40 px-5 py-2.5 rounded-full flex gap-1.5 items-center border border-zinc-800/50">
                  <span className="w-1.5 h-1.5 bg-[#f06525] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#f06525] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#f06525] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input Area - Fixed at bottom of the card */}
          <div className="p-5 md:p-7 bg-zinc-900/60 border-t border-zinc-800/50 relative shrink-0">
            {errorStatus && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-900/90 border border-red-700 text-red-100 text-[10px] px-4 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md">
                <AlertCircle size={12} /> {errorStatus}
              </div>
            )}

            <form onSubmit={sendMessage} className="relative flex items-center max-w-3xl mx-auto">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type Hindi or English to translate..."
                disabled={loading}
                className="w-full bg-black/60 border border-zinc-800 text-white pl-6 pr-16 py-4 rounded-2xl outline-none focus:border-[#f06525]/60 transition-all text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="absolute right-2.5 p-2.5 bg-white text-black rounded-xl hover:bg-[#f06525] hover:text-white transition-all disabled:opacity-30 active:scale-95 shadow-lg"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-[10px] text-zinc-600 mb-2 uppercase tracking-widest font-bold shrink-0">
            impressive English 
        </p>
      </div>
    </div>
  );
};

export default ChatAI;