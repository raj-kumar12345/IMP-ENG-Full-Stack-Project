import React from "react";
import { FiPhone, FiMail, FiMapPin, FiClock, FiInstagram, FiYoutube } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="pt-29 min-h-[calc(100vh-100px)] bg-[#0a0a0a] text-white px-6 md:px-20 py-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <span className="w-2 h-2 rounded-full bg-[#f06525]"></span>
            <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">Connect With Us</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            Visit Our <span className="text-[#f06525]">Bhopal Center.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            Have questions about our cohorts or offline classes? Sameer Sir and the team are here to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Contact Info Cards */}
          <div className="space-y-6">
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] flex items-start gap-6 hover:border-[#f06525]/40 transition-all">
              <div className="p-4 bg-[#f06525]/10 rounded-2xl text-[#f06525]">
                <FiMapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Our Location</h3>
                <p className="text-zinc-500">Indrapuri B Sector, Sector B, Indrapuri, Bhopal, Madhya Pradesh 462022</p>
              </div>
            </div>

            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] flex items-start gap-6 hover:border-[#f06525]/40 transition-all">
              <div className="p-4 bg-[#f06525]/10 rounded-2xl text-[#f06525]">
                <FiPhone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Call Sameer Sir</h3>
                <p className="text-zinc-500">+91 77230 06091</p>
                <p className="text-zinc-600 text-sm mt-1">Available: 8 AM - 10 PM</p>
              </div>
            </div>

            

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a href="#" className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-[#f06525] hover:border-[#f06525] transition-all">
                <FiInstagram size={24} />
              </a>
              <a href="#" className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 hover:text-[#f06525] hover:border-[#f06525] transition-all">
                <FiYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-8 md:p-12 rounded-[3rem] backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Full Name</label>
                  <input type="text" placeholder="John Doe" className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-xl focus:outline-none focus:border-[#f06525] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Phone Number</label>
                  <input type="text" placeholder="+91" className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-xl focus:outline-none focus:border-[#f06525] transition-colors" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">Interested In</label>
                <select className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-xl focus:outline-none focus:border-[#f06525] transition-colors appearance-none">
                  <option>Beginner Cohort</option>
                  <option>Advanced/Business English</option>
                  <option>Bhopal Offline Classes</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">Your Message</label>
                <textarea rows="4" placeholder="How can we help you?" className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-xl focus:outline-none focus:border-[#f06525] transition-colors resize-none"></textarea>
              </div>

              <button className="w-full py-5 bg-[#f06525] text-white font-black rounded-2xl text-lg hover:shadow-[0_0_30px_rgba(240,101,37,0.4)] transition-all">
                Submit Request
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact