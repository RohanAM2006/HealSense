# === models/goal_model.py ===
from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime

class Goal(BaseModel):
    id: Optional[str] = None
    user_id: str
    goal: str
    type: str
    target: float
    current: float
    deadline: Optional[datetime] = None
    status: Optional[Literal["achieved", "in-progress", "at-risk"]] = None