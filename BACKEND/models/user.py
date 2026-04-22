
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from enum import Enum
from bson import ObjectId
import uuid

class UserRole(str, Enum):
    ADMIN = "admin"
    INVESTIGATOR = "investigator"
    USER = "user"

class VirtualCard(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    card_number: str
    card_holder: str
    expiry_date: str
    cvv: str
    card_type: str = "Mastercard"
    status: str = "Active"

class UserBase(BaseModel):
    username: str
    email: Optional[str] = None
    role: UserRole = UserRole.USER
    company_id: str = "GLOBAL_PLATFORM"  
    is_first_login: bool = True           
    balance: float = Field(default=1000.0, description="Available account balance in USD")
    virtual_cards: List[VirtualCard] = []

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    hashed_password: str

class User(UserBase):
    
    pass

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None
    company_id: Optional[str] = None
