from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.market import router as market_router

app = FastAPI(
    title="Trade Copilot API",
    version="1.0.0",
    description="AI-powered market context engine for retail traders"
)

# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes

app.include_router(market_router)


@app.get("/")
def root():
    return {"message": "Trade Copilot API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}