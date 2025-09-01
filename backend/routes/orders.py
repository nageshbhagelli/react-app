# For /orders/* endpoints

from fastapi import APIRouter, Depends, HTTPException, Body
from pydantic import BaseModel
from typing import Optional, List, Dict
from uuid import uuid4
from datetime import datetime

from utils import get_current_user
from db import user_db, orders_db
from models import Order, OrderCreate, Trade

router = APIRouter()

#  ------ Models ------ #
# imported from models.py

# # ------ In memory DB ------ #
# orders_db: Dict[str, List[Order]] = {}
# # key: username & value: list of orders

# ------ Routes ------ #
@router.get("/", response_model=List[Order])
# To get all orders for the current user.
async def get_orders(current_user: Dict = Depends(get_current_user)):
    return orders_db.get(current_user["username"], [])

@router.post("/", response_model=Order)
# To create a new order for the current user.
async def create_order(order_request: OrderCreate, current_user: Dict = Depends(get_current_user)):
    new_order = Order(
        id=str(uuid4()),
        symbol=order_request.symbol,
        quantity=order_request.quantity,
        order_type=order_request.order_type.upper(),
        side=order_request.side.upper(),
        status="OPEN",
        price=order_request.price
        timestamp=datetime.utcnow(),
    )

    if current_user["username"] not in orders_db:
        orders_db[current_user["username"]] = []
        # same as orders_db.setdefault(current_user["username"], [])

    orders_db[current_user["username"]].append(new_order)
    return new_order
   
@router.get("/{order_id}", response_model=Order)
# To get the details of a specific order for the current user.
async def get_order(order_id: str, current_user: Dict = Depends(get_current_user)):
    user_orders = orders_db.get(current_user["username"], [])
    for o in user_orders:
        if o.id == order_id:
            return o

    raise HTTPException(status_code=404, detail="Order not found") 

@router.patch("/{order_id}/cancel", response_model=Order)
# To cancel a specific order for the current user.
async def cancel_order(order_id: str, current_user: Dict = Depends(get_current_user)):
    user_orders = orders_db.get(current_user["username"], [])
    for o in user_orders:
        if o.id == order_id:
            if o.status != "OPEN":
                raise HTTPException(status_code=400, detail="Order is not open")
            o.status = "CANCELLED"
            return o

    raise HTTPException(status_code=404, detail="Order not found")

@router.patch("/{order_id}/fill", response_model=Order)
# To fill a specific order for the current user.
async def fill_order(order_id: str, current_user: Dict = Depends(get_current_user)):
    user_orders = orders_db.get(current_user["username"], [])
    for o in user_orders:
        if o.id == order_id:
            if o.status != "OPEN":
                raise HTTPException(status_code=400, detail="Order is not open")
            o.status = "FILLED"

            # Creating the trade entry.
            trade = Trade(
                id=str(uuid4()),
                symbol=o.symbol,
                side=o.side,
                quantity=o.quantity,
                price=o.price,
                timestamp=datetime.utcnow(),
                order_id=o.id
            )
            trades_db[current_user["username"]].setdefault(o.symbol, []).append(trade)

            return o

    raise HTTPException(status_code=404, detail="Order not found")

@router.get("/recent", response_model=List[Order])
# To get the recent orders for the current user.
async def get_recent_orders(limit: int = 5, current_user: Dict = Depends(get_current_user)):
    user_orders = orders_db.get(current_user["username"], [])
    return sorted(user_orders, key=lambda o: o.timestamp, reverse=True)[:limit]