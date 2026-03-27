import { useSelector } from "react-redux";
import CourseCard from "../components/CourseCard";

const Course = () => {


  const courses = useSelector((state) => state.course.courses);
  
  



  return (
    <div className="pt-39 min-h-[calc(100vh-100px)] bg-[#0a0a0a] px-6 py-16 md:px-20">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
          <span className="w-2 h-2 rounded-full bg-[#f06525]"></span>
          <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">
            Explore Cohorts
          </p>
        </div>
        
        <h1 className="text-white text-4xl md:text-6xl font-black mb-4 text-center md:text-left tracking-tighter">
          Level Up Your Skills With <br />
          <span className="text-zinc-500">Expert-Led Courses.</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl text-center md:text-left leading-relaxed">
          Pick the cohort that suits your goals. From foundation to business mastery, we’ve got you covered.
        </p>
      </div>

      {/* Responsive Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {courses.map((course) => (
          <CourseCard  key={course._id} course={course} />
        ))}
      </div>

      {/* Decorative Gradient for the bottom */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-[#f06525]/5 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Course;