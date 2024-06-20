from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import uuid
from datetime import datetime
from pathlib import Path
import json


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for cases
cases = {}

# This is a mock background process that simulates a long running process
async def run_background_process(case_id: str):
    await asyncio.sleep(10)
    path2 = Path("../assets/response-2.json")
    with path2.open() as f:
        case = json.load(f)
    cases[case_id].update({
        "status": case["status"],
        "summary": case["summary"]
    })
    await asyncio.sleep(20)
    path3 = Path("../assets/response-3.json")
    with path3.open() as f:
        case = json.load(f)

    cases[case_id].update({
        "status": case["status"],
        "is_met": case["is_met"],
        "is_complete": case["is_complete"],
        "steps": case["steps"]
    })
    cases[case_id]["status"] = "complete"
    cases[case_id]["is_complete"] = True

@app.post("/cases")
def create_case(background_tasks: BackgroundTasks):
    case_id = str(uuid.uuid4())
    created_at = datetime.utcnow().isoformat()

    # Load the JSON example from the asset folder
    path1 = Path("../assets/response-1.json")
    with path1.open() as f:
        case = json.load(f)
    
    # Update the unique values
    case["case_id"] = case_id
    case["created_at"] = created_at
    
    cases[case_id] = case
    
    # Add the background process to the task queue
    background_tasks.add_task(run_background_process, case_id)
    
    return {"id": case_id}

@app.get("/cases/{case_id}")
def get_case(case_id: str):
    case = cases.get(case_id)
    if case is None:
        raise HTTPException(status_code=404, detail="Case not found")
    return case

@app.get("/cases")
def get_all_cases():
    return [{"id": case_id, **case_data} for case_id, case_data in cases.items()]


@app.get("/")
def root():
    return {"message": "Hello World"}