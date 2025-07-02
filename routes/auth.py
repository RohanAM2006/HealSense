# routes/auth.py
from fastapi import APIRouter, HTTPException
from models.user_model import UserIn, UserOut, UserLogin
from database.mongo import users_collection
from utils.auth_utils import hash_password, verify_password, create_token
from bson import ObjectId

router = APIRouter()

@router.post("/register")
async def register(user: UserIn):
    try:
        if await users_collection.find_one({"email": user.email}):
            raise HTTPException(status_code=400, detail="Email already registered")
        user_dict = user.dict()
        user_dict["password"] = hash_password(user.password)
        result = await users_collection.insert_one(user_dict)
        return {"message": "User created", "user_id": str(result.inserted_id)}
    except Exception as e:
        print("❌ Registration error:", e)
        raise HTTPException(status_code=500, detail="Server error")

@router.post("/login")
async def login(data: UserLogin):
    user = await users_collection.find_one({"email": data.email})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"user_id": str(user["_id"])})
    return {"access_token": token, "user": {"name": user["name"], "email": user["email"]}}
