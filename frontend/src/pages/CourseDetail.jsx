import React from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { axiosInstance } from "../config/axiosInstance";
import { Lock, CheckCircle, ArrowLeft, ShieldCheck } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Redux state se data fetch karna
  const courses = useSelector((state) => state.course.courses);
  const course = courses.find((c) => c._id === id);
  const user = useSelector((state) => state.auth.user);

  // Logic: Check if course is already in user's purchase list
  const isPurchased = user?.purchaseCourse?.some((purchasedId) => purchasedId === course?._id);

  const handleClickPayment = async () => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const { data } = await axiosInstance.post("/payment/checkout", {
        amount: course.price,
      });

      const order = data.order;

      const options = {
        key: "rzp_test_SVlxcrCSlq19Ra",
        amount: order.amount,
        currency: "INR",
        name: "IMP ENG ",
        description: course.title,
        order_id: order.id,
        handler: async function (response) {
          try {
            const { data } = await axiosInstance.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course._id,
            });

            if (data.success) {
              alert("Payment verified & course unlocked");
              // Yahan aap user profile update ya redirect logic daal sakte hain
              window.location.reload(); 
            }
          } catch (error) {
            console.log("Verification Error:", error);
          }
        },
        theme: {
          color: "#f06525",
        },
        prefill: {
          name: user?.name || "User",
          email: "test@gmail.com",
          contact: "9999999999",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Payment Error:", error);
    }
  };
  if (!course) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-zinc-500 mb-4 font-bold uppercase tracking-widest text-xs">Course data not found...</p>
          <button onClick={() => navigate("/course")} className="text-[#f06525] font-black underline">
            BACK TO COHORTS
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-34 pb-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Explore</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image & Highlights */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 shadow-2xl">
              {course.img ? (
                <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-800 text-4xl font-black italic uppercase">
                  {course.title}
                </div>
              )}
              {course.isLive && (
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                  <span className="text-black text-[10px] font-black tracking-widest">LIVE SESSION</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                {course.title} <br />
                <span className="text-zinc-500 italic text-3xl md:text-5xl tracking-normal">Mastery Cohort.</span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                Unlock professional communication skills with this comprehensive
                <span className="text-white font-bold"> {course.duration} </span>
                program led by <span className="text-[#f06525]">{course.instructor}</span>.
              </p>
            </div>

            {/* Topics Section */}
            <div className="pt-8 border-t border-zinc-900">
              <h3 className="text-zinc-500 uppercase tracking-[0.2em] text-xs font-black mb-6">What's Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.topics?.map((topic, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
                    <div className="w-8 h-8 rounded-full bg-[#f06525]/10 flex items-center justify-center text-[#f06525] font-bold text-xs">
                      {index + 1}
                    </div>
                    <span className="text-zinc-300 font-medium capitalize text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & CTA */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 p-8 rounded-[2.5rem] bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-[#f06525] text-white text-[10px] font-black rounded-md uppercase">
                  Special Offer
                </span>
                <span className="text-zinc-500 text-xs font-bold uppercase">{course.discount} Saved</span>
              </div>

              <div className="mb-8">
                <p className="text-zinc-500 text-sm font-bold uppercase mb-1">One-time Investment</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-white">₹{course.price}</span>
                  <span className="text-xl line-through text-zinc-600 font-bold">₹{course.oldPrice}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {["Lifetime access to recordings", `Direct mentorship with ${course.instructor}`, "Certificate of Completion"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-400">
                    <div className="w-5 h-5 rounded-md bg-zinc-800 flex items-center justify-center text-[10px] text-[#f06525]">✓</div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* DYNAMIC ACTION BUTTON */}
              <button
                onClick={!isPurchased ? handleClickPayment : undefined}
                disabled={isPurchased}
                className={`
                  w-full py-5 font-black rounded-2xl transition-all duration-300 transform shadow-xl flex items-center justify-center gap-3
                  ${isPurchased 
                    ? "bg-zinc-800 text-zinc-500 cursor-default border border-zinc-700 opacity-90" 
                    : "bg-white text-black cursor-pointer hover:bg-[#f06525] hover:text-white active:scale-95"
                  }
                `}
              >
                {isPurchased ? (
                  <>
                    <CheckCircle size={20} className="text-[#f06525]" />
                    ALREADY ENROLLED
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    RESERVE YOUR SEAT NOW
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-6 text-zinc-600">
                <ShieldCheck size={14} />
                <p className="text-[10px] uppercase tracking-widest font-bold">
                  {isPurchased ? "Course Unlocked" : "Secure checkout • Instant Activation"}
                </p>
              </div>
            </div>
          </div>


        </div>
        
        {isPurchased && (
  <div className="mt-12 pt-12 border-t border-zinc-900">
    <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">
      Course <span className="text-[#f06525]">Curriculum</span>
    </h3>
    <div className="space-y-4">
      {course.videos?.map((video, index) => (
        <div 
          key={index}
          className="group flex items-center justify-between p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-[#f06525] transition-all cursor-pointer"
          onClick={() => navigate(`/watch/${course._id}`)} // Watch page par bhejne ke liye
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-[#f06525] transition-colors">
              <span className="text-sm font-bold">{index + 1}</span>
            </div>
            <div>
              <h4 className="font-bold text-white group-hover:text-[#f06525] transition-colors">{video.title}</h4>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">{video.duration}</p>
            </div>
          </div>
          <div className="text-[#f06525] opacity-0 group-hover:opacity-100 transition-opacity font-black text-xs tracking-widest">
            WATCH NOW →
          </div>
        </div>
      ))}
    </div>
  </div>
)}


      </div>
    </div>
  );
};

export default CourseDetail