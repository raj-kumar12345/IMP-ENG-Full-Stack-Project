import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { ArrowLeft, PlayCircle, Lock, CheckCircle } from "lucide-react";

const WatchCourse = () => {
  const { id } = useParams(); // Course ID from URL
  const navigate = useNavigate();
  
  // Redux se data nikalna
  const { courses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);
  
  const course = courses.find((c) => c._id === id);
  
  // State for active video
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (course?.videos?.length > 0) {
      setActiveVideo(course.videos[0]); // Default pehli video set karein
    }
  }, [course]);

  // Security Check: Agar user ne course nahi kharida toh wapas bhej do
  const isPurchased = user?.purchaseCourse?.includes(id);

  if (!isPurchased) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6">
        <Lock size={48} className="text-zinc-700 mb-4" />
        <h2 className="text-2xl font-black uppercase tracking-tighter">Access Denied</h2>
        <p className="text-zinc-500 mb-6 text-center">Please purchase the course to watch these exclusive lectures.</p>
        <button onClick={() => navigate(-1)} className="bg-[#f06525] px-8 py-3 rounded-full font-black text-sm">
          GO BACK
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: VIDEO PLAYER AREA */}
        <div className="lg:col-span-8 space-y-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-4">
            <ArrowLeft size={16} /> <span className="text-xs font-bold uppercase tracking-widest">Exit Player</span>
          </button>

          {/* MAIN PLAYER */}
          <div className="relative aspect-video bg-black rounded-[2rem] overflow-hidden border border-zinc-800 shadow-2xl">
            {activeVideo ? (
              <video
                key={activeVideo.url} // Key change hote hi naya video load hoga
                controls
                controlsList="nodownload" // Download disable karne ke liye
                className="w-full h-full object-contain"
                poster={course.img} // Video load hone se pehle course image dikhegi
              >
                <source src={activeVideo.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-700 font-black italic">
                SELECT A LESSON TO START
              </div>
            )}
          </div>

          <div className="p-4">
            <h1 className="text-3xl font-black tracking-tighter text-[#f06525]">{activeVideo?.title}</h1>
            <p className="text-zinc-400 mt-2 leading-relaxed">{activeVideo?.description || "No description available for this lecture."}</p>
          </div>
        </div>

        {/* RIGHT: PLAYLIST AREA */}
        <div className="lg:col-span-4 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] p-6 h-fit max-h-[80vh] overflow-y-auto custom-scrollbar">
          <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
            <PlayCircle size={20} className="text-[#f06525]" /> Course Content
          </h3>
          
          <div className="space-y-3">
            {course.videos?.map((video, index) => (
              <button
                key={index}
                onClick={() => setActiveVideo(video)}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all text-left border ${
                  activeVideo?.url === video.url 
                  ? "bg-[#f06525]/10 border-[#f06525] text-white" 
                  : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 text-zinc-400"
                }`}
              >
                <div className="mt-1">
                  {activeVideo?.url === video.url ? (
                    <div className="w-5 h-5 rounded-full bg-[#f06525] flex items-center justify-center">
                       <PlayCircle size={12} className="text-white" fill="currentColor" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-700 flex items-center justify-center text-[10px] font-bold">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold line-clamp-1">{video.title}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mt-1">{video.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchCourse;