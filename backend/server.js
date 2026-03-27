require("dotenv").config()
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.route")
const AIRoutes = require("./routes/AI.route")
const courseRoutes = require("./routes/course.route")
const paymentRoutes = require("./routes/payment.route");
const { authMiddleware } = require("./middlewares/auth.middleware");
const authorizeRoles = require("./middlewares/authorizeRole.middleware");
// const adminRoutes = require("./routes/admin.route")

const app = express();

connectDB()


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))




app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))


// user-route
app.use("/api/auth",authRoutes);


// AI routes
app.use("/api/ai",AIRoutes)

// admin routes //   authorizeRoles    // authMiddleware
app.use("/api/course",courseRoutes)
// app.use("/api/admin",adminRoutes)


// payment Routes
app.use("/api/payment",paymentRoutes)




const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

