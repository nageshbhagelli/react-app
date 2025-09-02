
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from models.portfolio import Portfolio, PortfolioPosition, PortfolioDistribution
from models.auth import User
from utils import get_current_user
from db import portfolios_db

router = APIRouter()

@router.get("/", response_model=Portfolio)
async def get_portfolio(current_user: User = Depends(get_current_user)):
    portfolio = portfolios_db.get(current_user["username"], {})
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio

# @router.get("/portfolio", response_model=User)
# async def get_portfolio(current_user: User = Depends(get_current_user)):
    
#     open_positions = get_open_positions(current_user["username"])
#     closed_positions = get_closed_positions(current_user["username"])
#     trades = get_current_user_trades(current_user["username"])

#     # --- Compute P&L ---
#     realized_pnl = sum([
#         (t.price * t.qty if t.side == "SELL" else -t.price * t.qty)
#         for t in trades
#     ])
#     unrealized_pnl = sum([
#         (p.price * p.qty if p.side == "SELL" else -p.price * p.qty)
#         for p in open_positions
#     ])

#     allocation = dict()
#     for p in open_positions:
#         allocation[p.symbol] = allocation.get(p.symbol, 0) + p.qty

#     return {
#         "user": current_user,
#         "open_positions": [p.dict() for p in open_positions],
#         "closed_positions_count": len(closed_positions),
#         "realized_pnl": realized_pnl,
#         "unrealized_pnl": unrealized_pnl,
#         "allocation": allocation,
#         "total_value": realized_pnl + unrealized_pnl
#     }

@router.get("/positions", response_model=List[PortfolioPosition])
# To get all positions held by the current user.
async def get_positions(current_user: User = Depends(get_current_user)):
    portfolio = get_portfolio(current_user["username"])
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio.positions
    

@router.get("/distribution", response_model=PortfolioDistribution)
# To get the current user's portfolio distribution
async def get_distribution(current_user: User = Depends(get_current_user)):
    # For now, return mock data
    distribution = PortfolioDistribution(
        user_id=user["id"],
        total_value=100000.0,
        by_instrument_type={"EQUITY": 60000.0, "OPTION": 40000.0},
        by_option_type={"CALL": 25000.0, "PUT": 15000.0},
        timestamp=datetime.utcnow(),
    )
    return distribution