# For /positions/* endpoints

# routes/positions.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict
from utils import get_current_user
from db import orders_db
from models import Order

router = APIRouter()

# ------ Endpoints ------
@router.get("/", response_model=List[Order])
# To get current open positions for the current user.
async def list_positions(current_user: Dict = Depends(get_current_user)):
    user_orders = orders_db.get(current_user["username"], [])
    positions = [o for o in user_orders if o.status == "FILLED"]
    return positions


@router.get("/{position_id}", response_model=Order)
# To get the details of a specific position for the current user.
async def get_position(position_id: str, current_user: Dict = Depends(get_current_user)):
    user_orders = orders_db.get(current_user["username"], [])
    for o in user_orders:
        if o.id == position_id and o.status == "FILLED":
            return o
    raise HTTPException(status_code=404, detail="Position not found")


@router.get("/history", response_model=List[Order])
# To get closed / archived positions (CANCELLED orders) for the current user.
async def positions_history(current_user: Dict = Depends(get_current_user)):
    user_orders = orders_db.get(current_user["username"], [])
    history = [o for o in user_orders if o.status in ("CANCELLED",)]
    return history
