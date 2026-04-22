from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from contextlib import asynccontextmanager

load_dotenv()

from routers import fraud, blockchain, auth, dashboard, messages
from database.connection import db
from services.ai_engine import ai_engine
from utils.seeding import seed_users
from services.blockchain import blockchain_instance

@asynccontextmanager
async def lifespan(app: FastAPI):
    db.connect()
    ai_engine.load_models()
    await blockchain_instance.load_from_db()
    await seed_users()
    yield
    db.close()

app = FastAPI(
    title="ST-Governance Core",
    description="High-Fidelity Analytic Engine for Forensic Fraud Investigation and Immutable Ledgering",
    version="2.0.0",
    lifespan=lifespan
)

origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "status": "Operational",
        "engine": "ST-Analytic Engine",
        "version": "2.0.0"
    }

app.include_router(auth.router)
app.include_router(fraud.router)
app.include_router(blockchain.router)
app.include_router(dashboard.router)
app.include_router(messages.router)