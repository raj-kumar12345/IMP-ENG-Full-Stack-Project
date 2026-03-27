import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { HiMail, HiAcademicCap, HiFingerPrint, HiPlay } from "react-icons/hi";
import { removeUser } from '../features/userSlice';

const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  
  // Redux state
  const user = useSelector((state) => state.auth.user);
  const allCourses = useSelector((state) => state.course.courses);

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20 bg-black text-white">
        <p className="text-zinc-500 animate-pulse text-sm font-medium">Loading profile...</p>
      </div>
    );
  }

  const handleLogout = () =>{
    dispatch(removeUser())
    navigate("/")
  }

  return (
    <div className="bg-black min-h-svh text-white pt-32 pb-12 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Profile Header Card */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8 backdrop-blur-md shadow-2xl flex flex-col items-center text-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#f06525] to-orange-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-1 bg-zinc-900 rounded-full">
              {user.profilePic ? (
                <img 
                  src={user.profilePic} 
                  alt={user.name} 
                  className="w-24 h-24 rounded-full object-cover border-2 border-zinc-800"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center text-3xl font-black text-zinc-600 border-2 border-zinc-800">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight uppercase italic">
            {user.name}
          </h1>
          <p className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase mt-1">
            {user.role || "Learning Member"}
          </p>
          
          <div className="mt-6 flex gap-3">
             <div className="px-4 py-2 bg-zinc-800/50 rounded-2xl border border-zinc-700/50 flex flex-col items-center min-w-[100px]">
                <span className="text-[10px] font-black text-zinc-500 uppercase">Courses</span>
                <span className="text-lg font-black text-[#f06525]">{user.purchaseCourse?.length || 0}</span>
             </div>
             <div className="px-4 py-2 bg-zinc-800/50 rounded-2xl border border-zinc-700/50 flex flex-col items-center min-w-[100px]">
                <span className="text-[10px] font-black text-zinc-500 uppercase">Status</span>
                <span className="text-lg font-black text-green-500 italic">Active</span>
             </div>
          </div>
        </div>

        {/* Info & Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Account Details */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2rem] p-6 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Account Security</h3>
            
            <div className="flex items-center gap-4">
              <HiMail className="text-xl text-[#f06525]" />
              <div className="overflow-hidden">
                <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">Email</p>
                <p className="text-sm font-medium text-zinc-300 truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <HiFingerPrint className="text-xl text-[#f06525]" />
              <div>
                <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">Provider</p>
                <p className="text-sm font-medium text-zinc-300">
                   {user.googleId ? "Google Auth" : "Standard Email"}
                </p>
              </div>
            </div>
          </div>

          {/* Enrolled Courses Quick Access */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2rem] p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 flex justify-between items-center">
              Learning Path
              <HiAcademicCap className="text-[#f06525] text-lg" />
            </h3>
            
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {user.purchaseCourse?.length > 0 ? (
                user.purchaseCourse.map((courseId) => {
                  const course = allCourses.find(c => c._id === courseId);
                  return (
                    <button 
                      key={courseId}
                      onClick={() => navigate(`/watch/${courseId}`)}
                      className="w-full group flex items-center justify-between p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl hover:border-[#f06525]/40 transition-all text-left"
                    >
                      <span className="text-xs font-bold text-zinc-300 group-hover:text-white truncate pr-2">
                        {course?.title || "Course Details"}
                      </span>
                      <HiPlay className="text-[#f06525] opacity-50 group-hover:opacity-100" />
                    </button>
                  )
                })
              ) : (
                <div className="text-center py-4">
                   <p className="text-[10px] text-zinc-600 font-bold uppercase italic">No courses active</p>
                   <button 
                    onClick={() => navigate('/course')}
                    className="mt-2 text-[#f06525] text-[10px] font-black underline underline-offset-4"
                   >
                     EXPLORE COURSES
                   </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Logout / Settings Action */}
        <div className="flex gap-4">
           <button className="flex-1 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all">
              Settings
           </button>
           <button onClick={handleLogout} className="flex-1 py-4 bg-[#f06525] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-lg shadow-[#f06525]/20">
              Sign Out
           </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;