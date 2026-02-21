from fastapi import APIRouter, Depends
from config.database import get_db
from models.models import User
from services.mock_service import MockService

router = APIRouter()

@router.post("/setup-mock", response_model=User)
async def setup_mock_data(db = Depends(get_db)):
    mock_service = MockService(db)
    user = await mock_service.create_mock_user()
    return user
