from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional, Dict

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
SECRET_KEY = "your_secret_key_here_change_this"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# In-memory user database
user_db: Dict[str, Dict] = {}

# Pydantic Models
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


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


# Utility Functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(username: str, password: str):
    user = user_db.get(username)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# API Endpoints
@app.post("/register")
async def register(user: UserCreate = Body(...)):
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


@app.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    user = None
    for u in user_db.values():
        if u["email"] == request.email:
            user = u
            break
    if not user:
        raise HTTPException(status_code=404, detail="Email not registered")
    # In real app: send reset email. Here dummy response.
    return {"message": "If your email is registered, password reset instructions will be sent."}


@app.get("/users/me", response_model=User)
async def read_users_me(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None or username not in user_db:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        user = user_db[username]
        return User(username=user["username"], email=user["email"])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")


@app.get("/market/indices")
async def get_indices():
    return ["NIFTY 50", "SENSEX", "BANK NIFTY"]


@app.get("/market/top-gainers")
async def get_top_gainers():
    return [
        {"symbol": "RELIANCE", "status": "Live", "change": "+2.5%"},
        {"symbol": "TCS", "status": "Live", "change": "+1.8%"},
        {"symbol": "INFY", "status": "Live", "change": "+1.2%"},
    ]
