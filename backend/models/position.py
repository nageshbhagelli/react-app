# app/schemas/position.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PortfolioPosition(BaseModel):
    user_id: str
    symbol: str
    quantity: float
    avg_buy_price: float
    current_price: Optional[float] = None
    pnl_unrealized: Optional[float] = None
    pnl_realized: Optional[float] = None
    instrument_type: str  # EQUITY, OPTION, etc.
    expiry: Optional[datetime] = None
    strike_price: Optional[float] = None
    option_type: Optional[str] = None      # CALL or PUT
    last_updated: Optional[datetime] = None
