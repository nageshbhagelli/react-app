# models/instrument.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Instrument(BaseModel):
    symbol: str
    name: Optional[str]
    instrument_type: str  # EQUITY, OPTION, FUTURE, COMMODITY, etc.
    exchange: Optional[str]
    expiry: Optional[datetime] = None      # For derivatives
    strike_price: Optional[float] = None   # For options
    option_type: Optional[str] = None      # CALL or PUT