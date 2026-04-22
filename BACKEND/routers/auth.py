
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from database.connection import db
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from typing import List
from database.connection import db
from models.user import UserCreate, Token, UserInDB, TokenData, VirtualCard
from utils.security import verify_password, get_password_hash, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from utils.deps import get_current_user
import random
import datetime

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/cards/create", response_model=VirtualCard)
async def create_card(current_user: TokenData = Depends(get_current_user)):
    
    card_num = "".join([str(random.randint(0, 9)) for _ in range(16)])
    formatted_num = " ".join([card_num[i:i+4] for i in range(0, 16, 4)])
    
    cvv = str(random.randint(100, 999))
    
    
    now = datetime.datetime.now()
    expiry = f"{(now.month):02d}/{str(now.year + 3)[-2:]}"
    
    new_card = VirtualCard(
        card_number=formatted_num,
        card_holder=current_user.username.upper(),
        expiry_date=expiry,
        cvv=cvv,
        card_type=random.choice(["Visa", "Mastercard"])
    )
    
    await db.get_db()["users"].update_one(
        {"username": current_user.username},
        {"$push": {"virtual_cards": new_card.dict()}}
    )
    
    return new_card

@router.get("/cards", response_model=List[VirtualCard])
async def list_cards(current_user: TokenData = Depends(get_current_user)):
    user = await db.get_db()["users"].find_one({"username": current_user.username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user.get("virtual_cards", [])

@router.delete("/cards/{card_id}")
async def delete_card(card_id: str, current_user: TokenData = Depends(get_current_user)):
    users_coll = db.get_db()["users"]
    
    
    result = await users_coll.update_one(
        {"username": current_user.username},
        {"$pull": {"virtual_cards": {"id": card_id}}}
    )
    
    
    if result.modified_count == 0 and current_user.role == "admin":
        result = await users_coll.update_one(
            {"virtual_cards.id": card_id},
            {"$pull": {"virtual_cards": {"id": card_id}}}
        )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Card not found or access denied")
        
    return {"message": "Card deleted successfully (Administrative Override Active)"}

@router.post("/register", response_model=Token)
async def register(user: UserCreate, role: str = "user"):
    existing_user = await db.get_db()["users"].find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user.password)
    
    user_data = user.dict()
    user_data["role"] = role
    
    
    user_db = UserInDB(
        **user_data,
        hashed_password=hashed_password
    )
    
    await db.get_db()["users"].insert_one(user_db.dict())
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "role": role, "company_id": user_db.company_id}, 
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.get_db()["users"].find_one({
        "$or": [
            {"username": form_data.username},
            {"email": form_data.username}
        ]
    })
    
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    
    user_company = user.get("company_id") or "GLOBAL_PLATFORM"
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={
            "sub": user["username"], 
            "role": user.get("role", "user"),
            "company_id": user_company
        }, 
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
async def get_me(current_user: TokenData = Depends(get_current_user)):
    user = await db.get_db()["users"].find_one({"username": current_user.username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user["_id"] = str(user["_id"])
    if "hashed_password" in user:
        del user["hashed_password"]
    return user

@router.post("/onboarding/complete")
async def complete_onboarding(current_user: TokenData = Depends(get_current_user)):
    await db.get_db()["users"].update_one(
        {"username": current_user.username},
        {"$set": {"is_first_login": False}}
    )
    return {"message": "Onboarding completed"}

@router.post("/admin/create_user", response_model=Token)
async def create_user_admin(user: UserCreate, role: str, current_user: TokenData = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    existing_user = await db.get_db()["users"].find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user.password)
    
    user_data = user.dict()
    user_data["role"] = role
    
    user_data["company_id"] = current_user.company_id
    
    user_db = UserInDB(
        **user_data,
        hashed_password=hashed_password
    )
    
    await db.get_db()["users"].insert_one(user_db.dict())
    
    access_token = create_access_token(
        data={"sub": user.username, "role": role, "company_id": user_db.company_id}, 
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users")
async def get_users(current_user: TokenData = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    
    users_cursor = db.get_db()["users"].find({"company_id": current_user.company_id})
    users = await users_cursor.to_list(length=100)
    
    for user in users:
        user["_id"] = str(user["_id"])
        del user["hashed_password"]
        
    return users

@router.put("/users/{username}")
async def update_user(username: str, user_update: dict, current_user: TokenData = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    
    target_user = await db.get_db()["users"].find_one({"username": username})
    if not target_user or target_user.get("company_id") != current_user.company_id:
        raise HTTPException(status_code=403, detail="Not authorized to update users outside your company")

    update_data = {k: v for k, v in user_update.items() if v is not None}
    
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data["password"])
        del update_data["password"]
    
    result = await db.get_db()["users"].update_one(
        {"username": username, "company_id": current_user.company_id},
        {"$set": update_data}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found or no changes made")
        
    return {"message": "User updated successfully"}

@router.delete("/users/{username}")
async def delete_user(username: str, current_user: TokenData = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
        
    if username == current_user.username:
         raise HTTPException(status_code=400, detail="Cannot delete yourself")
    
    result = await db.get_db()["users"].delete_one({"username": username, "company_id": current_user.company_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found or access denied")
        
    return {"message": "User deleted successfully"}

@router.get("/recipients")
async def get_recipients(current_user: TokenData = Depends(get_current_user)):
    
    
    query = {
        "username": {"$ne": current_user.username}
    }
    
    if current_user.company_id == "GLOBAL_PLATFORM":
        query["$or"] = [
            {"company_id": "GLOBAL_PLATFORM"},
            {"company_id": {"$exists": False}},
            {"company_id": None}
        ]
    else:
        query["company_id"] = current_user.company_id

    users_cursor = db.get_db()["users"].find(query, {"username": 1, "_id": 0})
    users = await users_cursor.to_list(length=100)
    return [u["username"] for u in users]
