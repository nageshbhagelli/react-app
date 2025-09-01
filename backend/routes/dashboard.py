# For /dashboard/* endpoints

# routes/dashboard.py
from fastapi import APIRouter, Depends
from typing import Dict, Any
from utils import get_current_user
from db import orders_db, trades_db

router = APIRouter()

# ------ Endpoints -------
@router.get("/summary")
# To get the summary of the current user's portfolio. => total positions, P&L, risk, leverage.
async def dashboard_summary(current_user: Dict = Depends(get_current_user)) -> Dict[str, Any]:
    user_orders = orders_db.get(current_user["username"], [])
    user_trades = trades_db.get(current_user["username"], [])

    total_positions = len(user_orders)
    total_trades = len(user_trades)
    pnl = sum([t.price * t.qty if t.side == "SELL" else -t.price * t.qty for t in user_trades])
    leverage = 2  # mocked
    risk_level = "Moderate"  # mocked

    return {
        "total_positions": total_positions,
        "total_trades": total_trades,
        "pnl": pnl,
        "leverage": leverage,
        "risk_level": risk_level
    }


@router.get("/performance")
# To get the current user's portfolio performance.
async def dashboard_performance(current_user: Dict = Depends(get_current_user)) -> Dict[str, Any]:
    # Mock time series
    performance = [
        {"date": "2025-09-01", "value": 10000},
        {"date": "2025-09-02", "value": 10150},
        {"date": "2025-09-03", "value": 10080},
        {"date": "2025-09-04", "value": 10220},
    ]
    return {"performance": performance}


@router.get("/distribution")
# To get the current user's portfolio distribution
async def dashboard_distribution(current_user: Dict = Depends(get_current_user)) -> Dict[str, Any]:
    distribution = {
        "equity": 60,
        "futures_options": 25,
        "commodity": 10,
        "currency": 5
    }
    return {"distribution": distribution}
