# For /auth/* endpoints

from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from typing import Optional, Dict

from db import user_db
from utils import (
    verify_password,
    get_password_hash,
    authenticate_user,
    create_access_token,
    get_current_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
# from ..models import User, UserCreate, Token, ForgotPasswordRequest, RefreshTokenRequest

# For helper functions. (hashing, jwt, etc.)
# from utils import authenticate_user, create_access_token

# Router
router = APIRouter()

# ------ Models ------
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    username: str
    email: EmailStr

class RefreshTokenRequest(BaseModel):
    token: str 

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

# ------ Utility functions ------
def authenticate_user(username: str, password: str):
    user = user_db.get(username)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user

# def create_refresh_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(days=7))
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# --- Routes ---
@router.post("/signup")
async def signup(user: UserCreate = Body(...)):
    if user.username in user_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    for u in user_db.values():
        if u["email"] == user.email:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    if len(user.password) < 6:
        raise HTTPException(status_code=400, detail="Password too short")
    
    user_db[user.username] = {
        "username": user.username,
        "email": user.email,
        "hashed_password": get_password_hash(user.password)
    }
    
    return {"message": "User registered successfully"}


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=User)
async def get_me(current_user: Dict = Depends(get_current_user)):
    return User(username=current_user["username"], email=current_user["email"])


@router.post("/logout")
async def logout(token: str = Body(...)):
    # Logic to invalidate the token goes here
    return {"message": "Logout successful. (token invalidation not implemented)"}


@router.post("/refresh-token", response_model=Token)
async def refresh_token(refresh_token_request: RefreshTokenRequest):
    username = None
    try:
        from jose import JWTError
        from utils import SECRET_KEY, ALGORITHM
        payload = jwt.decode(refresh_token_request.token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
        
    if username is None or username not in user_db:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    new_token = create_access_token(
        data={"sub": username}, 
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": new_token, "token_type": "bearer"}


@router.post("/forgot-password", response_model=Token)
async def forgot_password(email: EmailStr = Body(...)):
    # Logic to send password reset email goes here
    return {"message": "Password reset email sent successfully"}


# @router.post("/reset-password", response_model=Token)
# async def reset_password(token: str = Body(...), new_password: str = Body(...)):
#     # Logic to reset password goes here
#     return {"message": "Password reset successfully"}