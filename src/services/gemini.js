import { GoogleGenerativeAI } from "@google/generative-ai";

// IMPORTANT: Replace 'YOUR_GEMINI_API_KEY' with your actual API key from Google AI Studio
// Get yours at: https://aistudio.google.com/
const API_KEY = "YOUR_GEMINI_API_KEY";

const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiResponse = async (userMessage, history = []) => {
  try {
    if (API_KEY === "YOUR_GEMINI_API_KEY") {
      return "Please set your Gemini API key in src/services/gemini.js to enable the AI ChatBot.";
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I encountered an error while processing your request. Please check your API key or connection.";
  }
};
