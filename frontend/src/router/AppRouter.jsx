import { createBrowserRouter, RouterProvider,} from "react-router"
import Register from "../pages/Register"
import Login from "../pages/Login"
import HomeLayout from "../Layout/HomeLayout"
import App from "../App"
import ChatAI from "../pages/ChatAI"
import TalkAI from "../pages/TalkAI"
import Course from "../pages/Course"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Profile from "../pages/Profile"
import { useDispatch } from "react-redux"
import { axiosInstance } from "../config/axiosInstance"
import { useEffect } from 'react'
import { setUser } from "../features/userSlice"
import Admin from "../pages/Admin"
import ProtectedAdminRoute from "../components/ProtectedAdminRoute"
import { setCourses } from "../features/courseSlice"
import CourseDetail from "../pages/CourseDetail"
import WatchCourse from "../pages/WatchPage"



const AppRouter = () => {

    const dispatch = useDispatch()

    useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/course");

      console.log("COURSE API:", res.data);

      if (res.data?.courses) {
        dispatch(setCourses(res.data.courses));
      }
    } catch (error) {
      console.log("COURSE ERROR", error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/current-user");

      if (res.data?.user) {
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log("USER ERROR", error);
        console.log(error?.response?.data?.message || error.message);

    }
  };

  fetchCourses();
  fetchUser();
}, [dispatch]);




    const router = createBrowserRouter([

        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/",
            element: <HomeLayout />,
            children: [
                {
                    index: true,
                    element: <App />
                },
                {
                    path: "chat",
                    element: <ChatAI />
                },
                {
                    path: "talk",
                    element: <TalkAI />
                },
                {
                    path: "course",
                    element: <Course />
                },
                {
                    path: "course/:id",
                    element: <CourseDetail />
                },
                {
                    path: "about",
                    element: <About />
                },
                {
                    path: "contact",
                    element: <Contact />
                },
                {
                    path: "profile",
                    element: <Profile />
                },
                {
                    path: "watch/:id",
                    element: <WatchCourse />
                }
            ]
        },

        // admin routes
        {
            path: "admin",
            element:(
                <ProtectedAdminRoute>
                    <Admin />
                </ProtectedAdminRoute>
                )
        }




    ])


  return <RouterProvider router={router} />

}

export default AppRouter