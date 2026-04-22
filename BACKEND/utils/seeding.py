
from database.connection import db
from models.user import UserInDB
from utils.security import get_password_hash

async def seed_users():
    users_to_seed = [
        {"username": "admin", "password": "admin123", "role": "admin", "email": "admin@secure.com", "company_id": "FIN_GUARD_SEC"},
        {"username": "investigator", "password": "password", "role": "investigator", "email": "investigator@secure.com", "company_id": "FIN_GUARD_SEC"},
        {"username": "user", "password": "password", "role": "user", "email": "user@secure.com", "company_id": "FIN_GUARD_SEC"}
    ]

    for user in users_to_seed:
        existing = await db.get_db()["users"].find_one({"username": user["username"]})
        if not existing:
            hashed = get_password_hash(user["password"])
            user_db = UserInDB(
                username=user["username"],
                hashed_password=hashed,
                email=user["email"],
                role=user["role"],
                company_id=user.get("company_id", "GLOBAL_PLATFORM")
            )
            await db.get_db()["users"].insert_one(user_db.dict())
            print(f"[+] Seeded {user['role'].capitalize()}: {user['username']}")
        else:
            print(f"[*] User {user['username']} already exists.")
