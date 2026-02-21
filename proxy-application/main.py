from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import auth_controller, status_controller, mock_controller
from config import database
import global_config

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect_to_mongo()
    yield
    await database.close_mongo_connection()

app = FastAPI(title="SecureIAM API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[global_config.APPLICATION_URI],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_controller.router, prefix="/api")
app.include_router(status_controller.router, prefix="/api")
app.include_router(mock_controller.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
