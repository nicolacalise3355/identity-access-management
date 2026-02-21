from models.models import User
from services.log_service import LogService

class AuthService:
    def __init__(self, db):
        self.db = db
        self.log_service = LogService(db)

    async def authenticate_user(self, email: str, password: str) -> User | None:
        user_doc = await self.db.users.find_one({"email": email})

        if not user_doc or user_doc.get("psw") != password:
            if user_doc:
                await self.log_service.create_log(str(user_doc["_id"]), "FAILED_LOGIN")
            return None

        await self.log_service.create_log(str(user_doc["_id"]), "SUCCESS_LOGIN")
        
        updated_user_doc = await self.db.users.find_one({"_id": user_doc["_id"]})
        return User(**updated_user_doc)
