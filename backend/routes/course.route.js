const express = require("express");
const { createCourseController, getAllCourseController, addVideosToCourseController } = require("../controllers/course.controller");
const upload = require("../service/multer.service");
const { authMiddleware } = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/authorizeRole.middleware");

const router = express.Router();

// for course
router.get("/",getAllCourseController)



// for videos
router.post("/add-videos/:courseId",authMiddleware,authorizeRoles,upload.single("video"),addVideosToCourseController)
router.post("/create",upload.single("image"),authMiddleware,authorizeRoles,createCourseController)

module.exports = router;

// CREATE a new course


// GET all courses for admin
// router.get("/admin-courses/:adminId", async (req, res) => {
//     const { adminId } = req.params;
//     const courses = await CourseModel.find({ admin: adminId });
//     res.json(courses);
// });
// UPDATE a course
// router.put("/update-course/:id", async (req, res) => {
//     await Course.findByIdAndUpdate(req.params.id, req.body);
//     res.json({ message: "Course updated successfully!" });
// });

// DELETE a course
// router.delete("/delete-course/:id", async (req, res) => {
//     await Course.findByIdAndDelete(req.params.id);
//     res.json({ message: "Course deleted successfully!" });
// });
