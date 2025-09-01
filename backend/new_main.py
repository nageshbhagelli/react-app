from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router
from routes.dashboard import router as dashboard_router
from routes.orders import router as orders_router
from routes.trades import router as trades_router
from routes.positions import router as positions_router
from routes.sync import router as sync_router
from routes.profile import router as profile_router

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(orders_router, prefix="/orders", tags=["Orders"])
app.include_router(trades_router, prefix="/trades", tags=["Trades"])
app.include_router(positions_router, prefix="/positions", tags=["Positions"])
app.include_router(sync_router, prefix="/sync", tags=["Sync"])
app.include_router(profile_router, prefix="/profile", tags=["Profile"])
