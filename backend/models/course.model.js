const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true, 
            trim: true 
        },
        description: { 
            type: String, 
        },
        price: { 
            type: Number, 
            required: true 
        },
        oldPrice: {
            type: Number,
            required: true,
        },
        discount: { 
            type: String,
            required: true,
        },
        duration: { // how long you have access of this course
            type: String ,
            required: true,
        },
        instructor: { 
            type: String,
            default: "sameer sir"
        },
        topics: [ String ],
        img: {
            type: String,
            default: ""
        },
        isLive: {
            type: Boolean,
            default: false
        },

        // for adding vidoes after creating course
        videos: [
            {
                title: {
                    type: String,
                    required: true
                },
                description: { 
                    type: String 
                },    
                url: { 
                    type: String, 
                    required: true 
                },
                duration: { 
                    type: String,
                    required: true
                }     
            }
        ],
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
});

const CourseModel = mongoose.model("courses", courseSchema);
module.exports = CourseModel
