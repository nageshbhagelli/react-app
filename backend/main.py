from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev, use more restrictive origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/login")
async def login(username: str = Body(...), password: str = Body(...)):
    # Dummy logic
    if username == "admin" and password == "admin":
        return {"success": True}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/register")
async def register(username: str = Body(...), password: str = Body(...), email: str = Body(...)):
    return {"success": True, "message": "Registered!"}

@app.get("/market/indices")
async def get_indices():
    return {"indices": ["NIFTY 50", "SENSEX", "BANK NIFTY"]}

@app.get("/market/top-gainers")
async def get_top_gainers():
    return [
        {"symbol": "RELIANCE", "status": "Live", "change": "+2.5%"},
        {"symbol": "TCS", "status": "Live", "change": "+1.8%"},
        {"symbol": "INFY", "status": "Live", "change": "+1.2%"}
    ]

@app.get("/analytics/portfolio")
async def portfolio():
    return {"pnl": 12345, "performance": "Good"}

@app.get("/risk")
async def risk():
    return {"riskControls": "Moderate"}
