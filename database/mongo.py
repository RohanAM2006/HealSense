from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

client = AsyncIOMotorClient(MONGO_URI)
db = client["health_ai"]

users_collection = db["users"]
goals_collection = db["goals"]
vitals_collection = db["vitals"]
reports_collection = db["reports"]
{
  "user_id": "user123",
  "doctor_id": "doctor456",
  "method": "biometric",
  "language": "English",
  "status": "granted",   "revoked"
  "timestamp": "2025-07-02T10:15:00Z"
}



