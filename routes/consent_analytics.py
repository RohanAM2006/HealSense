from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/analytics/consent-summary")
async def get_consent_summary(user_id: str = Query(...)):
    # Replace this mock data with real MongoDB logic later
    mock_data = {
        "total_consents": 25,
        "granted": 20,
        "revoked": 5,
        "last_30_days": 10,
        "per_doctor": {
            "doctor Rohan": 15,
            "doctor Rohith": 10
        }
    }
    return JSONResponse(content=mock_data)
