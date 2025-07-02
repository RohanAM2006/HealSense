# routes/goals.py
from fastapi import APIRouter, Depends, HTTPException
from models.goal_model import Goal
from database.mongo import goals_collection
from bson import ObjectId
from utils.auth_utils import get_current_user
from utils.status_calc import calculate_status

router = APIRouter()

@router.get("/")
async def get_goals(user_id: str = Depends(get_current_user)):
    goals = []
    async for doc in goals_collection.find({"user_id": user_id}):
        doc["id"] = str(doc.pop("_id"))  # ✅ fix ID field
        goals.append(doc)
    return goals
