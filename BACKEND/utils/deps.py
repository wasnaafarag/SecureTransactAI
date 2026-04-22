from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from models.user import TokenData, UserInDB
from utils.security import SECRET_KEY, ALGORITHM
from database.connection import db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="ST-Governance Alert: Session identity could not be verified",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        role: str = payload.get("role")
        company_id: str = payload.get("company_id")
        
        if username is None:
            raise credentials_exception
            
        token_data = TokenData(username=username, role=role, company_id=company_id)
        return token_data
    except JWTError:
        raise credentials_exception

async def get_current_active_admin(current_user: TokenData = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Authority Violation: Access restricted to Governance Unit Administrators"
        )
    return current_user

async def get_current_active_investigator(current_user: TokenData = Depends(get_current_user)):
    if current_user.role not in ["admin", "investigator"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Authority Violation: Access restricted to Forensic Investigation Units"
        )
    return current_user