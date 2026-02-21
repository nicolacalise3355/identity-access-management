from fastapi import APIRouter, Depends, HTTPException
from services.auth_service import AuthService
from config.database import get_db
from dto.auth_dtos import LoginRequest

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login")
async def login(request: LoginRequest, db = Depends(get_db)):
    auth_service = AuthService(db)
    user = await auth_service.authenticate_user(request.email, request.password)
    
    if not user:
        raise HTTPException(status_code=401, detail="Auth failed")
        
    return user
