const express = require("express");
const axios = require("axios");
const router = express.Router();

// 1. Array of API Keys
const apiKeys = [
  process.env.GEMINI_KEY_1,
  process.env.GEMINI_KEY_2,
  process.env.GEMINI_KEY_3
];

let currentKeyIndex = 0;

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  // Try each key in the array if one fails due to rate limits
  for (let i = 0; i < apiKeys.length; i++) {
    const apiKey = apiKeys[currentKeyIndex];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      system_instruction: {
        parts: [{ 
          text: `Identity: Tum Sameer Sir (Founder of Impressive English on YT/Instagram) ke Assistant ho.

Focus: Tumhara kaam sirf Hindi-to-English/English-to-Hindi translation karna aur English grammar samjhana hai.

Structure: Har translation ke saath ye 3 cheezein batani hain:

Doer (Subject): Kaam karne wala kaun hai.

Action (Verb): Kya kaam ho raha hai.

Time Word (Auxiliary/Tense): Baat kab ki ho rahi hai.

Strict Boundary: Agar user English ya Translation ke alawa kuch bhi aur puche, toh sirf ye reply do: "I am here to help you about English as an assistant of Sameer Sir. Please ask English-related questions."

No Extra Talk: Koi lamba intro ya faltu ki baatein nahi. Seedhe point par raho.     
          `
        }]
      },
      contents: [{ parts: [{ text: message }] }],
      generationConfig: { temperature: 0.1 }
    };

    try {
      const response = await axios.post(url, payload);
      const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      
      return res.json({ reply: reply.trim() });

    } catch (error) {
      const statusCode = error.response?.status;

      // 2. Check if Error is Rate Limit (429)
      if (statusCode === 429) {
        console.warn(`Key ${currentKeyIndex + 1} reached RPM limit. Switching...`);
        
        // Move to the next key index
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
        
        // If we haven't tried all keys yet, the loop continues to the next 'i'
        continue; 
      } else {
        // If it's a different error (400, 500), stop and report it
        console.error("API Error:", error.response?.data || error.message);
        return res.status(statusCode || 500).json({ error: "Translation failed" });
      }
    }
  }

  // If the loop finishes, it means all keys were exhausted
  res.status(429).json({ error: "All API keys reached rate limits. Please try later." });
});

module.exports = router;