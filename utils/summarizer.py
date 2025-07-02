import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configure only if key exists
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel("models/gemini-2.5-flash")
else:
    print("⚠️ GOOGLE_API_KEY not found. Gemini summarization will not work.")

def summarize_text(text: str) -> str:
    if not GOOGLE_API_KEY:
        return "❌ Gemini summarization not available. API key missing."

    prompt = f"""
You are a helpful medical assistant. Summarize the following medical report in simple language:

Report:
{text}

Summary:
"""
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"❌ Gemini API Error: {e}")
        return "❌ Error generating summary."
