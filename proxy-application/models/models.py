from pydantic import BaseModel, BeforeValidator, Field, EmailStr, ConfigDict
from typing import Annotated, Optional, List
from datetime import datetime, timezone

PyObjectId = Annotated[str, BeforeValidator(str)]

class Log(BaseModel):
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str

class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    email: EmailStr
    psw: str 
    logs: List[Log] = Field(default_factory=list) 

    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True)
