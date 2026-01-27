from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["Status"])

class StatusResponse(BaseModel):
    status: bool
    service: str

@router.get("/status", response_model=StatusResponse)
async def get_status():
    return StatusResponse(status=True, service="SecureIAM Backend")
