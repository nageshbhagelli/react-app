# For Pydantic schemas


# Models of ./routes/auth.py
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

# class ResetPasswordRequest(BaseModel):
#     password: str


# Models of ./routes/orders.py
class Order(BaseModel):
    id: str
    symbol: str
    quantity: int
    order_type: str # MARKET, LIMIT
    side: str       # BUY, SELL
    status: str     # OPEN, FILLED, CANCELLED
    timestamp: datetime
    price: float

class OrderCreate(BaseModel):
    symbol: str
    quantity: int
    order_type: str # MARKET, LIMIT
    side: str       # BUY, SELL
    price: float


# Models of ./routes/trades.py

class Trade(BaseModel):
    id: str
    symbol: str
    side: str   
    quantity: float
    price: float
    timestamp: datetime
    order_id: Optional[str] = None

class TradeCreate(BaseModel):
    symbol: str
    side: str
    quantity: float
    price: float
