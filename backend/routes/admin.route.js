// const express = require("express");
// const userModel = require("../models/user.model");
// const { authMiddleware } = require("../middlewares/auth.middleware");
// const authorizeRoles = require("../middlewares/authorizeRole.middleware");
// const router = express.Router();


// router.put("/make-admin/:id",authMiddleware, authorizeRoles("admin"), async (req,res) =>{
    
//     try {
        
//         const user = await userModel.findByIdAndUpdate(
//             req.params.id,
//             { role: "admin" },
//             { new : true }
//         )

//         return res.status(201).json({
//             message: "now, You are also a admin",
//             user
//         })

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         })
//     }
// })


// module.exports = router;

