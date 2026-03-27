const express = require("express");
const {checkoutController, paymentVerificationController} = require("../controllers/payment.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();


router.post("/checkout",checkoutController);

router.post("/verify",authMiddleware,paymentVerificationController);




module.exports = router