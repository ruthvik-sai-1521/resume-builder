from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import json

app = FastAPI()

# Allow frontend to communicate with backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origin like "http://localhost:5173" in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class EnhanceRequest(BaseModel):
    section: str
    content: str

class Resume(BaseModel):
    name: str
    summary: str
    education: list
    experience: list
    skills: list

# Routes
@app.post("/ai-enhance")
async def ai_enhance(data: EnhanceRequest):
    # Mock enhanced content
    improved_content = f"{data.content} (Enhanced)"
    return improved_content

@app.post("/save-resume")
async def save_resume(resume: Resume):
    try:
        # Save resume to file (you can also use in-memory dict)
        with open("resume.json", "w", encoding="utf-8") as f:
            json.dump(resume.dict(), f, ensure_ascii=False, indent=2)
        return {"message": "Resume saved successfully"}
    except Exception as e:
        return {"error": str(e)}
