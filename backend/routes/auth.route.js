const express = require("express");
const { userRegisterController, userLoginController, userCurrentLoginController } = require("../controllers/auth.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();


router.get("/current-user",authMiddleware,userCurrentLoginController)


router.post("/register", userRegisterController)
router.post("/login",userLoginController);





module.exports = router