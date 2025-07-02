# routes/consent.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ConsentRequest(BaseModel):
    user_id: str
    doctor_id: str
    method: str
    language: str

@router.post("/grant-consent")
async def grant_consent(data: ConsentRequest):
    # Implement your logic here (e.g., store to DB, send email, etc.)
    return {"message": "Consent granted successfully!"}
