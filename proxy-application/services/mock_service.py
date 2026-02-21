from models.models import User
from services.log_service import LogService

class MockService:
    def __init__(self, db):
        self.db = db
        self.log_service = LogService(db)

    async def create_mock_user(self):
        existing_user = await self.db.users.find_one({"email": "admin@secureiam.com"})
        
        if existing_user:
            return User(**existing_user)

        mock_user = User(
            email="test@mail.com",
            psw="abc123"
        )
        
        user_dict = mock_user.model_dump(by_alias=True, exclude={"id"})
        result = await self.db.users.insert_one(user_dict)
        
        await self.log_service.create_log(str(result.inserted_id), "MOCK_USER_CREATED")
        
        created_user = await self.db.users.find_one({"_id": result.inserted_id})
        return User(**created_user)
