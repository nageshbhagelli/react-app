# For /trades/* endpoints => a filled order will become a trade

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from utils import get_current_user
from db import user_db, trades_db
from models.trades import Trade, TradeCreate

router = APIRouter()

# ------ Models ------ #
# imported from models.py

# ------ In memory DB ------ #
# trades_db: Dict[str, List[Trade]] = {}
# # key: username & value: list of trades

# ------ Routes ------ #

@router.get("/", response_model=List[Trade])
# To get all trades for the current user.
async def get_trades(current_user: Dict = Depends(get_current_user)):
    return trades_db.get(current_user["username"], [])

@router.post("/", response_model=Trade)
# To record a new trade for the current user.
async def create_trade(trade_request: TradeCreate, current_user: Dict = Depends(get_current_user)):
    new_trade = Trade(
        id=str(uuid4()),
        symbol=trade_request.symbol.upper(),
        side=trade_request.side.upper(),
        quantity=trade_request.quantity,
        price=trade_request.price,
        timestamp=datetime.utcnow(),
        order_id=trade_request.order_id
    )

    if current_user["username"] not in trades_db:
        trades_db[current_user["username"]] = []
        # same as trades_db.setdefault(current_user["username"], [])

    trades_db[current_user["username"]].append(new_trade)
    return new_trade

@router.get("/{trade_id}", response_model=Trade)
# To get the details of a specific trade for the current user.
async def get_trade(trade_id: str, current_user: Dict = Depends(get_current_user)):
    user_trades = trades_db.get(current_user["username"], [])
    for t in user_trades:
        if t.id == trade_id:
            return t

    raise HTTPException(status_code=404, detail="Trade not found")

@router.get("/recent", response_model=List[Trade])
# To get the recent trades for the current user.
async def get_recent_trades(limit: int = 5, current_user: Dict = Depends(get_current_user)):
    user_trades = trades_db.get(current_user["username"], [])
    return sorted(user_trades, key=lambda t: t.timestamp, reverse=True)[:limit]

