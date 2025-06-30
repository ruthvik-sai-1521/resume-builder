from pydantic import BaseModel
from typing import List, Union

class EnhanceRequest(BaseModel):
    section: str
    content: Union[str, List[str]]

class EnhanceResponse(BaseModel):
    enhanced_content: Union[str, List[str]]

class ResumeData(BaseModel):
    name: str
    summary: str
    education: List[str]
    experience: List[str]
    skills: List[str]
