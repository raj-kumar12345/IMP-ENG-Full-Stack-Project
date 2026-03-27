import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiX, HiUserCircle } from "react-icons/hi"; // Added User icon
import img from "../assets/eng.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Check if user exists in Redux state
  const user = useSelector((state) => state.auth.user);

  const links = [
    { name: "Home", to: "/" },
    { name: "Courses", to: "/course" },
    { name: "Chat-AI", to: "/chat" },
    // { name: "Talk-AI", to: "/talk" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-25 bg-black/90 backdrop-blur-xl text-white px-6 md:px-16 z-50 border-b border-zinc-900">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        
        {/* Logo Section */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer group">
          <div className="p-1 bg-zinc-900 rounded-xl group-hover:bg-zinc-800 transition-colors">
            <img className="w-12 h-12 object-contain" src={img} alt="Logo" />
          </div>
          <span className="hidden md:block font-black text-xl tracking-tighter">
            IMP<span className="text-[#f06525]">ENG</span>
          </span>
        </div>

        {/* Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 bg-zinc-900/50 border border-zinc-800 px-2 py-1.5 rounded-2xl">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? "bg-[#f06525] text-white shadow-[0_0_15px_rgba(240,101,37,0.3)]" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* --- CONDITIONAL ACTION BUTTON (Desktop) --- */}
        <div className="hidden lg:block">
          {user ? (
            <div 
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 cursor-pointer group bg-zinc-900 border border-zinc-800 pr-5 pl-2 py-2 rounded-2xl hover:border-[#f06525] transition-all"
            >
              {/* If user has an avatar URL use it, otherwise show icon */}
              {user.avatar ? (
                <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover" alt="profile" />
              ) : (
                <HiUserCircle className="text-4xl text-zinc-500 group-hover:text-[#f06525]" />
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-7 py-3 cursor-pointer rounded-2xl bg-white text-black font-bold text-sm transition-all duration-300 hover:bg-[#f06525] hover:text-white hover:shadow-[0_0_20px_rgba(240,101,37,0.4)]"
            >
              login
            </button>
          )}
        </div>

        {/* Mobile Toggle Icon */}
        <div className="lg:hidden">
          {open ? (
            <HiX className="text-3xl text-white cursor-pointer" onClick={() => setOpen(false)} />
          ) : (
            <RxHamburgerMenu className="text-3xl text-[#f06525] cursor-pointer" onClick={() => setOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-25 left-0 w-full bg-[#0a0a0a] border-b border-zinc-800 transition-all duration-300 ease-in-out overflow-hidden ${open ? "h-auto py-10 opacity-100" : "h-0 opacity-0"} lg:hidden`}>
        <div className="flex flex-col items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `text-xl font-bold tracking-tight transition-colors ${isActive ? "text-[#f06525]" : "text-zinc-500 hover:text-white"}`}
            >
              {link.name}
            </NavLink>
          ))}
          
          {/* --- CONDITIONAL ACTION BUTTON (Mobile) --- */}
          {user ? (
            <button
              onClick={() => { navigate("/profile"); setOpen(false); }}
              className="mt-4 px-10 py-4 border border-zinc-800 text-white font-bold rounded-2xl flex items-center gap-2"
            >
              <HiUserCircle className="text-2xl text-[#f06525]" />
              
            </button>
          ) : (
            <button
              onClick={() => { navigate("/register"); setOpen(false); }}
              className="mt-4 px-10 py-4 bg-[#f06525] text-white font-bold rounded-2xl shadow-lg"
            >
              Register Now
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;







