const CourseModel = require("../models/course.model");
const sendToImgKit = require("../service/storage.sevice");



const createCourseController = async (req,res ) =>{

    try {
        const { title, price, oldPrice, discount, duration, topics, isLive } = req.body;
        if(!title || !price || !oldPrice || !discount || !duration || !topics || topics.length === 0){
            return res.status(400).json({ message: "All required fields must be provided!" });
        }
        const topicsArray = typeof topics === "string" ? topics.split(",").map(t => t.trim()) : topics;
        let imageUrl = "";

        if(req.file){
            try {
                const uploadResponse = await sendToImgKit(
                    req.file.buffer,
                    `${title.replace(/\s+/g, '_')}_${Date.now()}`
                );
                imageUrl = uploadResponse.url; // Ab database mein ImageKit ka dynamic URL jayega
            } catch (imgError) {
                console.error("ImageKit Upload Error:", imgError);
                return res.status(500).json({ message: "Image upload failed, course not created." });
            }
        }

        const newCourse = await CourseModel.create({
            title: title.trim(),
            price,oldPrice,
            discount: discount.trim() ,
            duration:duration.trim(),
            topics: topicsArray,
            img: imageUrl,
            isLive: isLive || false
        })
        
        return res.status(201).json({
            success: true,
            message: "new Course Created",
            course: newCourse
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const getAllCourseController = async (req,res) =>{
    try {

        const courses = await CourseModel.find({});

        return res.status(200).json({
            success: true,
            courses,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const addVideosToCourseController = async (req,res) =>{
    try {
        
        const { courseId } = req.params;

        const { title, description, duration } = req.body;
        if (!title || !duration) {
            return res.status(400).json({ 
                success: false, 
                message: "Title and duration are required" 
            });
        }

        const videoFile = req.file;
        if (!videoFile) {
            return res.status(400).json({ 
                success: false, 
                message: "Please upload a video file" 
            });
        }

        let videoURL = ""

        if(videoFile){
            try {
                const uploadResponse = await sendToImgKit(
                    videoFile.buffer,
                    `${title.replace(/\s+/g, '_')}_${Date.now()}.mp4`
                );
                videoURL= uploadResponse.url; // Ab database mein ImageKit ka dynamic URL jayega
            } catch (imgError) {
                console.error("ImageKit Upload Error:", imgError);
                return res.status(500).json({ message: "Image upload failed, course not created." });
            }
        }



        const updatedCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    videos: { title, 
                        description, 
                        url : videoURL, 
                        duration }
                }
            },
            { new: true }
        )

        if (!updatedCourse) {
            return res.status(404).json({ 
                success: false, 
                message: "Course not found" 
            });
        }

        return res.status(200).json({
            success: true,
            message: "Video added successfully",
            course: updatedCourse
        });



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports = { createCourseController , getAllCourseController,addVideosToCourseController }