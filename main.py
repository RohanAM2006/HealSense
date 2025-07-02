from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from datetime import datetime
from typing import List, Literal
from pydantic import BaseModel
import shutil
import os
from bson import ObjectId

# ✅ Import routes here
from routes import consent
from routes import goals
from routes import auth
from routes import consent_analytics  # ✅ Fixed this line

# ✅ Import utils here
from utils.extractor import extract_text_from_file
from utils.summarizer import summarize_text
from utils.healthscore import compute_health_score
from utils.chatbot import get_ai_response




# === Load environment variables ===
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# === MongoDB Setup ===
client = AsyncIOMotorClient(MONGO_URI)
db = client["health_ai"]
reports_collection = db["reports"]
vitals_collection = db["vitals"]
goals_collection = db["goals"]  # ⬅️ New goals collection

# Vitals Model
class Vitals(BaseModel):
    heartRate: int
    sugar: int
    oxygen: int
    timestamp: datetime = datetime.utcnow()

# Goal Model
class Goal(BaseModel):
    id: str | None = None
    goal: str
    type: str
    target: str
    current: str
    status: Literal["achieved", "in-progress", "at-risk"]

# === Upload Directory ===
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# === Initialize FastAPI ===
app = FastAPI()

# === Include Consent Router ===
app.include_router(consent.router, prefix="/consent")
app.include_router(goals.router, prefix="/goals")
app.include_router(auth.router, prefix="/auth")  # ✅ Adds /auth/register and /auth/login routes
app.include_router(consent_analytics.router)   # ✅ Mounts the route
# === Enable CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Analyze Report Endpoint ===
@app.post("/analyze")
async def analyze_file(file: UploadFile = File(...)):
    try:
        filepath = os.path.join(UPLOAD_DIR, file.filename)

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        extracted_text = extract_text_from_file(filepath)
        summary = summarize_text(extracted_text)
        health_score = compute_health_score(summary)

        report_doc = {
            "filename": file.filename,
            "summary": summary,
            "extracted_text": extracted_text[:1000],
            "timestamp": datetime.now().isoformat(),
            "health_score": health_score
        }
        result = await reports_collection.insert_one(report_doc)

        return {
            "summary": summary,
            "original_text": extracted_text[:300],
            "health_score": health_score,
            "report_id": str(result.inserted_id)
        }

    except Exception as e:
        print("❌ Error during analysis:", e)
        return {"error": str(e)}

# === Reports ===
@app.get("/reports")
async def get_reports():
    reports = []
    async for doc in reports_collection.find().sort("timestamp", -1):
        doc["_id"] = str(doc["_id"])
        reports.append(doc)
    return {"reports": reports}

# === Latest Health Score ===
@app.get("/health-score")
async def get_latest_score():
    latest = await reports_collection.find_one(sort=[("timestamp", -1)])
    if not latest:
        return {"score": 0}
    return {"score": latest.get("health_score", 0)}

# === AI Chat ===
class Query(BaseModel):
    question: str

@app.post("/ask")
async def ask_question(query: Query):
    answer = get_ai_response(query.question)
    return {"answer": answer}

# === Vitals Logging ===
@app.post("/vitals")
async def log_vitals(vitals: Vitals):
    vitals_dict = vitals.dict()
    await vitals_collection.insert_one(vitals_dict)
    return {"message": "Vitals logged successfully"}

@app.get("/vitals", response_model=List[Vitals])
async def get_vitals():
    vitals_data = []
    async for doc in vitals_collection.find({}, {"_id": 0}):
        vitals_data.append(doc)
    return vitals_data

# === GOALS FEATURE 🚀 ===

@app.get("/goals")
async def get_goals():
    goals = []
    async for doc in goals_collection.find().sort("goal", 1):
        doc["_id"] = str(doc["_id"])
        goals.append(doc)
    return goals

@app.post("/goals")
async def create_goal(goal: Goal):
    goal_dict = goal.dict(exclude={"id"})
    result = await goals_collection.insert_one(goal_dict)
    goal_dict["id"] = str(result.inserted_id)
    return goal_dict

@app.patch("/goals/{goal_id}")
async def update_goal(goal_id: str, updated: Goal):
    result = await goals_collection.update_one(
        {"_id": ObjectId(goal_id)},
        {"$set": updated.dict(exclude={"id"})}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Goal not found")
    return {"message": "Goal updated"}
