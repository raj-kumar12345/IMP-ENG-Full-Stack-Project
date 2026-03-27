import React from "react";
import { useNavigate  } from 'react-router'


const CourseCard = ({ course }) => {

  const navigate = useNavigate();

  const handleCourseDetailsNavigate = () =>{
      navigate(`/course/${course._id}`)
  }

  return (
    <div className="flex flex-col w-full max-w-sm border border-zinc-800 rounded-[1.5rem] overflow-hidden bg-[#0a0a0a] text-white p-4 shadow-2xl transition-all duration-300 hover:border-zinc-700 group/card">
      
      {/* Header with Traffic Lights & Image */}
      <div className="relative">
        <div className="flex gap-1.5 mb-3 px-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
        </div>

        <div onClick={handleCourseDetailsNavigate} className="relative cursor-pointer aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900">
          {course.img ? (
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
              src={course.img}
              alt={course.title}
            />
          ) : (
            /* Fallback UI if image is empty in DB */
            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700 font-black italic p-4 text-center leading-none">
              {course.title}
            </div>
          )}
          
          {course.isLive && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white px-2 py-0.5 md:px-3 md:py-1 rounded-md shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-black text-[10px] md:text-xs font-bold tracking-wider">LIVE</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 px-1 flex flex-col gap-4">
        
        {/* Topics Section - Mapping from the Array(3) in your DB */}
        <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar">
          {course.topics && course.topics.length > 0 ? (
            course.topics.slice(0, 3).map((topic, index) => (
              <span
                key={index}
                className="whitespace-nowrap px-3 py-1.5 border border-zinc-800 bg-zinc-900/40 text-[11px] md:text-[13px] text-zinc-400 rounded-full capitalize"
              >
                {topic}
              </span>
            ))
          ) : (
            <span className="px-3 py-1.5 border border-zinc-800 bg-zinc-900/40 text-[11px] text-zinc-500 rounded-full">
              {course.duration}
            </span>
          )}
        </div>

        {/* Course Title - Fixed to match 'title' key */}
        <div>
           <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight min-h-[3.5rem]">
            {course.title}
          </h2>
          <p className="text-zinc-500 text-sm mt-1 capitalize font-medium">
            with <span className="text-zinc-300">{course.instructor}</span>
          </p>
        </div>

        {/* --- PRICE SECTION --- */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mt-2">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-2xl md:text-3xl font-bold text-[#f06525]">
              ₹{course.price}
            </span>
            <span className="text-xs md:text-sm line-through text-zinc-500 font-medium">
              ₹{course.oldPrice}
            </span>
          </div>
          
          <div className="inline-block self-start sm:self-center bg-white px-2 py-1 rounded text-[10px] font-black text-black tracking-tighter uppercase">
            {course.discount}
          </div>
        </div>

        {/* CTA Button */}
        <button onClick={handleCourseDetailsNavigate} className="mt-2 w-full flex items-center cursor-pointer justify-between px-5 py-3 md:py-4 border border-zinc-800 rounded-2xl bg-zinc-900/50 hover:bg-white hover:text-black transition-all duration-300 group">
          <span className="text-md md:text-lg font-bold">Check Course</span>
          <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;