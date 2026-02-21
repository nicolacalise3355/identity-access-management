from models.models import Log
from bson import ObjectId

class LogService:
    def __init__(self, db):
        self.db = db

    async def create_log(self, user_id: str, status: str):
        log_entry = Log(status=status)
        log_dict = log_entry.model_dump(by_alias=True, exclude={"id"})
        
        await self.db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$push": {"logs": log_dict}}
        )
