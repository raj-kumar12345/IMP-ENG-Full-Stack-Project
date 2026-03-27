import React from "react";
import { FiMic, FiUsers, FiMapPin, FiAward } from "react-icons/fi";

const About = () => {
  const features = [
    {
      icon: <FiUsers className="text-[#f06525] text-3xl" />,
      title: "Group Discussions (GD)",
      desc: "Daily interactive sessions to build confidence and overcome the fear of speaking in public.",
    },
    {
      icon: <FiMic className="text-[#f06525] text-3xl" />,
      title: "Stage Presentations",
      desc: "Regular stage activities designed to improve body language and professional delivery.",
    },
    {
      icon: <FiAward className="text-[#f06525] text-3xl" />,
      title: "Mock Interviews",
      desc: "One-on-one interview preparation to help you crack your dream job with ease.",
    },
  ];

  return (
    <div className="pt-29 min-h-screen bg-[#0a0a0a] text-white px-6 md:px-20 py-20 overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#f06525]/5 blur-[150px] rounded-full"></div>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#f06525]"></span>
              <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">About Our Institute</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
              We Provide The <br />
              <span className="text-[#f06525]">Best English</span> <br />
              Experience.
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10">
              Under the expert guidance of <span className="text-white font-bold">Sameer Sir</span>, 
              we don't just teach grammar—we build personalities. At <span className="text-white">American English Classes</span>, 
              we empower students to speak with authority and precision.
            </p>
          </div>

          <div className="relative group">
            {/* Visual element representing a class/stage */}
            <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-[3rem] overflow-hidden flex items-center justify-center p-8 relative">
              <div className="text-center">
                 <p className="text-6xl mb-4">🎙️</p>
                 <h3 className="text-2xl font-bold mb-2">Stage Ready?</h3>
                 <p className="text-zinc-500">Transform your fear into fluency at our Bhopal center.</p>
              </div>
              {/* Decorative border glow */}
              <div className="absolute inset-0 border-2 border-[#f06525]/20 rounded-[3rem] group-hover:border-[#f06525]/50 transition-colors"></div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {features.map((item, index) => (
            <div key={index} className="p-10 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] hover:border-[#f06525]/30 transition-all">
              <div className="mb-6">{item.icon}</div>
              <h4 className="text-xl font-bold mb-4">{item.title}</h4>
              <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Local Call to Action */}
        <div className="bg-[#f06525] p-12 md:p-20 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">In Bhopal? Visit Us!</h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-white/80">
              <FiMapPin />
              <p className="text-lg font-medium">Indrapuri B Sector, Sector B, Indrapuri, Bhopal, Madhya Pradesh 462022</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default About;