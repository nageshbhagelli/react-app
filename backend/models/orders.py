# Models of ./routes/orders.py

from pydantic import BaseModel
from datetime import datetime


class Order(BaseModel):
    id: str
    symbol: str
    quantity: int
    order_type: str # MARKET, LIMIT
    side: str       # BUY, SELL
    status: str     # OPEN, FILLED, CANCELLED
    timestamp: datetime
    price: Optional[float] = None

class OrderCreate(BaseModel):
    symbol: str
    quantity: int
    order_type: str # MARKET, LIMIT
    side: str       # BUY, SELL
    price: float
