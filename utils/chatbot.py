import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configure Gemini model if API key is available
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel("models/gemini-2.5-flash")
else:
    print("⚠️ GOOGLE_API_KEY not found. Gemini chatbot will not work.")

def get_ai_response(question: str) -> str:
    if not GOOGLE_API_KEY:
        return "❌ Gemini AI Chat is unavailable. API key missing."

    prompt = f"""
You are a professional AI medical assistant. Please answer the following user query clearly, concisely, and accurately in easy-to-understand terms.

User Question:
{question}

Answer:
"""
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"❌ Gemini Chatbot Error: {e}")
        return "❌ Error generating AI response."
