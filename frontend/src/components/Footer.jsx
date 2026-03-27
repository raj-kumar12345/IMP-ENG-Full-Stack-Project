import React from "react";
import { NavLink } from "react-router";
import { FiInstagram, FiYoutube, FiTwitter, FiArrowUpRight } from "react-icons/fi";
import img from "../assets/eng.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-zinc-900 pt-20 pb-10 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Branding & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={img} alt="Logo" className="w-12 h-12" />
              <span className="font-black text-2xl tracking-tighter text-white">
                IMP-<span className="text-[#f06525]">ENG</span>
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight mb-6">
              Ready to speak with <br /> 
              <span className="text-zinc-600">confidence?</span>
            </h2>
            <p className="text-zinc-500 max-w-sm mb-8">
              Join 623k+ students mastering English with Sameer Sir's proven 
              American English techniques.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start lg:items-center lg:justify-end">
            <NavLink 
              to="/course" 
              className="group bg-[#f06525] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#ff7a3d] transition-all"
            >
              Explore Cohorts <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </NavLink>
            <NavLink 
              to="/contact" 
              className="px-8 py-4 border border-zinc-800 text-white rounded-2xl font-bold hover:bg-zinc-900 transition-all"
            >
              Contact Support
            </NavLink>
          </div>
        </div>

        <hr className="border-zinc-900 mb-16" />

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Navigation</h4>
            <NavLink to="/" className="text-zinc-500 hover:text-[#f06525] transition-colors">Home</NavLink>
            <NavLink to="/course" className="text-zinc-500 hover:text-[#f06525] transition-colors">Courses</NavLink>
            <NavLink to="/about" className="text-zinc-500 hover:text-[#f06525] transition-colors">About Us</NavLink>
            <NavLink to="/contact" className="text-zinc-500 hover:text-[#f06525] transition-colors">Contact</NavLink>
          </div>

          {/* AI Tools */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">AI Tools</h4>
            <NavLink to="/chat" className="text-zinc-500 hover:text-[#f06525] transition-colors">Chat-AI</NavLink>
            <NavLink to="/talk" className="text-zinc-500 hover:text-[#f06525] transition-colors">Talk-AI</NavLink>
            <p className="text-zinc-700 text-xs mt-2 uppercase tracking-widest font-bold">More Coming Soon</p>
          </div>

          {/* Bhopal Branch Info */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-2">
            <h4 className="text-white font-bold mb-2">Head Office</h4>
            <p className="text-zinc-500 max-w-xs">
              Indrapuri B Sector, Sector B, Indrapuri, Bhopal, Madhya Pradesh 462022
            </p>
            <p className="text-[#f06525] font-medium">+91 77230 06091</p>
          </div>
        </div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-zinc-900">
          <p className="text-zinc-600 text-sm">
            © {currentYear} American English Classes. All rights reserved. <br className="md:hidden" />
            Designed for <span className="text-zinc-400">IMPRESSIVE Speakers</span>.
          </p>

          <div className="flex gap-6">
            <a href="https://www.instagram.com/impsenglish/" target="_blank" className="text-zinc-500 hover:text-white transition-colors text-xl">
              <FiInstagram />
            </a>
            <a href="https://www.youtube.com/@ImpressiveEnglish" target="_blank" className="text-zinc-500 hover:text-white transition-colors text-xl">
              <FiYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#f06525]/5 blur-[100px] rounded-full pointer-events-none"></div>
    </footer>
  );
};

export default Footer;