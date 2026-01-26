from fastapi import APIRouter, Depends, HTTPException
from dto.auth_dtos import LoginRequest, LoginResponse
from services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])
def get_auth_service() -> AuthService:
    return AuthService()

@router.post("/login", response_model=LoginResponse)
async def login(
    request: LoginRequest, 
    service: AuthService = Depends(get_auth_service)
):
    user = await service.authenticate_user(request.email, request.password)
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return LoginResponse(
        message="Login successful", 
        user_email=user.email,
        token="mock-jwt-token-xyz-123"
    )
