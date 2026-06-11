const razorpayInstance = require("../config/razorpay.config");
const crypto = require("crypto");
const userModel = require("../models/user.model");

const checkoutController = async (req,res) =>{
    
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // paise me convert
            currency: "INR",
        };

        const order = await razorpayInstance.orders.create(options);

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


const paymentVerificationController = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      console.log("Payment Verified ✅");

      // USER ID (auth middleware se aayega)
      const userId = req.user._id;

      //  COURSE ADD KAR DO (duplicate avoid)
      await userModel.findByIdAndUpdate(
        userId,
        {
          $addToSet: { purchaseCourse: courseId },
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Payment verified & course added",
      });

    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = { checkoutController , paymentVerificationController }