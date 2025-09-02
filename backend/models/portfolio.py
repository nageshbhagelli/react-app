# models/portfolio.py
from pydantic import BaseModel
from typing import List, Optional, Dict, 
from datetime import datetime

class PortfolioPosition(BaseModel):
    # Representation: A single holding in the portfolio. 
    # Updation: based on executed trades.
    user_id: str
    symbol: str
    instrument_type: str  # EQUITY, OPTION, etc.
    quantity: float
    avg_buy_price: float
    current_price: Optional[float] = None
    pnl_unrealized: Optional[float] = None
    pnl_realized: Optional[float] = None
    expiry: Optional[datetime] = None
    strike_price: Optional[float] = None
    option_type: Optional[str] = None  # CALL or PUT
    last_updated: Optional[datetime] = None

class Portfolio(BaseModel):
    # Shows: User's overall portfolio info.
    user_id: str
    total_value: float
    realized_pnl: float
    unrealized_pnl: float
    positions: List[PortfolioPosition] = []

class PortfolioDistribution(BaseModel):
    # For: Portfolio analysis
    user_id: str,
    total_value: float,
    by_instrument_type: Dict[str, float]
    by_option_type: Optional[Dict[str, float]] = None
    timestamp: datetime


