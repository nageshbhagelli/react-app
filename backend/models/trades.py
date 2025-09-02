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
