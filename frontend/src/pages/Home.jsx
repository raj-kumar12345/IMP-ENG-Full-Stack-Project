import React from "react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-100px)] mt-25 flex items-center justify-center bg-[#0a0a0a] px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[5%] left-[-5%] w-[40%] h-[40%] bg-[#f06525]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-zinc-800/20 blur-[100px] rounded-full"></div>

      {/* Main Content Container */}
      <div className="max-w-7xl w-full z-10 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Text Content */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          {/* Top tagline */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#f06525] animate-pulse"></span>
            <p className="text-zinc-500 uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs font-bold">
              Elevate Your Speech
            </p>
          </div>

          {/* Hero Headline */}
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-[1] md:leading-[0.95] tracking-tighter">
            Speak With <br className="hidden md:block" />
            <span className="text-[#f06525] drop-shadow-[0_0_15px_rgba(240,101,37,0.2)]">
              Absolute
            </span>{" "}
            <br className="hidden md:block" />
            <span className="text-zinc-600">Authority.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-zinc-400 text-base md:text-xl lg:text-2xl mb-10 md:mb-12 max-w-2xl leading-relaxed font-light mx-auto lg:mx-0">
            Master the art of English communication with{" "}
            <span className="text-white border-b border-zinc-700">
              AI-driven insights
            </span>{" "}
            and elite cohort-based learning.
          </p>

          {/* Actions Container */}
          <div className="flex flex-col gap-10 md:gap-12 items-center lg:items-start">
            
            {/* Main Button */}
            <button
              onClick={() => navigate("/course")}
              className="w-full sm:w-max px-8 md:px-10 py-4 md:py-5 bg-white text-black font-black rounded-2xl hover:bg-[#f06525] hover:text-white transition-all duration-500 flex items-center justify-center gap-4 group"
            >
              <span className="text-base md:text-lg">View All Cohorts</span>
              <span className="text-xl md:text-2xl group-hover:translate-x-2 transition-transform">
                →
              </span>
            </button>
            

            {/* Social Proof Stats - Now Responsive */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 md:gap-8 lg:gap-12">
              
              {/* YouTube Stat Group */}
              <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FF0000]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <a href="https://www.youtube.com/@ImpressiveEnglish" target="_blank" className="block" >
                      <div className="relative bg-zinc-900/50 p-2.5 md:p-3 rounded-2xl border border-zinc-800 group-hover:border-[#FF0000]/50 transition-all">
                    <svg fill="currentColor" viewBox="0 0 576 512" className="text-zinc-500 group-hover:text-[#FF0000] transition-colors duration-500 h-6 w-6 md:h-8 md:w-8">
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.781 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                    </svg>
                  </div>
                    </a>
                </div>
                <div className="text-left">
                  <h4 className="text-white text-xl md:text-2xl font-black leading-none tracking-tighter group-hover:text-[#FF0000] transition-colors">623K+</h4>
                  <p className="text-zinc-500 text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Subscribers</p>
                </div>
              </div>

              {/* Vertical Divider - Hidden on Mobile */}
              <div className="h-10 w-[1px] bg-zinc-800 hidden sm:block"></div>

              {/* Instagram Stat Group */}
              <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#E4405F]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <a href="https://www.instagram.com/impsenglish/" target="_blank">
                    <div className="relative bg-zinc-900/50 p-2.5 md:p-3 rounded-2xl border border-zinc-800 group-hover:border-[#E4405F]/50 transition-all">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-zinc-500 group-hover:text-[#E4405F] transition-colors duration-500 h-6 w-6 md:h-8 md:w-8">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  </a>
                </div>
                <div className="text-left">
                  <h4 className="text-white text-xl md:text-2xl font-black leading-none tracking-tighter group-hover:text-[#E4405F] transition-colors">1.4M+</h4>
                  <p className="text-zinc-500 text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] mt-1">Followers</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Image Container - Optimized for mobile */}
        <div className="relative order-1 lg:order-2 flex justify-center items-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f06525]/20 to-transparent rounded-full blur-3xl scale-75 animate-pulse"></div>

          <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-3 md:p-4 transition-transform duration-500 hover:scale-[1.02]">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E22AQE3MfhxG0P10A/feedshare-shrink_800/B4EZob.a_OJgAg-/0/1761405940567?e=2147483647&v=beta&t=vfOHKoL02MXNt5hRSxXlmX7UbGv4F6WZ_rdx-aNXB8E"
              alt="Elite English Speaking"
              className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2.5rem]"
            />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Home;