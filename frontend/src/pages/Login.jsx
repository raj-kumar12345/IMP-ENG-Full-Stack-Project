import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../config/axiosInstance';
import { FiMail, FiLock, FiChevronRight } from 'react-icons/fi';
import { setUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await axiosInstance.post("/auth/login", formData);
      if (response.data.success) {
        
        const user = response.data.user;

        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));


        if (user.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/");
        }
      } 
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* mt-25 ensures it starts below your 100px navbar */
    <div className="min-h-screen  flex items-center justify-center bg-[#0a0a0a] px-6 relative overflow-hidden">
      
      {/* Background Decorative Glows - Matches Register & Home */}
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-[#f06525]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-zinc-800/10 blur-[100px] rounded-full"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-zinc-900/20 border border-zinc-800/50 p-10 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Welcome Back</h1>
            <p className="text-zinc-500 text-sm font-medium">
              New here? 
              <span 
                onClick={() => navigate("/register")} 
                className="text-[#f06525] ml-1 cursor-pointer hover:underline font-bold"
              >
                Create Account
              </span>
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#f06525] transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#f06525]/50 transition-all placeholder:text-zinc-600"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#f06525] transition-colors" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-zinc-900/50 border border-zinc-800 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-[#f06525]/50 transition-all placeholder:text-zinc-600"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button type="button" className="text-xs text-zinc-500 hover:text-white transition-colors">
                Forgot Password?
              </button>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 mt-2 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-500
                ${isLoading 
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                  : "bg-white text-black hover:bg-[#f06525] hover:text-white hover:shadow-[0_0_20px_rgba(240,101,37,0.3)]"}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-zinc-400 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Sign In <FiChevronRight /></>
              )}
            </button>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs text-center font-medium animate-pulse">
              {errorMsg}
            </div>
          )}
        </div>

        {/* Branding Detail */}
        <p className="text-center mt-8 text-zinc-700 text-[10px] uppercase tracking-[0.5em] font-bold">
          IMPRESSIVE English Academy • Bhopal
        </p>
      </div>
    </div>
  );
};

export default Login;