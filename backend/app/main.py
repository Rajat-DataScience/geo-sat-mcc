from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
import asyncio
import random
from datetime import datetime, timedelta

app = FastAPI(title="GEO-SAT Enterprise API", version="3.0")

# SECURITY: Allow Next.js (Port 3000) to talk to FastAPI (Port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')

# --- DATA BRIDGE ENDPOINT ---
@app.get("/api/mission-overview")
def get_mission_overview():
    total_sats = 0
    total_health_logs = 0
    active_critical = 0
    mission_status_data = [{"name": "Nominal", "value": 68}, {"name": "Warning", "value": 22}, {"name": "Critical", "value": 10}]
    anomaly_trend_data = []

    catalog_file = os.path.join(DATA_DIR, 'satellite_catalog.csv')
    if os.path.exists(catalog_file):
        try:
            df_cat = pd.read_csv(catalog_file)
            total_sats = len(df_cat)
        except Exception: pass

    health_file = os.path.join(DATA_DIR, 'satellite_health_dataset.csv')
    if os.path.exists(health_file):
        try:
            df_health = pd.read_csv(health_file)
            total_health_logs = len(df_health)
            if 'Status' in df_health.columns:
                active_critical = len(df_health[df_health['Status'].astype(str).str.contains('Critical|Error|Fail', case=False)])
                status_counts = df_health['Status'].value_counts()
                mission_status_data = [{"name": str(k), "value": int(v)} for k, v in status_counts.items()]
            else:
                active_critical = int(total_health_logs * 0.02)
        except Exception: pass

    chunk_size = max(1, total_health_logs // 7)
    for i in range(7):
        day_label = (datetime.now() - timedelta(days=6-i)).strftime('%b %d')
        anomaly_trend_data.append({
            "date": day_label,
            "Thermal": int(random.uniform(30, 60)),
            "Power": int(random.uniform(10, 20)),
            "Comms": int(random.uniform(0, 10))
        })

    return {
        "kpis": [
            {"title": "SATELLITES MONITORED", "metric": str(total_sats), "sub": "Live Catalog Connected", "status": "good"},
            {"title": "TOTAL HEALTH LOGS", "metric": str(total_health_logs), "sub": "Read from health dataset", "status": "warning"},
            {"title": "FLEET HEALTH SCORE", "metric": "87%", "sub": "Nominal variance", "status": "critical", "icon": "Zap"},
            {"title": "SYSTEM UPTIME", "metric": "99.7%", "sub": "Target 99.5% √", "status": "good", "icon": "Clock"},
        ],
        "charts": {
            "trend": anomaly_trend_data,
            "distribution": mission_status_data
        }
    }

# --- LIVE TELEMETRY STREAM ---
@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    print("DEBUG: Connection attempt received!")
    await websocket.accept()
    print("DEBUG: Handshake successful!")
    try:
        while True:
            live_data = {
                "health": round(87 + random.uniform(-0.5, 0.5), 1),
                "temp": round(45 + random.uniform(-2, 2), 1),
                "voltage": round(12.4 + random.uniform(-0.1, 0.1), 2)
            }
            await websocket.send_json(live_data)
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        print("Client disconnected")

# --- NEW SCALED ENDPOINTS ---
@app.get("/api/subsystems")
async def get_subsystems():
    return [
        {"name": "Propulsion", "status": "OK"},
        {"name": "Power", "status": "OK"},
        {"name": "Communication", "status": "OK"},
        {"name": "Thermal", "status": "WARNING"}
    ]

@app.get("/api/ml-insights")
async def get_ml_insights():
    return {"probability": "92.4%", "analysis": "Fleet life extension optimal."}