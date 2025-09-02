# For /positions/* endpoints

# routes/positions.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict
from utils import get_current_user, get_open_positions, get_closed_positions
from db import orders_db
from models.orders import Order

router = APIRouter()

# ------ Endpoints ------
@router.get("/", response_model=List[Order])
# To get current open positions for the current user.
async def list_positions(current_user: Dict = Depends(get_current_user)):
    return get_open_positions(current_user["username"])


@router.get("/{position_id}", response_model=Order)
# To get the details of a specific position for the current user.
async def get_position(position_id: str, current_user: Dict = Depends(get_current_user)):
    user_positions = get_open_positions(current_user["username"])
    for p in user_positions:
        if p.id == position_id:
            return p
    raise HTTPException(status_code=404, detail="Position not found")


@router.get("/history", response_model=List[Order])
# To get closed / archived positions (CANCELLED orders) for the current user.
async def positions_history(current_user: Dict = Depends(get_current_user)):
    return get_closed_positions(current_user["username"])

