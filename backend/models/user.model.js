const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      default: null, 
    },
    googleId: {
      type: String,
      default: null,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user'
    },
    activeToken: {
      type: String, 
    },
    purchaseCourse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses"
      }
    ]
  },
  {
    timestamps: true,
  }
);


const userModel = mongoose.model("users",userSchema)

module.exports = userModel